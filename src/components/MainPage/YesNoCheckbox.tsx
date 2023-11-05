import { toast } from 'react-toastify';

import { useState } from "react";
import { Habit, HabitData } from "../../typeDefs";
import { useMutation, } from "@apollo/client";
import { ADD_HABIT_DATA, DELETE_HABIT_DATA } from "../../graphql/Mutations";
import { dayInLast2Days } from "../../utilities/dayInLast2Days";

interface Props {
  habit: Habit;
  day: string;
  habitData: HabitData | null;
}

const YesNoCheckbox = ({ habit, day, habitData }: Props) => {
  const [addHabitData] = useMutation(ADD_HABIT_DATA);
  const [deleteHabitData] = useMutation(DELETE_HABIT_DATA);
  const [habitDataState, setHabitDataState] = useState(habitData);
  const [enabled, setEnabled] = useState(true);

  const checked = habitDataState !== null && habitDataState !== undefined;

  function HandleClick() {
    if (dayInLast2Days(day)) {
      if (!habitDataState) {
        addHabitData({
          variables: {
            amount: 1.0,
            habit_id: habit.hab_id,
            collected_at: day,
          },
          onCompleted: (data) => {
            setEnabled(true);
            setHabitDataState(data.addHabitdata.data);

            toast.success("Habit data added successfully!");
          },
          onError: (e) => {
            console.log(e)
            setEnabled(true);

            toast.error("Error adding habit data!");
          }
        });
      } else {
        deleteHabitData({
          variables: {
            datId: habitDataState.hab_dat_id,
          },
          onCompleted: () => {
            setEnabled(true);
            setHabitDataState(null);

            toast.success("Habit data deleted successfully!");
          },
          onError: (e) => {
            console.log(e)
            setEnabled(true);

            toast.error("Error deleting habit data!");
          }
        });
      }

      setEnabled(false);
    }
  }

  return (
    <td>
      <input
        className="form-check-input"
        type="checkbox"
        id="flexCheckDefault"
        checked={checked}
        onChange={HandleClick}
        disabled={!dayInLast2Days(day) || !enabled}
      />
    </td>
  );
};

export default YesNoCheckbox;
