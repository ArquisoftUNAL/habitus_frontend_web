import { Habit } from "../../typeDefs";
import {
  ADD_HABIT_DATA,
  DELETE_HABIT_DATA,
  UPDATE_HABIT_DATA,
} from "../../graphql/Mutations";
import { useEffect, useState } from "react";
import { GET_HABIT_OCURRENCES } from "../../graphql/Queries";
import { useMutation, useQuery } from "@apollo/client";

interface Props {
  habit: Habit;
  day: string;
}

const InputMeasurableField = ({ habit, day }: Props) => {
  const [addHabitData] = useMutation(ADD_HABIT_DATA);
  const [deleteHabitData] = useMutation(DELETE_HABIT_DATA);
  const [updateHabitData] = useMutation(UPDATE_HABIT_DATA);
  const [text, setText] = useState("");

  const { data: habitdataByHabit, loading } = useQuery(GET_HABIT_OCURRENCES, {
    variables: {
      habitId: habit.hab_id,
      startDate: day,
      endDate: day,
    },
  });

  // Effect for updating the state variable of text input
  useEffect(() => {
    if (!loading) {
      setText(habitdataByHabit?.habitdataByHabit[0]?.hab_dat_amount || "");
    }
  }, [habitdataByHabit, loading]);

  function HandleClick() {
    if (!loading) {
      const habitDataExists =
        habitdataByHabit?.habitdataByHabit[0] !== undefined;

      if (dayInLast2Days(day)) {
        if (!habitDataExists) {
          addHabitData({
            variables: {
              amount: parseFloat(text),
              habit_id: habit.hab_id,
              collected_at: day,
            },
          });
        } else {
          if (text === "" || text === "0") {
            deleteHabitData({
              variables: {
                datId: habitdataByHabit?.habitdataByHabit[0]?.hab_dat_id,
              },
            });
          } else {
            updateHabitData({
              variables: {
                datId: habitdataByHabit?.habitdataByHabit[0]?.hab_dat_id,
                amount: parseFloat(text),
              },
            });
          }
        }
      }
    }
  }

  function dayInLast2Days(day: string) {
    // Return true if day is today or yesterday
    return (
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
        id="flexCheckDefault"
        type="number"
        step={0.1}
        disabled={!dayInLast2Days(day)}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button disabled={!dayInLast2Days(day)} onClick={HandleClick}>
        Ok
      </button>
    </td>
  );
};

export default InputMeasurableField;
