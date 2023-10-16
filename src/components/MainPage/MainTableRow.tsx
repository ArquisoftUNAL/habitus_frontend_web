import { Habit } from "../../typeDefs";
import { useQuery } from "@apollo/client";
import { GET_HABIT_OCURRENCES } from "../../graphql/Queries";
import YesNoCheckbox from "./YesNoCheckbox";
import InputMeasurableField from "./InputMeasurableField";

interface MainTableRowProps {
  habit: Habit;
  last7Days: string[];
}

interface HabitOcurrence {
  hab_dat_collected_at: string;
  hab_dat_amount: string;
}

const MainTableRow = ({ habit, last7Days }: MainTableRowProps) => {
  const { data, loading, error } = useQuery(GET_HABIT_OCURRENCES, {
    variables: {
      habitId: habit.hab_id,
      startDate: last7Days[6],
      endDate: last7Days[0],
    },
  });

  if (loading) {
    return <p>Loading...</p>; // Display a loading indicator
  }

  if (error) {
    console.error("Error fetching data:", error);
    return <p>Error loading data.</p>; // Display an error message
  }

  const ocurrences: { [key: string]: string } = {};
  data?.habitdataByHabit?.forEach((ocurrence: HabitOcurrence) => {
    ocurrences[ocurrence.hab_dat_collected_at] = ocurrence.hab_dat_amount;
  });

  function RenderMeasurableData() {
    return last7Days.map((day: string) => {
      return <InputMeasurableField habit={habit} day={day} />;
    });
  }

  function RenderYesNoData() {
    return last7Days.map((day: string) => (
      <YesNoCheckbox habit={habit} day={day} />
    ));
  }

  // Render the component regardless of whether ocurrences exist
  function RenderRowData() {
    return habit.hab_is_yn ? RenderYesNoData() : RenderMeasurableData();
  }

  return (
    <tr key={habit.hab_id}>
      <th>{habit.hab_name}</th>
      {RenderRowData()}
    </tr>
  );
};

export default MainTableRow;
