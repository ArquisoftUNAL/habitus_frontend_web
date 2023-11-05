import { OverlayTrigger } from 'react-bootstrap';

import { Habit } from "../../typeDefs";
import YesNoCheckbox from "./YesNoCheckbox";
import InputMeasurableField from "./InputMeasurableField";

import "./../../styles/MainTable.css";

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
      <th>
        <OverlayTrigger
          placement='auto'
          delay={{ show: 250, hide: 400 }}
          overlay={
            (props) =>
            (
              <div
                {...props}
                className='habitus-habit-data-container'
                style={{
                  ...props.style,
                  borderColor: `#${habit.hab_color}`
                }}
              >
                {
                  habit.hab_is_yn ?
                    <div><b>Yes/No Habit</b></div> :
                    <div><b>Measurable Habit</b></div>
                }
                <div><b>Description</b>: {habit.hab_description}</div>
                <div><b>Goal</b>: {habit.hab_goal} {habit.hab_units}</div>
              </div>
            )
          }
        >
          <div>{habit.hab_name}</div>
        </OverlayTrigger>
      </th >
      {RenderRowData()}
    </tr >
  );
};

export default MainTableRow;
