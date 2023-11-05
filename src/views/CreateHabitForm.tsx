import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Heart from "react-animated-heart";
import { CREATE_HABIT } from "../graphql/Mutations";
import { useMutation, useQuery } from "@apollo/client";
import { NavBar } from "../components/NavBar";
import "../styles/CreateHabitForm.css";
import { GET_CATEGORIES } from "../graphql/HabitsQueries";
import LoadingView from "./LoadingView";

function CreateHabitForm() {
  const [habitType, setHabitType] = useState("Yes / No"); // State for selected radio button
  const [isClick, setClick] = useState(false);
  const { register, handleSubmit } = useForm();
  const [CreateHabit, { error }] = useMutation(CREATE_HABIT);
  const { loading: categoriesLoading, data: categoriesData } = useQuery(GET_CATEGORIES);

  if (categoriesLoading) {
    return <LoadingView />;
  }

  const categories = categoriesData.categories;

  const handleHabitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHabitType(event.target.value);
  };

  const onSubmit = async (data: FieldValues) => {
    const { name, description, frequency_type, color } = data;
    let { goal, units } = data;
    goal = parseInt(goal);

    // Format data for yes/no queries
    if (habitType === "Yes / No") {
      goal = 1;
      units = ".";
    }

    const is_favorite = isClick;
    const is_yn = habitType === "Yes / No";

    await CreateHabit({
      variables: {
        name,
        description,
        is_favorite,
        is_yn,
        color,
        units,
        goal,
        frequency_type,
        category: "7ad4eb3a-9178-4e88-8bdd-84e65ee93cb2",
      },
    });

    if (error) console.log(error);

    // Redirect to home page
    window.location.href = "/";
  };

  return (
    <div>
      <NavBar />

      <div className="form-type-selector" data-toggle="buttons">
        <label className="btn btn-type-selector">
          <input
            type="radio"
            name="options"
            value="Yes / No"
            onChange={handleHabitChange}
            checked={habitType === "Yes / No"} // Check condition
          />{" "}
          Yes / No
        </label>

        <label className="btn btn-type-selector">
          <input
            type="radio"
            name="options"
            value="Measurable"
            onChange={handleHabitChange}
            checked={habitType === "Measurable"} // Check condition
          />{" "}
          Measurable
        </label>
        <Heart
          isClick={isClick}
          onClick={() => setClick(!isClick)}
          styles={"../styles/CreateHabitForm.css"}
        />
      </div>
      <div className="row">
        <div className="col-10 offset-1 text-center">
          <form className="create-habit-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3 create-habit-form__name">
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
            <div className="mb-3 create-habit-form__description">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                {...register("description")}
                id="description"
                className="form-control"
              />
            </div>

            {habitType === "Measurable" ? (
              <div>
                <div className="mb-3 create-habit-form__goal">
                  <label htmlFor="goal" className="form-label">
                    Goal
                  </label>
                  <input
                    {...register("goal")}
                    id="goal"
                    type="number"
                    className="form-control"
                    step="0.01"
                  />
                </div>

                <div className="mb-3 create-habit-form__units">
                  <label htmlFor="units" className="form-label">
                    Units
                  </label>
                  <input
                    {...register("units")}
                    id="units"
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
            ) : null}

            <div className="mb-3 create-habit-form__frequency-type">
              <label htmlFor="frequency_type" className="form-label">
                Frequency
              </label>
              <select
                {...register("frequency_type")}
                id="frequency_type"
                className="form-control"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div className="mb-3 create-habit-form__category">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                {...register("category")}
                id="category"
                className="form-control"
              >
                {
                  categories.map((category: any) => {
                    return <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  })
                }
                <option value="Health">Health</option>
                <option value="Wealth">Wealth</option>
                <option value="Relationship">Relationship</option>
                <option value="Personal Growth">Personal Growth</option>
              </select>
            </div>

            <div className="mb-3 create-habit-form__color">
              <label htmlFor="color" className="form-label">
                Color
              </label>
              <select {...register("color")} id="color" className="form-control">
                <option value="FF0000">Red</option>
                <option value="00FF00">Green</option>
                <option value="0000FF">Blue</option>
                <option value="FFFF00">Yellow</option>
              </select>
            </div>

            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateHabitForm;
