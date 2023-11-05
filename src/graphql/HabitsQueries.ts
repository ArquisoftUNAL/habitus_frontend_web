import { gql } from "@apollo/client";

export const USER_HABITS_FULL_DATA = gql`
    query UserHabitsCategories(
        $habits_page: Int!
        $habits_per_page: Int!
        $categories_page: Int!
        $categories_per_page: Int!
        $habits_data_page: Int!
        $habits_data_per_page: Int!
        $start_date: String!
        $end_date: String!
    ) {
        habitsByUser(
            page: $habits_page
            per_page: $habits_per_page
        ) {
            hab_id
            cat_id
            hab_name
            hab_description
            hab_goal
            hab_is_favorite
            hab_is_yn
            hab_color
            hab_units
            hab_location
        }

        habitdataByUser(
            start_date: $start_date
            end_date: $end_date
            page: $habits_data_page
            per_page: $habits_data_per_page
        ) {
            hab_dat_id
            hab_dat_amount
            hab_dat_collected_at
            hab_id
        }

        categories(
            page: $categories_page
            per_page: $categories_per_page
        ) {
            cat_id
            cat_name
        }
    }
`;

export const GET_CATEGORIES = gql`
query GetCategories {
    categories {
        cat_id
        cat_name
    }
}
`;