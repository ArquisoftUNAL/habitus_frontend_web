import { FieldValues, useForm } from "react-hook-form";
import { LOGIN_USER } from "../graphql/Mutations";
import { useMutation } from "@apollo/client";
import "../styles/LoginForm.css";
import { LoginNavBar } from "../components/LoginNavBar";

function LoginForm() {
  const [loginUser, { error }] = useMutation(LOGIN_USER);

  const onSubmit = async (data: FieldValues) => {
    const result = await loginUser({
      variables: {
        email: data.email,
        password: data.password,
      },
    });

    // Store the token in local storage
    if (result.data) {
      localStorage.setItem("x-auth-token", result.data.loginUser);
    }

    // Redirect to home page
    window.location.href = "/";

    if (error) console.log(error);
  };

  const { register, handleSubmit } = useForm();
  return (
    <div>
      <LoginNavBar />
      <div className="main-container">
        <div className="login-image">
          <h3 className="login-image__quote">
            "We are what we repeatedly do."
          </h3>
        </div>
        <div className="login-form-container">
          <h2 className="login-form__title">Hello again!</h2>
          <h5 className="login-form__sub-title">
            Return your journey to greatness
          </h5>
          <hr />
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                {...register("email")}
                id="email"
                type="email"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                {...register("password")}
                id="password"
                type="password"
                className="form-control"
              />
            </div>
            <button disabled={false} className="btn btn-primary" type="submit">
              Login
            </button>
            <p>
              Don't have an account? <a href="#">Create one now!</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
