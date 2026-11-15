import Sidebar from "@/components/Sidebar";

const customers = [
  { name: "أحمد محمد", phone: "966500123456", account: "C-184521", type: "فردي", balance: "18,500.00" },
  { name: "سارة علي", phone: "966500654321", account: "C-184522", type: "مؤسسة", balance: "42,300.00" },
  { name: "خالد بن علي", phone: "966500334455", account: "C-184523", type: "فردي", balance: "7,900.00" },
];

export default function CustomersPage() {
  return (
    <div className="dashboard-shell">
      <Sidebar />
      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">إدارة العملاء</p>
            <h1>العملاء والحسابات</h1>
          </div>

          <button className="primary-btn">إضافة عميل جديد</button>
        </header>

        <section className="panel">
          <div className="panel-header">
            <h3>قائمة العملاء</h3>
            <button className="text-btn">بحث</button>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>اسم العميل</th>
                  <th>الهاتف</th>
                  <th>رقم الحساب</th>
                  <th>نوع الحساب</th>
                  <th>الرصيد</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr key={index}>
                    <td>{customer.name}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.account}</td>
                    <td>{customer.type}</td>
                    <td>{customer.balance}</td>
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
