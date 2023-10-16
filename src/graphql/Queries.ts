import { gql } from "@apollo/client";

export const GET_USER_HABITS = gql`
  query GetUserHabits($per_page: Int) {
    habitsByUser(per_page: $per_page) {
      hab_name
      hab_created_at
      hab_freq_type
      hab_next_closure_date
      hab_is_yn
      hab_units
      hab_id
    }
  }
`;

export const GET_HABIT_OCURRENCES = gql`
  query GetHabitOcurrences(
    $habitId: String!
    $startDate: String!
    $endDate: String!
  ) {
    habitdataByHabit(id: $habitId, start_date: $startDate, end_date: $endDate) {
      hab_dat_collected_at
      hab_dat_amount
      hab_dat_id
    }
  }
`;


export const USER_NOTIFICATIONS = gql`
  query GetUserNotifications {
    getNotificationsUser {
      noti_title
      noti_body
      noti_should_email
      noti_init_date
    }
  }
`;