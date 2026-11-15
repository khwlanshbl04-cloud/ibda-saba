import Sidebar from "@/components/Sidebar";

export default function SettingsPage() {
  return (
    <div className="dashboard-shell">
      <Sidebar />
      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">الإعدادات</p>
            <h1>إعدادات النظام</h1>
          </div>
        </header>

        <section className="panel">
          <div className="panel-header">
            <h3>إعدادات الشركة</h3>
          </div>

          <div className="settings-grid">
            <div className="field">
              <label>اسم الشركة</label>
              <input type="text" defaultValue="إبداع سبأ" />
            </div>
            <div className="field">
              <label>العملة الأساسية</label>
              <input type="text" defaultValue="YER" />
            </div>
            <div className="field">
              <label>الحد الأدنى للصندوق</label>
              <input type="text" defaultValue="10,000" />
            </div>
            <div className="field">
              <label>سعر الصرف الافتراضي</label>
              <input type="text" defaultValue="1 USD = 250 YER" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
