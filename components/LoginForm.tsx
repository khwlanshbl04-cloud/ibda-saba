"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: form.get("username"), password: form.get("password") }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "تعذر تسجيل الدخول");
      router.replace("/");
      router.refresh();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "تعذر تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="login-form" onSubmit={submit}>
      <div className="field">
        <label htmlFor="username">اسم المستخدم</label>
        <input id="username" name="username" autoComplete="username" required maxLength={100} />
      </div>
      <div className="field">
        <label htmlFor="password">كلمة المرور</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required maxLength={200} />
      </div>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="primary-btn full" type="submit" disabled={loading}>{loading ? "جارٍ التحقق…" : "دخول النظام"}</button>
      <p className="login-hint">أنشئ حساب المدير من تعليمات التشغيل في README.</p>
    </form>
  );
}
