import Sidebar from "@/components/Sidebar";

const cashboxes = [
  { name: "صندوق الريال اليمني", code: "YER-01", currency: "YER", balance: "540,000.00" },
  { name: "صندوق الريال السعودي", code: "SAR-02", currency: "SAR", balance: "180,420.00" },
  { name: "صندوق الدولار الأمريكي", code: "USD-03", currency: "USD", balance: "68,500.00" },
];

export default function CashboxesPage() {
  return (
    <div className="dashboard-shell">
      <Sidebar />
      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">إدارة الصناديق</p>
            <h1>الصناديق والعملات</h1>
          </div>

          <button className="primary-btn">إنشاء صندوق</button>
        </header>

        <section className="panel">
          <div className="panel-header">
            <h3>قائمة الصناديق</h3>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>اسم الصندوق</th>
                  <th>الكود</th>
                  <th>العملة</th>
                  <th>الرصيد</th>
                </tr>
              </thead>
              <tbody>
                {cashboxes.map((box, index) => (
                  <tr key={index}>
                    <td>{box.name}</td>
                    <td>{box.code}</td>
                    <td>{box.currency}</td>
                    <td>{box.balance}</td>
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
