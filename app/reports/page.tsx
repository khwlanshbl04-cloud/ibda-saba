import Sidebar from "@/components/Sidebar";

const reports = [
  { name: "ميزان المراجعة", period: "هذا الشهر", type: "محاسبي" },
  { name: "دفتر الأستاذ العام", period: "هذا الشهر", type: "محاسبي" },
  { name: "قائمة الأرباح والخسائر", period: "هذا الربع", type: "تحليل" },
  { name: "الميزانية العمومية", period: "هذا العام", type: "ميزانية" },
];

export default function ReportsPage() {
  return (
    <div className="dashboard-shell">
      <Sidebar />
      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">التقارير</p>
            <h1>التقارير المحاسبية</h1>
          </div>

          <div className="topbar-actions">
            <button className="ghost-btn">تصدير Excel</button>
            <button className="primary-btn">تصدير PDF</button>
          </div>
        </header>

        <section className="panel">
          <div className="panel-header">
            <h3>التقارير المتاحة</h3>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>اسم التقرير</th>
                  <th>الفترة</th>
                  <th>النوع</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.period}</td>
                    <td>{item.type}</td>
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
