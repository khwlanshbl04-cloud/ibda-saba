export default function LoginPage() {
  return (
    <div className="login-shell">
      <div className="login-card">
        <div className="login-brand">إبداع سبأ</div>
        <h2>تسجيل الدخول</h2>

        <div className="field">
          <label>اسم المستخدم</label>
          <input type="text" placeholder="admin" />
        </div>

        <div className="field">
          <label>كلمة المرور</label>
          <input type="password" placeholder="••••••••" />
        </div>

        <button className="primary-btn full">دخول النظام</button>
      </div>
    </div>
  );
}
