import Sidebar from "@/components/Sidebar";
import StatCard from "@/components/StatCard";
import RecentTransactions from "@/components/RecentTransactions";

const statCards = [
  {
    title: "إجمالي أرصدة الصناديق",
    value: "1,245,670.00",
    subtitle: "ريال يمني",
    trend: "+4.2%",
    tone: "emerald",
  },
  {
    title: "إجمالي سندات القبض",
    value: "87,540.00",
    subtitle: "اليوم",
    trend: "+2.1%",
    tone: "blue",
  },
  {
    title: "إجمالي سندات الصرف",
    value: "63,200.00",
    subtitle: "اليوم",
    trend: "-1.4%",
    tone: "amber",
  },
  {
    title: "إجمالي الحوالات الصادرة",
    value: "42,800.00",
    subtitle: "USD",
    trend: "+7.5%",
    tone: "violet",
  },
];

const alerts = [
  "رصيد صندوق الريال السعودي أقل من الحد المسموح",
  "تغير سعر صرف الدولار اليوم",
  "هناك حوالة واردة في انتظار الموافقة",
];

const recentData = [
  { id: "1001", type: "قبض", client: "أحمد محمد", currency: "YER", amount: "50,000", status: "مكتمل" },
  { id: "1002", type: "صرف", client: "سارة علي", currency: "USD", amount: "1,200", status: "مكتمل" },
  { id: "1003", type: "حوالة", client: "خالد بن علي", currency: "SAR", amount: "3,400", status: "قيد المراجعة" },
  { id: "1004", type: "شراء عملة", client: "عبدالله", currency: "USD", amount: "2,000", status: "مكتمل" },
  { id: "1005", type: "بيع عملة", client: "مها أحمد", currency: "SAR", amount: "1,500", status: "مكتمل" },
];

export default function HomePage() {
  return (
    <div className="dashboard-shell">
      <Sidebar />
      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">لوحة التحكم</p>
            <h1>إبداع سبأ – نظام الصرافة والمحاسبة المتكامل</h1>
          </div>

          <div className="topbar-actions">
            <button className="ghost-btn">تصفية</button>
            <button className="primary-btn">تصدير</button>
          </div>
        </header>

        <section className="stats-grid">
          {statCards.map((card) => (
            <StatCard
              key={card.title}
              title={card.title}
              value={card.value}
              subtitle={card.subtitle}
              trend={card.trend}
              tone={card.tone as "emerald" | "blue" | "amber" | "violet"}
            />
          ))}
        </section>

        <section className="content-grid">
          <div className="panel">
            <div className="panel-header">
              <h3>أرصدة العملات</h3>
              <button className="text-btn">رؤية الكل</button>
            </div>

            <div className="currency-list">
              <div className="currency-row">
                <span>ريال يمني</span>
                <strong>540,000.00</strong>
              </div>
              <div className="currency-row">
                <span>ريال سعودي</span>
                <strong>180,420.00</strong>
              </div>
              <div className="currency-row">
                <span>دولار أمريكي</span>
                <strong>68,500.00</strong>
              </div>
              <div className="currency-row">
                <span>درهم إماراتي</span>
                <strong>35,900.00</strong>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <h3>تنبيهات الصناديق</h3>
            </div>

            <ul className="alert-list">
              {alerts.map((alert) => (
                <li key={alert}>{alert}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="panel table-panel">
          <div className="panel-header">
            <h3>آخر العمليات المالية</h3>
            <button className="text-btn">تحديث</button>
          </div>

          <RecentTransactions rows={recentData} />
        </section>
      </main>
    </div>
  );
}
