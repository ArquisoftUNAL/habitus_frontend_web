import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Modal from "react-modal";
import Heart from "react-animated-heart";
import { toast } from "react-toastify";
import { CREATE_HABIT } from "../graphql/Mutations";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import "../styles/CreateHabitForm.css";
import { GET_CATEGORIES } from "../graphql/HabitsQueries";
import LoadingView from "./LoadingView";
import BlueButton from "../components/BlueButton";
import MedicalCentersView from "./MedicalCenters";

function CreateHabitForm() {

  const navigate = useNavigate();

  const [habitType, setHabitType] = useState("Yes / No"); // State for selected radio button
  const [location, setLocation] = useState(""); // State for selected radio button
  const [isClick, setClick] = useState(false);
  const { register, handleSubmit } = useForm();
  const [CreateHabit] = useMutation(CREATE_HABIT);
  const { loading: categoriesLoading, data: categoriesData } = useQuery(GET_CATEGORIES);
  const [centersModalVisible, setCentersModalVisible] = useState(false);

  if (categoriesLoading) {
    return <LoadingView />;
  }

  const categories = categoriesData.categories;

  const handleHabitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHabitType(event.target.value);
  };

  const onSubmit = async (data: FieldValues) => {
    const { name, description, frequency_type, color, category } = data;
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
        category,
        location: location,
      },
      onCompleted: () => {
        toast.success("Habit created successfully!");
        navigate("/");
      },
      onError: (error) => {
        toast.error("Error creating habit: " + error.message);
      }
    });


  };

  return (
    <div>
      <NavBar />

      <Modal
        isOpen={centersModalVisible}
        onRequestClose={() => {
          setCentersModalVisible(false);
        }}
        //style={customStyles}
        contentLabel="Example Modal"
      >
        <MedicalCentersView
          onChoose={(location: string) => {
            setLocation(location);
            setCentersModalVisible(false);
          }}

          onClose={() => {
            setCentersModalVisible(false);
          }}
        />
      </Modal>

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

      <form className="create-habit-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="row text-center">
          <div className="col-12 col-sm-6 text-center">

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
              </div>
            ) : null}

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

          <div className="col-12 col-sm-6 text-center">
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
                    return <option value={category.cat_id} key={category.cat_id}>
                      {category.cat_name}
                    </option>
                  })
                }
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

            <div className="mb-3 create-habit-form__location">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <div className="row">
                <div className="col-12 col-sm-9">
                  <input
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                    value={location}
                    id="location"
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col-12 col-sm-3">
                  <BlueButton
                    caption="🏥"
                    onClick={() => {
                      setCentersModalVisible(true);
                    }}
                  />
                </div>
              </div>
            </div>

          </div>

          <button className="col-2 offset-3 btn btn-primary" type="submit">
            Save
          </button>
        </div >
      </form >

    </div >
  );
}

export default CreateHabitForm;
