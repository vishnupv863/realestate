import LoginForm from "../../components/forms/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-md bg-zinc-900">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
