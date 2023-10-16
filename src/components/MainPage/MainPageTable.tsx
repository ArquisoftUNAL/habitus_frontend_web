import { useQuery } from "@apollo/client";
import { GET_USER_HABITS } from "../../graphql/Queries";
import { Habit } from "../../typeDefs";
import { useEffect, useState } from "react";
import MainTableRow from "./MainTableRow";

export const MainPageTable = () => {
  const last7Days = Array.from({ length: 7 }, (_, index) => {
    const day = new Date();
    day.setDate(day.getDate() - index);
    return day.toISOString().slice(0, 10);
  });

  const [habits, setHabits] = useState<Habit[]>([]);

  // Use the useQuery hook to fetch data
  const { data, loading, error } = useQuery(GET_USER_HABITS);

  useEffect(() => {
    if (data !== undefined && !loading) {
      setHabits(data.habitsByUser ?? []);
    }
  }, [data, loading]);

  if (loading) {
    return <p>Loading...</p>; // Display a loading indicator
  }

  if (error) {
    console.error("Error fetching data:", error);
    return <p>Error loading data.</p>; // Display an error message
  }

  function renderLast7Days(last7Days: string[]) {
    return last7Days.map((day, index) => (
      <th key={index} scope="col">
        {day}
      </th>
    ));
  }

  function renderHabits() {
    return habits.map((habit: Habit) => {
      return <MainTableRow habit={habit} last7Days={last7Days} />;
    });
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <td></td>
          {renderLast7Days(last7Days)}
        </tr>
      </thead>
      <tbody>{renderHabits()}</tbody>
    </table>
  );
};
