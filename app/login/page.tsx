import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="login-shell">
      <section className="login-card" aria-labelledby="login-title">
        <div className="login-brand">إبداع سبأ</div>
        <p className="login-subtitle">نظام الصرافة والمحاسبة المتكامل</p>
        <h1 id="login-title">تسجيل الدخول</h1>
        <LoginForm />
      </section>
    </main>
  );
}
