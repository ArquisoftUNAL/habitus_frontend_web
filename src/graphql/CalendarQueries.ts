import { gql } from '@apollo/client';

export const CALENDAR_RESUMED_DATA = gql`
    query HabitsDataCalendar (
        $start_date: String!
        $end_date: String!
    ) {
        calendarEventsByUser(
            start_date: $start_date
            end_date: $end_date
        ) {
            date
            data
            relative_frequency
        }
    }
`;

export const CALENDAR_HABIT_RESUME_DATA = gql`
    query HabitsDataCalendar(
        $start_date: String!
        $end_date: String!
        $hab_id: String!
    ) {
    calendarEventsByHabit(
        start_date: $start_date
        end_date: $end_date
        id: $hab_id
    ) {
        date
        data
        relative_frequency
    }
}
`;