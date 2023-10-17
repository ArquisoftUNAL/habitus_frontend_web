import { Habit } from "../../typeDefs";
import {
  ADD_HABIT_DATA,
  DELETE_HABIT_DATA,
  UPDATE_HABIT_DATA,
} from "../../graphql/Mutations";
import { useEffect, useState } from "react";
import { GET_HABIT_OCURRENCES } from "../../graphql/Queries";
import { useMutation, useQuery } from "@apollo/client";
import { dayInLast2Days } from "../../utilities/dayInLast2Days";

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

  return (
    <td>
      <input
        id="flexCheckDefault"
        type="number"
        className="form-control"
        step={0.1}
        disabled={!dayInLast2Days(day)}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="habitus-button"
        disabled={!dayInLast2Days(day)}
        onClick={HandleClick}
        style={{ fontSize: "0.8rem" }}
      >
        Ok
      </button>
    </td>
  );
};

export default InputMeasurableField;
