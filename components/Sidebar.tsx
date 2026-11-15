import Link from "next/link";

const navItems = [
  { label: "لوحة التحكم", href: "/" },
  { label: "سندات القبض", href: "/vouchers" },
  { label: "الحوالات", href: "/transfer" },
  { label: "العملاء", href: "/customers" },
  { label: "الصناديق", href: "/cashboxes" },
  { label: "التقارير", href: "/reports" },
  { label: "المستخدمون", href: "/users" },
  { label: "الإعدادات", href: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand-box">
        <div className="brand-icon">إ</div>
        <div>
          <p className="brand-name">إبداع سبأ</p>
          <small>نظام الصرافة</small>
        </div>
      </div>

      <nav className="nav">
        {navItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <button className="nav-item" type="button">
              {item.label}
            </button>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="usermini">
          <div className="avatar">م</div>
          <div>
            <strong>مدير النظام</strong>
            <small>admin@ibda-saba.com</small>
          </div>
        </div>
      </div>
    </aside>
  );
}
