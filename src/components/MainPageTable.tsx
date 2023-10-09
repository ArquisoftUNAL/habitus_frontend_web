import { useQuery } from "@apollo/client";
import { GET_USER_HABITS } from "../graphql/Queries";
import { Habit } from "../typeDefs";

export const MainPageTable = () => {
  const last7Days = Array.from({ length: 7 }, (_, index) => {
    const day = new Date();
    day.setDate(day.getDate() - index);
    return day.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  });

  // Use the useQuery hook to fetch data
  const { data, loading, error } = useQuery(GET_USER_HABITS);

  if (loading) {
    return <p>Loading...</p>; // Display a loading indicator
  }

  if (error) {
    console.error("Error fetching data:", error);
    return <p>Error loading data.</p>; // Display an error message
  }

  const habitsByUser = data?.habitsByUser || []; // Ensure it's an array

  return (
    <table className="table">
      <thead>
        <tr>
          {last7Days.map((day, index) => (
            <th key={index} scope="col">
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {habitsByUser.map((habit: Habit, index: number) => (
          <tr key={index}>
            <th scope="row">{habit.hab_name}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
