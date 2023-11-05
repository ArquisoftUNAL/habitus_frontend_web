import BlueButton from "../components/BlueButton";
import { useQuery, useLazyQuery } from "@apollo/client";
import { HABITS_BY_USER, HABIT_ACHIEVEMENTS, ACHIEVEMENT_MILESTONES } from "../graphql/Queries";
import { Habit, Milestone } from "../typeDefs";
import { useEffect, useState } from "react";
import { PieChart } from "../components/PieChart";
import LoadingView from "./LoadingView";
import { NavBar } from "../components/NavBar";

import "./../styles/GeneralStyles.css";

export const AchievementsView = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [habit, setHabit] = useState<Habit | null>(null);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, loading, error } = useQuery(HABITS_BY_USER);

    const [getAchievementsByHabit, { data: achData, loading: achLoading, error: achError }] = useLazyQuery(HABIT_ACHIEVEMENTS);

    const [getMilestonesByAchievement, { data: milData, loading: milLoading, error: milError }] = useLazyQuery(ACHIEVEMENT_MILESTONES);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (habit) {
            getAchievementsByHabit({
                variables: { id: habit.hab_id },
                onCompleted(achievementData) {
                    if (achievementData.achievementsByHabit.data) {
                        if (achievementData.achievementsByHabit.data.length > 0) {
                            getMilestonesByAchievement({
                                variables: { id: achievementData.achievementsByHabit.data[0].id },
                            })
                        }
                    }
                }
            })
        }
    }, [habit]);

    if (loading) {
        return <LoadingView />;
    }
    if (error) {
        return <div>{JSON.stringify(error)}</div>
    }

    const habitList = data.habitsByUser ?? [];
    function habitButtonList() {
        return habitList.map((habit: Habit) => {
            return <BlueButton key={habit.hab_id} caption={habit.hab_name} onClick={() => { setHabit(habit) }} />;
        });
    }

    const achievementsList = achData?.achievementsByHabit.data ?? [];

    function RenderAchievements() {

        if (habit === null) {
            return <div className="habitus-large-text">
                No habit chosen
            </div>;
        }

        if (achLoading) {
            return <LoadingView />;
        }

        if (achError) {
            return <div>{JSON.stringify(achError)}</div>;
        }

        if (achievementsList.length === 0) {
            return <div className="habitus-large-text">
                No achievements for this habit
            </div>;
        }

        const achievement = achievementsList[0];

        const currentStreakToGraphicate = achievement.currentStreak > 0 ? achievement.currentStreak : 0.1;
        const highestStreakToGraphicate = achievement.highestStreak - achievement.currentStreak > 0 ? achievement.highestStreak - achievement.currentStreak : 0.1;

        return (
            <div className="row my-3">
                <div className="habitus-large-text">
                    Status for achievement: {achievement.name}
                </div>
                <div className="col-12 col-sm-6 my-3">
                    <h3 className="habitus-large-text">
                        Current streak: {achievement.currentStreak}
                    </h3>
                </div>
                <div
                    className="col-12 col-sm-6 my-3"
                >
                    <h3 className="habitus-large-text">
                        Record streak: {achievement.highestStreak}
                    </h3>
                </div>
                <div
                    className="col-8 my-3"
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <PieChart
                        data={[currentStreakToGraphicate, highestStreakToGraphicate]}
                        labels={["progress", "remaining"]}
                    />
                </div>
            </div>
        )
    }

    function RenderMilestones() {

        if (achievementsList.length == 0) {
            return <div className="habitus-large-text">
                No achievement chosen
            </div>;
        }

        if (milLoading || !milData) {
            return <LoadingView />;
        }

        if (milError) {
            return <div>{JSON.stringify(milError)}</div>;
        }

        return (
            <div className="row my-2">
                <div className="col-12 habitus-large-text">
                    Milestones
                </div>
                {
                    milData.milestonesByAchievement.data.length === 0 ?
                        <div className="col-12 habitus-medium-text">
                            No milestones for this achievement
                        </div>
                        :
                        milData.milestonesByAchievement.data.map((milestone: Milestone, index: number) => {
                            return <div className="col-12 col-sm-3 my-3" key={index}>
                                <div className="my-3 habitus-medium-text">
                                    Date: {milestone.date} - Streak: {milestone.streak}
                                </div>
                            </div>
                        })
                }
            </div>
        )
    }

    return (
        <div className="container-fluid">
            <NavBar />
            <div className="row text-center">
                <div className="col-12 habitus-page-title habitus-with-bottomline">
                    Achievements
                </div>
                <div className="habitus-separator"></div>
                <div className="col-sm-3 p-4 m-3 border border-3 rounded-4">
                    {habitButtonList()}
                </div>
                <div className="col-sm-7 p-3 my-3 border border-3 rounded-4">
                    <div className="col-sm-10 offset-1">
                        <div className="row my-3 text-center">
                            <h1 className="col-12 habitus-large-text">
                                Chosen Habit: {habit ? habit.hab_name : "Select a habit"}
                            </h1>
                            {habit &&
                                <div className="row">
                                    {(achData) &&
                                        <div className="row my-2">
                                            {RenderAchievements()}
                                            {RenderMilestones()}
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AchievementsView;