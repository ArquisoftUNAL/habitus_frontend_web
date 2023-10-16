import { LoginNavBar } from "../components/LoginNavBar";
import BlueButton from "../components/BlueButton";
import { useQuery, useLazyQuery } from "@apollo/client";
import { HABITS_BY_USER, HABIT_ACHIEVEMENTS, ACHIEVEMENT_MILESTONES } from "../graphql/Queries";
import { Habit, Achievement, Milestone } from "../typeDefs";
import { useEffect, useState } from "react";
import { PieChart } from "../components/PieChart";

export const achievementsView = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [habit, setHabit] = useState<Habit|null>(null);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, loading, error } = useQuery(HABITS_BY_USER);

    const [ getAchievementsByHabit, { data: achData, loading: achLoading, error: achError } ] = useLazyQuery(HABIT_ACHIEVEMENTS);

    const [ getMilestonesByAchievement, { data: milData, loading: milLoading, error: milError } ] = useLazyQuery(ACHIEVEMENT_MILESTONES);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (habit) {
            getAchievementsByHabit({
                variables: {id: habit.hab_id},
                onCompleted(achievementData) {
                    if (achievementData.achievementsByHabit.data) {
                        if (achievementData.achievementsByHabit.data.length > 0) {
                            getMilestonesByAchievement({
                                variables: {id: achievementData.achievementsByHabit.data[0].id},
                            })
                        }
                    }
                }
            })
        }
    }, [habit]);

    if (loading) {
        return <div>loading...</div>
    }
    if (error) {
        return <div>{JSON.stringify(error)}</div>
    }

    const habitList = data.habitsByUser ?? [];
    function habitButtonList() {
        return habitList.map((habit: Habit) => {
            return <BlueButton key={habit.hab_id} caption={habit.hab_name} onClick={() => {setHabit(habit)}}/>;
        });
    }

    return (
        <div className="container-fluid">
            <LoginNavBar />
            <div className="row">
                <div className="col-sm-3 p-4 m-3 border border-3 rounded-4">
                    {habitButtonList()}
                </div>
                <div className="col-sm-7 p-3 my-3 border border-3 rounded-4">
                    <div className="col-sm-10 offset-1">
                        <div className="row my-3 text-center">
                            <h1>
                                {habit ? habit.hab_name : "Select a habit"}
                            </h1>
                            { habit && 
                            <div className="row">
                                { (achData) &&
                                <div className="row my-2">
                                    {achData.achievementsByHabit.data.map((achievement: Achievement) => {
                                        return  <div className="row my-3">
                                                    <div className="row my-3">
                                                        <h3>
                                                            Current streak: {achievement.currentStreak}
                                                        </h3>
                                                    </div>
                                                    <div className="row my-3">
                                                        <h3>
                                                            Record streak: {achievement.highestStreak}
                                                        </h3>
                                                    </div>
                                                    <div className="row my-3">
                                                    <PieChart data={[achievement.currentStreak,achievement.highestStreak-achievement.currentStreak]
                                                    } labels={["progress","remaining"]} />
                                                    </div>
                                                    {JSON.stringify(achievement)}
                                                </div>
                                    })}
                                    { milData &&
                                    <div className="row my-2">
                                        {milData.milestonesByAchievement.data.map((milestone: Milestone) => {
                                            return  <div className="row my-3">
                                                        <div className="row my-3">
                                                            {milestone.id}
                                                        </div>
                                                    </div>
                                        })}
                                    </div>
                                    }
                                    {JSON.stringify(milData)}
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

export default achievementsView;