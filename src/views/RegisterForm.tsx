import { FieldValues, useForm } from "react-hook-form";
import { REGISTER_USER } from "../graphql/Mutations";
import { useMutation } from "@apollo/client";
import { LoginNavBar } from "../components/LoginNavBar";
import "../styles/RegisterForm.css";

function RegisterForm() {
  const [RegisterUser, { error }] = useMutation(REGISTER_USER);

  const onSubmit = async (data: FieldValues) => {
    const result = await RegisterUser({
      variables: {
        name: data.name,
        email: data.email,
        password: data.password,
        birthDay: data.birthDay,
      },
    });

    // Store the token in local storage
    if (result.data) {
      localStorage.setItem("x-auth-token", result.data.createUser.jwt);
    }

    // Go to the main page
    window.location.href = "/";

    if (error) console.log(error);
  };

  const { register, handleSubmit } = useForm();
  return (
    <div>
      <LoginNavBar />
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            {...register("name")}
            id="name"
            type="text"
            className="form-control"
          />
        </div>
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
        <div className="mb-3">
          <label htmlFor="birthDay" className="form-label">
            BirthDay
          </label>
          <input
            {...register("birthDay")}
            id="birthDay"
            type="date"
            className="form-control"
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
