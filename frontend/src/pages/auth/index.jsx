import RegisterForm from "../../components/forms/RegisterForm";
import LoginForm from "../../components/forms/LoginForm";
import GoogleLoginButton from "../../components/auth/GoogleLoginButton";

function Auth() {
  return (
    <div>
      <h2>Authentication</h2>
      <LoginForm />
      <RegisterForm />
      <hr />
      <h3>Or sign up with Google</h3>
      <GoogleLoginButton />
    </div>
  );
}

export default Auth;
