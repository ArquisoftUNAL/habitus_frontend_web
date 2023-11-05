import { Habit } from "../../typeDefs";
import YesNoCheckbox from "./YesNoCheckbox";
import InputMeasurableField from "./InputMeasurableField";

interface MainTableRowProps {
  habit: Habit;
  last7Days: string[];
}

const MainTableRow = ({ habit, last7Days }: MainTableRowProps) => {
  function RenderMeasurableData() {
    return last7Days.map((day: string) => {
      return <InputMeasurableField
        key={day} habitData={habit.data[day]}
        habit={habit} day={day}
      />;
    });
  }

  function RenderYesNoData() {
    return last7Days.map((day: string) => {
      return <YesNoCheckbox
        key={day} habitData={habit.data[day]}
        habit={habit} day={day}
      />
    });
  }

  // Render the component regardless of whether ocurrences exist or not
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
