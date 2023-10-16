import { gql } from "@apollo/client";

export const GET_USER_HABITS = gql`
  query GetUserHabits {
    habitsByUser {
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
    }
  }
`;

export const HABITS_BY_USER = gql`
  query HabitsByUser {
    habitsByUser {
        hab_id
        hab_name
        hab_is_yn
    }
  }
  `;

export const GET_MEASURE_HABIT_STATISTICS = gql`
    query GetMeasureStatisticsReport(
        $id: String!
    ) {
        habitFMeasureReport(
            id: $id
        ){
            resume {
                toDay {
                    percentage
                    progress
                    remaining
                }
                week {
                    percentage
                    progress
                    remaining
                }
                month {
                    percentage
                    progress
                    remaining
                }
                semester {
                    percentage
                    progress
                    remaining
                }
                year {
                    percentage
                    progress
                    remaining
                }
            }
            history {
                day {
                    data {
                        year
                        month
                        day
                        value
                    }
                }
                week {
                    data {
                        year
                        month
                        day
                        value
                    }
                }
                month {
                    data {
                        year
                        month
                        day
                        value
                    }
                }
                semester {
                    data {
                        year
                        month
                        day
                        value
                    }
                }
                year {
                    data {
                        year
                        month
                        day
                        value
                    }
                }
            }
            streaks {
                data {
                    start_date
                    end_date
                    quantity
                }
            }
            days_frequency {
                data {
                    year
                    month
                    week_day
                    quantity
                }
            }
        }
    }
`;

export const GET_YN_HABIT_STATISTICS = gql`
    query GetYnStatisticsReport(
        $id: String!
    ) {
        habitYnReport(
            id: $id
        ){
            resume {
                month
                semester
                year
                total
            }
            history {
                week {
                    data {
                        year
                        week
                        month
                        semester
                        count
                    }
                }
                month {
                    data {
                        year
                        week
                        month
                        semester
                        count
                    }
                }
                semester {
                    data {
                        year
                        week
                        month
                        semester
                        count
                    }
                }
                year {
                    data {
                        year
                        week
                        month
                        semester
                        count
                    }
                }
            }
            streaks {
                data {
                    start_date
                    end_date
                    quantity
                }
            }
            days_frequency {
                data {
                    year
                    month
                    week_day
                    quantity
                }
            }
        }
    }
`;

export const HABIT_ACHIEVEMENTS = gql`
    query HabitAchievements (
        $id: String!
    ) {
        achievementsByHabit(
            id: $id
        ) {
            data {
                currentStreak
                highestStreak
                name
                id
            }
        }
    }
`;

export const ACHIEVEMENT_MILESTONES = gql`
    query AchievementsMilestones (
        $id: String!
    ) {
        milestonesByAchievement(
            id: $id
        ) {
            data {
                streak
                date
                id
            }
        }
    }
`;