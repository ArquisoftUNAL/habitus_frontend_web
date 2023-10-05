// import React, { FormEvent } from "react";
import { FieldValues, useForm } from "react-hook-form";

function LoginForm() {
  const onSubmit = (data: FieldValues) => console.log(data);

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
