import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/api-auth";

export const runtime = "nodejs";

const decimalPattern = /^(?:0|[1-9]\d*)(?:\.\d{1,6})?$/;

export async function POST(request: Request) {
  const auth = await requireSession();
  if (!auth.session) return auth.response;
  if (!["SYSTEM_ADMIN", "ACCOUNTANT"].includes(auth.session.role)) {
    return NextResponse.json({ error: "ليس لديك صلاحية ترحيل القيود" }, { status: 403 });
  }

  try {
    const body = await request.json();
    if (typeof body.memo !== "string" || !body.memo.trim() || body.memo.length > 500 || !Array.isArray(body.lines) || body.lines.length < 2 || body.lines.length > 100) {
      return NextResponse.json({ error: "بيانات القيد غير مكتملة" }, { status: 400 });
    }
    const parsed = body.lines.map((line: Record<string, unknown>) => ({
      accountId: typeof line.accountId === "string" ? line.accountId : "",
      currencyId: typeof line.currencyId === "string" ? line.currencyId : "",
      side: line.side,
      amount: typeof line.amount === "string" ? line.amount : "",
      memo: typeof line.memo === "string" ? line.memo.slice(0, 250) : null,
    }));
    if (parsed.some((line: {accountId:string;currencyId:string;side:unknown;amount:string}) =>
      !line.accountId || !line.currencyId || !["DEBIT", "CREDIT"].includes(String(line.side)) || !decimalPattern.test(line.amount) || new Prisma.Decimal(line.amount).lte(0)
    )) return NextResponse.json({ error: "تحقق من الحساب والعملة والجانب والمبلغ في كل سطر" }, { status: 400 });

    const currencies = new Set(parsed.map((line: {currencyId:string}) => line.currencyId));
    if (currencies.size !== 1) return NextResponse.json({ error: "يجب أن تكون جميع أسطر القيد بعملة واحدة في هذه المرحلة" }, { status: 400 });
    const currencyId = parsed[0].currencyId;
    const debit = parsed.filter((line: {side:unknown}) => line.side === "DEBIT").reduce((sum: Prisma.Decimal, line: {amount:string}) => sum.plus(line.amount), new Prisma.Decimal(0));
    const credit = parsed.filter((line: {side:unknown}) => line.side === "CREDIT").reduce((sum: Prisma.Decimal, line: {amount:string}) => sum.plus(line.amount), new Prisma.Decimal(0));
    if (!debit.equals(credit)) return NextResponse.json({ error: "القيد غير متوازن: يجب أن يساوي إجمالي المدين إجمالي الدائن" }, { status: 400 });

    const result = await prisma.$transaction(async (tx) => {
      const currency = await tx.currency.findUnique({ where: { id: currencyId } });
      if (!currency?.active) throw new Error("عملة غير موجودة أو غير مفعلة");
      const ids = [...new Set(parsed.map((line: {accountId:string}) => line.accountId))];
      const accounts = await tx.account.findMany({ where: { id: { in: ids }, active: true } });
      if (accounts.length !== ids.length) throw new Error("حساب غير موجود أو غير مفعل");
      for (const account of accounts) {
        if (account.currencyId && account.currencyId !== currencyId) throw new Error(`عملة الحساب ${account.code} لا تطابق عملة القيد`);
      }
      const entry = await tx.journalEntry.create({
        data: {
          reference: `JE-${crypto.randomUUID()}`,
          memo: body.memo.trim(),
          postedById: auth.session!.id,
          lines: { create: parsed.map((line: {accountId:string;currencyId:string;side: "DEBIT"|"CREDIT";amount:string;memo:string|null}) => ({ accountId: line.accountId, currencyId: line.currencyId, side: line.side, amount: new Prisma.Decimal(line.amount), memo: line.memo })) },
        },
        include: { lines: true },
      });
      await tx.auditLog.create({ data: { userId: auth.session!.id, action: "POST", entityType: "JournalEntry", entityId: entry.id, details: { reference: entry.reference, debit: debit.toString(), credit: credit.toString() } } });
      return entry;
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Journal posting failed", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "تعذر ترحيل القيد" }, { status: 400 });
  }
}
