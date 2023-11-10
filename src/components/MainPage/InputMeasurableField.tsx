import { toast } from 'react-toastify';

import { Habit, HabitData } from "../../typeDefs";
import {
  ADD_HABIT_DATA,
  DELETE_HABIT_DATA,
  UPDATE_HABIT_DATA,
} from "../../graphql/Mutations";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { dayInLast2Days } from "../../utilities/dayInLast2Days";

interface Props {
  habit: Habit;
  habitData: HabitData | null;
  day: string;
}

const InputMeasurableField = ({ habit, day, habitData }: Props) => {
  const [addHabitData] = useMutation(ADD_HABIT_DATA);
  const [deleteHabitData] = useMutation(DELETE_HABIT_DATA);
  const [updateHabitData] = useMutation(UPDATE_HABIT_DATA);

  const [habitDataState, setHabitDataState] = useState(habitData);
  const [enabled, setEnabled] = useState(true);

  const present = habitDataState !== null && habitDataState !== undefined;
  const [text, setText] = useState(present ? habitDataState?.hab_dat_amount : "");

  function HandleClick() {
    if (dayInLast2Days(day)) {
      if (!present) {
        addHabitData({
          variables: {
            amount: parseFloat(text),
            habit_id: habit.hab_id,
            collected_at: day,
          },
          onCompleted: (data) => {
            setEnabled(true);
            setHabitDataState(data.addHabitdata.data);

            toast.success("Habit data added successfully!");
          },
          onError: () => {
            setEnabled(true);

            toast.error("Error adding habit data!");
          },
        });
      } else {
        if (text === "" || text === "0") {
          deleteHabitData({
            variables: {
              datId: habitDataState?.hab_dat_id,
            },
            onCompleted: () => {
              setEnabled(true);
              setHabitDataState(null);

              toast.success("Habit data deleted successfully!");
            },
            onError: (e) => {
              console.log(e);
              setEnabled(true);

              toast.error("Error deleting habit data!");
            },
          });
        } else {
          updateHabitData({
            variables: {
              datId: habitDataState?.hab_dat_id,
              amount: parseFloat(text),
            },
            onCompleted: (data) => {
              setEnabled(true);
              setHabitDataState(data.updateHabitdata.data);

              toast.success("Habit data updated successfully!");
            },
            onError: (e) => {
              console.log(e);
              setEnabled(true);

              toast.error("Error updating habit data!");
            },
          });
        }
      }
      setEnabled(false);
    }

  }

  return (
    <td>
      <input
        id="flexCheckDefault"
        type="number"
        className="form-control"
        step={0.1}
        disabled={!dayInLast2Days(day) || !enabled}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="habitus-button btn"
        disabled={!dayInLast2Days(day) || !enabled}
        onClick={HandleClick}
        style={{ fontSize: "0.8rem", padding: "0.05rem" }}
      >
        Ok
      </button>
    </td>
  );
};

export default InputMeasurableField;
