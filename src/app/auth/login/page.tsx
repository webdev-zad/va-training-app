import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="relative z-10 w-full max-w-md">
        <LoginForm />
      </div>

      {/* Floating elements for visual interest */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-10 w-20 h-20 bg-white/5 rounded-full blur-lg"></div>
    </div>
  );
}
