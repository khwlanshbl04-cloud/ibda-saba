import Sidebar from "@/components/Sidebar";

const users = [
  { name: "مدير النظام", role: "SYSTEM_ADMIN", email: "admin@ibda-saba.com" },
  { name: "محاسب", role: "ACCOUNTANT", email: "accountant@ibda-saba.com" },
  { name: "أمين صندوق", role: "CASHIER", email: "cashier@ibda-saba.com" },
  { name: "مدخل بيانات", role: "DATA_ENTRY", email: "data@ibda-saba.com" },
];

export default function UsersPage() {
  return (
    <div className="dashboard-shell">
      <Sidebar />
      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">المستخدمون</p>
            <h1>إدارة المستخدمين والصلاحيات</h1>
          </div>

          <button className="primary-btn">إضافة مستخدم</button>
        </header>

        <section className="panel">
          <div className="panel-header">
            <h3>قائمة المستخدمين</h3>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>اسم المستخدم</th>
                  <th>الدور</th>
                  <th>البريد</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>{user.email}</td>
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
