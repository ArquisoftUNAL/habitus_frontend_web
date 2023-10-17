import { LoginNavBar } from "../components/LoginNavBar";
import BlueButton from "../components/BlueButton";
import { useQuery, useLazyQuery } from "@apollo/client";
import { HABITS_BY_USER, GET_MEASURE_HABIT_STATISTICS, GET_YN_HABIT_STATISTICS } from "../graphql/Queries";
import { Habit, HistoryData } from "../typeDefs";
import { useEffect, useState } from "react";
import { PieChart } from "../components/PieChart";
// export const statisticsView2 = () => {

//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     const [habits, setHabits] = useState<Habit[]>([]);

//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     const { data, loading, error } = useQuery(HABITS_BY_USER);

//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     const habitList = useRef(["fdfdssdfsf","Ddaadsd","dsaasdd","dsadas","fdsdf","Ddaadsd","dsaasdd","dsadas","fdsdf","Ddaadsd","dsaasdd","dsadas","fdsdf","Ddaadsd","dsaasdd","dsadas","fdsdf"]);
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     const habName = useRef("aaaaa");
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     useEffect(() => {
//         if (data !== undefined && !loading) {
//             setHabits(data.habitsByUser ?? []);
//         }
//       }, [data, loading, habitList]);

//     function habitButtonList() {
//         return habits.map((habit: Habit) => {
//             return <BlueButton key={habit.hab_id} caption={habit.hab_name} onClick={() => {habName.current = habit.hab_name}}/>;
//         });
//     }

//     return (
//         <div className="container-fluid">
//             <LoginNavBar />
//             <div className="row">
//                 <div className="col-sm-3 p-4 m-3 border border-3 rounded-4">
//                     {habitButtonList()}
//                 </div>
//                 <div className="col-sm-7 p-3 my-3 border border-3 rounded-4">
//                     <div className="col-sm-10 offset-1">
//                         <div className="row">
//                             {habName.current}
//                         </div>
//                         <RadarChart />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

export const statisticsView = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [habit, setHabit] = useState<Habit|null>(null);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, loading, error } = useQuery(HABITS_BY_USER);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [ getMeasureHabitStatistics, { data: measureData, loading: measureLoading, error: measureError } ] = useLazyQuery(GET_MEASURE_HABIT_STATISTICS);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [ getYNHabitStatistics, { data: ynData, loading: ynLoading, error: ynError } ] = useLazyQuery(GET_YN_HABIT_STATISTICS);


    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (habit) {
            if (habit.hab_is_yn) {
                getYNHabitStatistics({
                    variables: {id: habit.hab_id}
                })
            } else {
                getMeasureHabitStatistics({
                    variables: {id: habit.hab_id}
                })
            }
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
                        </div>
                        { habit && 
                        <div className="row my-3">
                            <h3> Habit progress </h3>
                            { (habit.hab_is_yn && ynData) &&
                                <div className="row my-2">
                                    <div className="row my-2">
                                        <div className="col-sm-4 offset-2">
                                            <div className="row text-center">
                                                <h5>Month</h5>
                                            </div>
                                            <PieChart data={[ynData.habitYnReport.resume.month,1.0-ynData.habitYnReport.resume.month]
                                            } labels={["progress","remaining"]} />
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="row text-center">
                                                <h5>Semester</h5>
                                            </div>
                                            <PieChart data={[ynData.habitYnReport.resume.semester,1.0-ynData.habitYnReport.resume.semester]
                                            } labels={["progress","remaining"]} />
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-sm-4 offset-2">
                                            <div className="row text-center">
                                                <h5>Year</h5>
                                            </div>
                                            <PieChart data={[ynData.habitYnReport.resume.year,1.0-ynData.habitYnReport.resume.year]
                                            } labels={["progress","remaining"]} />
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="row text-center">
                                                <h5>Total</h5>
                                            </div>
                                            <PieChart data={[ynData.habitYnReport.resume.total,1.0-ynData.habitYnReport.resume.total]
                                            } labels={["progress","remaining"]} />
                                        </div>
                                    </div>
                                </div>
                            }
                            { (!habit.hab_is_yn && measureData) &&
                                <div className="row my-2">
                                    <div className="row my-2">
                                        <div className="col-sm-4">
                                            
                                            <div className="row text-center">
                                                <h5>Today</h5>
                                            </div>
                                            {measureData.habitMeasureReport.resume.toDay &&
                                            <PieChart data={[measureData.habitMeasureReport.resume.toDay.progress,measureData.habitMeasureReport.resume.toDay.remaining]
                                            } labels={["progress","remaining"]} />
                                            }
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="row text-center">
                                                <h5>Week</h5>
                                            </div>
                                            <PieChart data={[measureData.habitMeasureReport.resume.week.progress,measureData.habitMeasureReport.resume.week.remaining]
                                            } labels={["progress","remaining"]} />
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="row text-center">
                                                <h5>Month</h5>
                                            </div>
                                            <PieChart data={[measureData.habitMeasureReport.resume.month.progress,measureData.habitMeasureReport.resume.month.remaining]
                                            } labels={["progress","remaining"]} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-4 offset-2">
                                            <div className="row text-center">
                                                <h5>Semester</h5>
                                            </div>
                                            <PieChart data={[measureData.habitMeasureReport.resume.semester.progress,measureData.habitMeasureReport.resume.semester.remaining]
                                            } labels={["progress","remaining"]} />
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="row text-center">
                                                <h5>Year</h5>
                                            </div>
                                            <PieChart data={[measureData.habitMeasureReport.resume.year.progress,measureData.habitMeasureReport.resume.year.remaining]
                                            } labels={["progress","remaining"]} />
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        }
                        { habit && 
                        <div className="row bg-muted my-3">
                            <h3> History </h3>
                            { (habit.hab_is_yn && ynData) &&
                            <div className="row">
                                <div className="row text-center">
                                    <h5>Week</h5>
                                </div>
                                <div className="row my-2 bg-secondary border-secondary border-3 rounded-4">
                                    {ynData.habitYnReport.history.week.data.map((historyData: HistoryData) => { 
                                        return  <div className="col-sm-5 bg-light border border-3 rounded-4 m-3 text-center">
                                                    <div className="row p-2">
                                                        <h5>Year: {historyData.year}</h5>
                                                    </div>
                                                    <div className="row p-2">
                                                        <h5>Week of year: {historyData.week}</h5>
                                                    </div>
                                                    <div className="row p-2">
                                                        <h5>Count: {historyData.count}</h5>
                                                    </div>
                                                </div>
                                    })}
                                </div>
                                <div className="row text-center">
                                    <h5>Month</h5>
                                </div>
                                <div className="row my-2 bg-secondary border-secondary border-3 rounded-4">
                                    {ynData.habitYnReport.history.month.data.map((historyData: HistoryData) => { 
                                        return  <div className="col-sm-5 bg-light border border-3 rounded-4 m-3 text-center">
                                                    <div className="row p-2">
                                                        <h5>Year: {historyData.year}</h5>
                                                    </div>
                                                    <div className="row p-2">
                                                        <h5>Month: {historyData.month}</h5>
                                                    </div>
                                                    <div className="row p-2">
                                                        <h5>Count: {historyData.count}</h5>
                                                    </div>
                                                </div>
                                    })}
                                </div>
                                <div className="row text-center">
                                    <h5>Year</h5>
                                </div>
                                <div className="row my-2 bg-secondary border-secondary border-3 rounded-4">
                                    {ynData.habitYnReport.history.year.data.map((historyData: HistoryData) => { 
                                        return  <div className="col-sm-5 bg-light border border-3 rounded-4 m-3 text-center">
                                                    <div className="row p-2">
                                                        <h5>Year: {historyData.year}</h5>
                                                    </div>
                                                    <div className="row p-2">
                                                        <h5>Count: {historyData.count}</h5>
                                                    </div>
                                                </div>
                                    })}
                                </div>
                            </div>
                            }
                            { (!habit.hab_is_yn && measureData) &&
                            <div className="row">
                                <div className="row text-center">
                                    <h5>Today</h5>
                                </div>
                                <div className="row my-2 bg-secondary border-secondary border-3 rounded-4">
                                    {measureData.habitMeasureReport.history.day.data.map((historyData: HistoryData) => { 
                                        return  <div className="col-sm-5 bg-light border border-3 rounded-4 m-3 text-center">
                                                    <div className="row p-2">
                                                        <h5>Year: {historyData.year}</h5>
                                                    </div>
                                                    <div className="row p-2">
                                                        <h5>Day: {historyData.day}</h5>
                                                    </div>
                                                    <div className="row p-2">
                                                        <h5>Count: {historyData.value}</h5>
                                                    </div>
                                    </div>
                                    })}
                                </div>
                            </div>
                            }
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default statisticsView;