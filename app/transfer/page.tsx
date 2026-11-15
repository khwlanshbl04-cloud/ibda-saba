import Sidebar from "@/components/Sidebar";

const transfers = [
  { ref: "TR-1042", sender: "أحمد محمد", recipient: "علي سالم", amount: "2,500", status: "مكتمل" },
  { ref: "TR-1043", sender: "مها أحمد", recipient: "سارة علي", amount: "1,300", status: "قيد التحقق" },
  { ref: "TR-1044", sender: "خالد بن علي", recipient: "محمود جاسم", amount: "3,200", status: "مكتمل" },
];

export default function TransferPage() {
  return (
    <div className="dashboard-shell">
      <Sidebar />
      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">الحوالات</p>
            <h1>الحوالات المالية</h1>
          </div>

          <div className="topbar-actions">
            <button className="ghost-btn">حوالة واردة</button>
            <button className="primary-btn">حوالة صادرة</button>
          </div>
        </header>

        <section className="panel">
          <div className="panel-header">
            <h3>سجل الحوالات</h3>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>رقم المرجع</th>
                  <th>المرسل</th>
                  <th>المستفيد</th>
                  <th>المبلغ</th>
                  <th>الحالة</th>
                </tr>
              </thead>
              <tbody>
                {transfers.map((transfer, index) => (
                  <tr key={index}>
                    <td>{transfer.ref}</td>
                    <td>{transfer.sender}</td>
                    <td>{transfer.recipient}</td>
                    <td>{transfer.amount}</td>
                    <td>
                      <span className={`status ${transfer.status === "مكتمل" ? "status-ok" : "status-pending"}`}>
                        {transfer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
