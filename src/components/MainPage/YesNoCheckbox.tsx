import { useEffect, useState } from "react";
import { Habit } from "../../typeDefs";
import { useMutation, useQuery } from "@apollo/client";
// import { ADD_HABIT_DATA, UPDATE_HABIT_DATA } from "../../graphql/Mutations";
import { GET_HABIT_OCURRENCES } from "../../graphql/Queries";

interface Props {
  habit: Habit;
  day: string;
}

const YesNoCheckbox = ({ habit, day }: Props) => {
  //   const [addHabitData] = useMutation(ADD_HABIT_DATA);
  //   const [updateHabitData] = useMutation(UPDATE_HABIT_DATA);

  // First retrieve the habit data for the day, this will only return one occurrence (if it exists)

  const { data: habitdataByHabit, loading } = useQuery(GET_HABIT_OCURRENCES, {
    variables: {
      habitId: habit.hab_id,
      startDate: day,
      endDate: day,
    },
  });

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!loading) {
      const jose1 = habit;
      const jose3 = day;
      const jose2 =
        habitdataByHabit?.habitdataByHabit[0]?.hab_dat_amount !== "0" &&
        habitdataByHabit?.habitdataByHabit[0]?.hab_dat_amount !== undefined;

      setChecked(jose2);
    }
  }, [habitdataByHabit, loading]);

  //   useEffect(() => {
  //     if (!checked || habitdataByHabit?.habitdataByHabit.length === 0) {
  //       addHabitData({
  //         variables: {
  //           amount: 1.21,
  //           habit_id: habit.hab_id,
  //           collected_at: day,
  //         },
  //       });
  //     } else if (habitdataByHabit?.habitdataByHabit.length === 1) {
  //       updateHabitData({
  //         variables: {
  //           datId: habitdataByHabit?.habitdataByHabit[0]?.hab_dat_id,
  //           amount: checked ? 1.0 : 0.0,
  //         },
  //       });
  //     }
  //   }, [
  //     addHabitData,
  //     checked,
  //     day,
  //     habit.hab_id,
  //     habitdataByHabit,
  //     loading,
  //     updateHabitData,
  //   ]);

  //   function dayInLast2Days(day: string) {
  //     // Return true if day is today or yesterday
  //     return (
  //       day === new Date().toISOString().slice(0, 10) ||
  //       day ===
  //         new Date(new Date().setDate(new Date().getDate() - 1))
  //           .toISOString()
  //           .slice(0, 10)
  //     );
  //   }

  return (
    <td>
      <input
        className="form-check-input"
        type="checkbox"
        id="flexCheckDefault"
        checked={checked}
        onChange={() => setChecked(!checked)}
        // disabled={dayInLast2Days(day)}
      />
    </td>
  );
};

export default YesNoCheckbox;
