export interface HabitData {
  hab_dat_id: string;
  hab_dat_amount: string;
  hab_dat_collected_at: string;
  hab_id: string;
}

export interface Habit {
  hab_id: string;
  hab_name: string;
  hab_description: string;
  hab_created_at: string;
  hab_updated_at: string;
  usr_id: string;
  hab_is_yn: boolean;
  hab_is_favorite: boolean;
  hab_next_closure_date: string;
  hab_color: string;
  hab_units: string;
  hab_goal: number;
  hab_freq_type: string;
  data: HabitData[];
}

export interface HabitData {
  hab_dat_id: string;
  hab_dat_amount: string;
  hab_dat_collected_at: string;
}