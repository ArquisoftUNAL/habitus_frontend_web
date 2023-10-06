import { FieldValues, useForm } from "react-hook-form";
import { REGISTER_USER } from "../graphql/Mutations";
import { useMutation } from "@apollo/client";

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
      localStorage.setItem("x-auth-key", result.data.createUser.jwt);
    }

    if (error) console.log(error);
  };

  const { register, handleSubmit } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
  );
}

export default RegisterForm;
