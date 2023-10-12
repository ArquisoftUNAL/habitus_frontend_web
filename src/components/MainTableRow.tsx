import { useEffect, useState } from "react";
import { Habit } from "../typeDefs";
import { useQuery } from "@apollo/client";
import { GET_HABIT_OCURRENCES } from "../graphql/Queries";

interface MainTableRowProps {
  habit: Habit;
  last7Days: string[];
}

interface HabitOcurrence {
  hab_dat_collected_at: string;
  hab_dat_amount: string;
}

const MainTableRow = ({ habit, last7Days }: MainTableRowProps) => {
  const [ocurrences, setOcurrences] = useState<{ [key: string]: string }>({});
  const { data, loading, error } = useQuery(GET_HABIT_OCURRENCES, {
    variables: {
      habitId: habit.hab_id,
      startDate: last7Days[6],
      endDate: last7Days[0],
    },
  });

  useEffect(() => {
    if (data !== undefined && !loading) {
      //   if (habit.hab_id === "915859a5-d352-4a04-b8c9-f068a5d99b1c") debugger;
      const ocurrencesDict: { [key: string]: string } = {};
      data.habitdataByHabit.forEach((ocurrence: HabitOcurrence) => {
        ocurrencesDict[ocurrence.hab_dat_collected_at] =
          ocurrence.hab_dat_amount;
      });

      setOcurrences(ocurrencesDict);
    }
  }, [data, loading]);

  if (loading) {
    return <p>Loading...</p>; // Display a loading indicator
  }

  if (error) {
    console.error("Error fetching data:", error);
    return <p>Error loading data.</p>; // Display an error message
  }

  function RenderMeasurableData() {
    return last7Days.map((day: string) => {
      return <td>{ocurrences[day] ?? "0"}</td>;
    });
  }

  function RenderYesNoData() {
    return last7Days.map((day: string) => (
      <td>
        <input
          className="form-check-input"
          type="checkbox"
          id="flexCheckDefault"
          disabled={!(day === last7Days[0] || day === last7Days[1])}
          checked={true}
        />
      </td>

    ));
  }

  function RenderRowData() {
    return habit.hab_is_yn ? RenderYesNoData() : RenderMeasurableData();
  }

  return (
    <tr key={habit.hab_id}>
      <th>{habit.hab_id}</th>
      {RenderRowData()}
    </tr>
  );
};

export default MainTableRow;
