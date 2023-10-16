import { useEffect, useState } from "react";
import { Habit } from "../../typeDefs";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_HABIT_DATA, UPDATE_HABIT_DATA } from "../../graphql/Mutations";
import { GET_HABIT_OCURRENCES } from "../../graphql/Queries";

interface Props {
  habit: Habit;
  day: string;
}

const YesNoCheckbox = ({ habit, day }: Props) => {
  const [addHabitData] = useMutation(ADD_HABIT_DATA);
  const [updateHabitData] = useMutation(UPDATE_HABIT_DATA);

  // First retrieve the habit data for the day, this will only return one occurrence (if it exists)

  const { data: habitdataByHabit, loading } = useQuery(GET_HABIT_OCURRENCES, {
    variables: {
      habitId: habit.hab_id,
      startDate: day,
      endDate: day,
    },
  });

  const [checked, setChecked] = useState(false);

  // Effect for updating the state variable of checkbox
  useEffect(() => {
    if (!loading) {
      const isHabDatAmountChecked =
        habitdataByHabit?.habitdataByHabit[0]?.hab_dat_amount !== undefined &&
        habitdataByHabit?.habitdataByHabit[0]?.hab_dat_amount !== "0" &&
        habitdataByHabit?.habitdataByHabit[0]?.hab_dat_amount !== "0.10";

      setChecked(isHabDatAmountChecked);
    }
  }, [habitdataByHabit, loading]);

  // Effect for adding or updating habit data in backend
  useEffect(() => {
    if (!loading) {
      const previousCheckedState = !checked;
      const modifiable = !dayInLast2Days(day);
      // True if it's not checked and if habitdataByHabit?.habitdataByHabit doesn't exist.

      const condition1 =
        !previousCheckedState &&
        (!habitdataByHabit || !habitdataByHabit.habitdataByHabit) &&
        modifiable;

      if (condition1) {
        addHabitData({
          variables: {
            amount: 1.0,
            habit_id: habit.hab_id,
            collected_at: day,
          },
        });
        console.log("add");
      } else if (
        habitdataByHabit?.habitdataByHabit &&
        modifiable
      ) {
        console.log("update");
        updateHabitData({
          variables: {
            datId: habitdataByHabit?.habitdataByHabit[0]?.hab_dat_id,
            amount: checked ? 1.0 : 0.1,
          },
        });
      }
    }
  }, [
    addHabitData,
    checked,
    day,
    habit.hab_id,
    habitdataByHabit?.habitdataByHabit,
    loading,
    updateHabitData,
  ]);

  function dayInLast2Days(day: string) {
    // Return true if day is today or yesterday
    return !(
      day === new Date().toISOString().slice(0, 10) ||
      day ===
        new Date(new Date().setDate(new Date().getDate() - 1))
          .toISOString()
          .slice(0, 10)
    );
  }

  return (
    <td>
      <input
        className="form-check-input"
        type="checkbox"
        id="flexCheckDefault"
        checked={checked}
        onChange={() => setChecked(!checked)}
        disabled={dayInLast2Days(day)}
      />
    </td>
  );
};

export default YesNoCheckbox;
