import Sidebar from "@/components/Sidebar";

const vouchers = [
  { no: "1001", type: "سند قبض", client: "أحمد محمد", amount: "50,000", status: "مكتمل" },
  { no: "1002", type: "سند صرف", client: "سارة علي", amount: "1,200", status: "مكتمل" },
  { no: "1003", type: "سند قبض", client: "خالد بن علي", amount: "3,400", status: "قيد المراجعة" },
];

export default function VouchersPage() {
  return (
    <div className="dashboard-shell">
      <Sidebar />
      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">السندات</p>
            <h1>سندات القبض والصرف</h1>
          </div>

          <div className="topbar-actions">
            <button className="ghost-btn">سند قبض</button>
            <button className="primary-btn">سند صرف</button>
          </div>
        </header>

        <section className="panel">
          <div className="panel-header">
            <h3>قائمة السندات</h3>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>رقم السند</th>
                  <th>النوع</th>
                  <th>العميل</th>
                  <th>المبلغ</th>
                  <th>الحالة</th>
                </tr>
              </thead>
              <tbody>
                {vouchers.map((item, index) => (
                  <tr key={index}>
                    <td>{item.no}</td>
                    <td>{item.type}</td>
                    <td>{item.client}</td>
                    <td>{item.amount}</td>
                    <td>
                      <span className={`status ${item.status === "مكتمل" ? "status-ok" : "status-pending"}`}>
                        {item.status}
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
