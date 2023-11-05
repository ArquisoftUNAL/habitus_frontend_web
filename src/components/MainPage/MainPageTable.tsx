import { useLazyQuery } from "@apollo/client";

import { USER_HABITS_FULL_DATA } from "../../graphql/HabitsQueries";
import { Habit, Category, HabitData } from "../../typeDefs";
import { useEffect } from "react";
import MainTableRow from "./MainTableRow";
import LoadingView from "../../views/LoadingView";

const DAYS_OFFSET = 7;
const PAGE_LIMIT = 1000;

export const MainPageTable = () => {

  // Get the start and end dates for the query
  const endDate = new Date();
  const startDate = (new Date(endDate)).setDate(endDate.getDate() - DAYS_OFFSET);

  const endDateOnly = endDate.toISOString().split('T')[0];
  const startDateOnly = new Date(startDate).toISOString().split('T')[0];

  const [launchHabitsQuery, { loading, error, data }] = useLazyQuery(
    USER_HABITS_FULL_DATA, {
    variables: {
      habits_page: 1,
      habits_per_page: PAGE_LIMIT,
      categories_page: 1,
      categories_per_page: PAGE_LIMIT,
      habits_data_page: 1,
      habits_data_per_page: PAGE_LIMIT,
      start_date: startDateOnly,
      end_date: endDateOnly,
    }
  });

  useEffect(() => {
    launchHabitsQuery();
  }, []);

  if (error) {
    console.error("Error fetching data:", error);
    console.log(JSON.stringify(error));
    return <p>Error loading data.</p>; // Display an error message
  }

  if (loading || !data) {
    return <LoadingView />;
  }

  // Cache data to make it easier to use later while rendering
  let categories: { [key: string]: Category } = {};
  let habits: { [key: string]: Habit } = {};

  data.categories.forEach((category: Category) => {
    categories[category.cat_id] = category;
  });

  data.habitsByUser.forEach((habit: Habit) => {
    let new_habit: Habit = { ...habit };
    new_habit.category = categories[habit.cat_id];
    new_habit.data = {};
    habits[habit.hab_id] = new_habit;
  });

  data.habitdataByUser.forEach((data: HabitData) => {
    habits[data.hab_id].data[data.hab_dat_collected_at] = data;
  });

  const last7Days = Array.from({ length: DAYS_OFFSET }, (_, index) => {
    const day = new Date();
    day.setDate(day.getDate() - index);
    return day.toISOString().slice(0, 10);
  });

  function renderLast7Days() {
    return last7Days.map((day, index) => (
      <th key={index} scope="col">
        {day}
      </th>
    ));
  }

  function renderHabits() {
    return Object.keys(habits).map((habit_id: string, index: number) => {
      const habit = habits[habit_id];

      return <MainTableRow
        key={index}
        habit={habit}
        last7Days={last7Days}
      />;
    });
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <td></td>
          {renderLast7Days()}
        </tr>
      </thead>
      <tbody>
        {renderHabits()}
      </tbody>
    </table>
  );
};


