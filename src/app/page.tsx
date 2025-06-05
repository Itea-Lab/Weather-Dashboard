import LoginForm from "@/components/auth/LoginForm";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold">ITea Edge Hub</h1>
          <p className="mt-2 text-gray-600">I AM TEA</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
