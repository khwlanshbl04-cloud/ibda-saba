type Row = {
  id: string;
  type: string;
  client: string;
  currency: string;
  amount: string;
  status: string;
};

export default function RecentTransactions({ rows }: { rows: Row[] }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>الرقم</th>
            <th>النوع</th>
            <th>العميل</th>
            <th>العملة</th>
            <th>المبلغ</th>
            <th>الحالة</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.type}</td>
              <td>{row.client}</td>
              <td>{row.currency}</td>
              <td>{row.amount}</td>
              <td>
                <span className={`status ${row.status === "مكتمل" ? "status-ok" : "status-pending"}`}>
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
