// import React, { FormEvent } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { LOGIN_USER } from "../graphql/Mutations";
import { useMutation } from "@apollo/client";

function LoginForm() {
  const [loginUser, { error }] = useMutation(LOGIN_USER);

  const onSubmit = async (data: FieldValues) => {
    const result = await loginUser({
      variables: {
        email: data.email,
        password: data.password,
      },
    });

    console.log(result.data);

    if (error) {
      console.log(error);
    }
  };

  const { register, handleSubmit } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
    </form>
  );
}

export default LoginForm;
