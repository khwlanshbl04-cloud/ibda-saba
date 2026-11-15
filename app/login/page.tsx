import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  const previewMode = process.env.NODE_ENV !== "production" && process.env.PREVIEW_MODE === "true";

  return (
    <main className="login-shell">
      <section className="login-card" aria-labelledby="login-title">
        <div className="login-brand">إبداع سبأ</div>
        <p className="login-subtitle">نظام الصرافة والمحاسبة المتكامل</p>
        <h1 id="login-title">تسجيل الدخول</h1>
        {previewMode ? (
          <div className="preview-entry">
            <p role="status">وضع معاينة الواجهة فقط — لا يتصل بقاعدة البيانات ولا يحفظ عمليات.</p>
            <a className="primary-btn full preview-link" href="/">الدخول للمعاينة</a>
          </div>
        ) : (
          <LoginForm />
        )}
      </section>
    </main>
  );
}
