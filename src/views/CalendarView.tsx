import React, { useEffect } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { OverlayTrigger } from 'react-bootstrap';

import LoadingView from './LoadingView';
import { NavBar } from '../components/NavBar';
import { CalendarPieChart } from '../components/CalendarChart';
import { CALENDAR_RESUMED_DATA, CALENDAR_HABIT_RESUME_DATA } from './../graphql/CalendarQueries';
import { GET_USER_HABITS } from './../graphql/Queries';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November',
    'December'
];

import "./../styles/CalendarView.css";
import "./../styles/GeneralStyles.css";

interface DayDataContainer {
    selectedDayData: any,
    props: any
}
const BuildDayDataContainer: React.FC<DayDataContainer> = ({ selectedDayData, props }) => {

    // Build data for pie chart
    const pieChartData = selectedDayData && {
        data: [selectedDayData.relative_frequency, 1 - selectedDayData.relative_frequency],
        labels: ['Ocurrences', 'Remaining'],
        label: 'Ocurrences vs Total ocurrences in month',
        colors: ['#002B99', '#F6F6A4']
    };
    return (
        <div
            {...props}
        >
            <div className='row habitus-calendar-stats-data' style={{
                backgroundColor: "#FFFFFF",
                width: 500,
                height: 600,
                borderWidth: 3,
                borderColor: '#002B99',
                borderRadius: 10,
                borderStyle: 'solid',
            }}>
                <div className="col-4"></div>
                <div
                    className='col-4 text-center'
                    style={{
                        width: '100%'
                    }}
                >
                    <div className="habitus-large-text">
                        <b>Chosen date</b>: {selectedDayData.date}
                    </div>
                    <div className="habitus-large-text">
                        <b>Amount for that day</b>: {selectedDayData.data}
                    </div>
                    <div className="habitus-large-text">
                        <b>Relative frequency {"based on month"}</b>
                    </div>

                    <CalendarPieChart
                        data={pieChartData.data}
                        labels={pieChartData.labels}
                        label={pieChartData.label}
                        colors={pieChartData.colors}
                    />
                </div>
                <div className="col-4"></div>
            </div>
        </div>
    )
}

// Build calendar header
const BuildCalendarHeader = () => {
    return (
        <div className="row" style={{ marginLeft: "0px", paddingRight: "0px", paddingLeft: "0px" }}>
            <div className="col-3" />
            {

                weekDays.map((day, index) => {
                    return (
                        <div key={"w_h" + index} className="col-1 habitus-medium-text habitus-calendar-day-header">
                            {day}
                        </div>
                    );
                })
            }
            <div className="col-2" />
        </div>
    );
}

interface BuildCalendarDaysProps {
    start_date: any,
    end_date: any,
    calendarData: any,
    setSelectedDayData: any
}

const BuildCalendarDays = ({
    start_date, end_date, calendarData, setSelectedDayData
}: BuildCalendarDaysProps): JSX.Element => {

    // Get day of week of start date
    const start_day = start_date.getDay();

    // Get total number of days
    const total_days = (end_date.getTime() - start_date.getTime()) / (1000 * 3600 * 24);

    // Get array of day numbers
    const days: number[] = [], weeks = [];

    // Fill offset days with -1
    for (let i = 0; i < start_day; i++) {
        days.push(-1);
    }

    for (let i = 0; i < total_days; i++) {
        days.push(i + 1);
    }

    // Fill remaining days with -1
    for (let i = 0; i < 7 - (total_days + start_day) % 7; i++) {
        days.push(-1);
    }

    for (let i = 0; i < days.length; i += 7) {
        weeks.push(days.slice(i, i + 7));
    }

    // Data is already grouped by day
    return (
        <div>
            {weeks.map(
                (weekDays: any, weekIndex: number) => {
                    return (
                        <div className='row' key={"w_" + weekIndex}>
                            <div className='col-3' />
                            {
                                weekDays.map((day: any, weeDayIndex: number) => {
                                    if (day == -1) {
                                        return (
                                            <div className='col-1' key={"wc_" + weekIndex + "_d_" + weeDayIndex}>
                                            </div>
                                        );
                                    } else {
                                        const date = new Date(start_date.getFullYear(), start_date.getMonth(), day);
                                        const date_string = date.toISOString().split('T')[0];

                                        const matched_item = calendarData.find((item: any) => item.date == date_string);

                                        return (
                                            <div className='col-1' key={"wc_" + weekIndex + "_d_" + weeDayIndex}>
                                                {matched_item ?
                                                    <OverlayTrigger
                                                        placement='auto'
                                                        delay={{ show: 250, hide: 400 }}
                                                        overlay={
                                                            (props) =>
                                                            (
                                                                <BuildDayDataContainer
                                                                    props={props}
                                                                    selectedDayData={matched_item}
                                                                />
                                                            )
                                                        }
                                                    >
                                                        <div
                                                            className='habitus-medium-text habitus-calendar-day-focused-cell'
                                                            style={{ "cursor": "pointer" }}
                                                            onClick={() => {
                                                                setSelectedDayData(matched_item);
                                                            }}
                                                        >
                                                            {day}
                                                        </div>
                                                    </OverlayTrigger> :
                                                    <div
                                                        className='habitus-medium-text habitus-calendar-day-cell'
                                                    >
                                                        {day}
                                                    </div>
                                                }

                                            </div>
                                        );
                                    }
                                })
                            }
                            <div className="col-2" />
                        </div>
                    )
                }
            )}

        </div >
    )
}

interface SwitchProps {
    period: string,
    dates: any,
    setDates: any
}

const switchNext = ({ period, dates, setDates }: SwitchProps) => {
    switch (period) {
        case 'week':
            setDates([
                new Date(dates[0].getFullYear(), dates[0].getMonth(), dates[0].getDate() + 7),
                new Date(dates[1].getFullYear(), dates[1].getMonth(), dates[1].getDate() + 7)
            ]);
            break;
        case 'month':
        default:
            setDates([
                new Date(dates[0].getFullYear(), dates[0].getMonth() + 1, dates[0].getDate()),
                new Date(dates[1].getFullYear(), dates[1].getMonth() + 1, dates[1].getDate())
            ]);
            break;
    }
}

const switchPrevious = ({ period, dates, setDates }: SwitchProps) => {
    switch (period) {
        case 'week':
            setDates([
                new Date(dates[0].getFullYear(), dates[0].getMonth(), dates[0].getDate() - 7),
                new Date(dates[1].getFullYear(), dates[1].getMonth(), dates[1].getDate() - 7)
            ]);
            break;
        case 'month':
        default:
            setDates([
                new Date(dates[0].getFullYear(), dates[0].getMonth() - 1, dates[0].getDate()),
                new Date(dates[1].getFullYear(), dates[1].getMonth() - 1, dates[1].getDate())
            ]);
            break;
    }
}

interface CalendarDay {
    date: string,
    data: string,
    relative_frequency: number
}

const CalendarView: React.FC = () => {

    const [period, _] = React.useState('month');
    const [__, setSelectedDayData] = React.useState<CalendarDay | null>(null);
    const [habit, setHabit] = React.useState<any>(null);

    const current_date = new Date();

    // Get start and end days of current month
    let start_date, end_date;

    switch (period) {
        case 'week':
            start_date = new Date(current_date.getFullYear(), current_date.getMonth(), current_date.getDate() - current_date.getDay());
            end_date = new Date(current_date.getFullYear(), current_date.getMonth(), current_date.getDate() - current_date.getDay() + 6);
            break;
        case 'month':
        default:
            start_date = new Date(current_date.getFullYear(), current_date.getMonth(), 1);
            end_date = new Date(current_date.getFullYear(), current_date.getMonth() + 1, 0);
            break;
    }

    const [dates, setDates] = React.useState([start_date, end_date]);

    const { loading: habitsLoading, error: habitsError, data: habitsData } = useQuery(GET_USER_HABITS);

    const [queryByUser, { data: queryByUserData, error: queryByUserError, loading: queryByUserLoading }] = useLazyQuery(
        CALENDAR_RESUMED_DATA
    )

    const [queryByHabit, { data: queryByHabitData, error: queryByHabitError, loading: queryByHabitLoading }] = useLazyQuery(
        CALENDAR_HABIT_RESUME_DATA
    );

    useEffect(() => {
        if (!habit) {
            queryByUser({
                variables: {
                    start_date: dates[0].toISOString().split('T')[0],
                    end_date: dates[1].toISOString().split('T')[0]
                }
            });
        }
        else {
            queryByHabit({
                variables: {
                    start_date: dates[0].toISOString().split('T')[0],
                    end_date: dates[1].toISOString().split('T')[0],
                    hab_id: habit.value
                }
            });
        }
    }, [habit]);

    if (habitsLoading) return <LoadingView />;

    if (habitsError) return <div>Error</div>;

    let habits = [];

    if (habitsData?.habitsByUser) {
        // Build habits array
        habits = habitsData.habitsByUser.map((habit: any) => ({
            label: habit.hab_name,
            value: habit.hab_id,
        }));
    }

    if (queryByUserLoading) return <LoadingView />;
    if (queryByUserError) return <div>Error</div>;
    if (queryByHabitLoading) return <LoadingView />;
    if (queryByHabitError) return <div>Error</div>;

    const calendarData = habit ? queryByHabitData?.calendarEventsByHabit : queryByUserData?.calendarEventsByUser;

    return (
        <div className="row text-center">
            <NavBar />
            <div className="col-12 habitus-page-title habitus-with-bottomline">
                Calendar
            </div>
            <div className="habitus-separator"></div>
            <div className="col-12 col-md-4">
                <div className="col-12 habitus-small-text">
                    <div className="col-12 habitus-large-text">
                        Choose an habit to see its calendar view
                    </div>
                    <div style={{
                        overflowY: 'scroll',
                        maxHeight: '450px'
                    }}>
                        <div className='col-12 habitus-spacing'></div>
                        <div className='col-12'
                            onClick={() => {
                                setHabit(null);
                            }}
                        >
                            <div className="btn btn-primary habitus-button">
                                All habits
                            </div>
                        </div>
                        <div className='col-12 habitus-spacing' />
                        {
                            habits.map((item: any) => {
                                return (
                                    <div className='col-12'
                                        onClick={() => {
                                            setHabit(item);
                                        }}
                                    >
                                        <div className="btn btn-primary habitus-button">
                                            {item.label}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-7">
                <div className="row">
                    <div className="col-9 offset-2 habitus-large-text">
                        {period == 'month' ? 'Monthly' : 'Weekly'} Calendar
                    </div>
                    <div className="col-1"></div>
                    <div className='col-4 offset-2'>
                        <div
                            className="btn btn-primary habitus-button"
                            onClick={() => {
                                switchPrevious({ period, dates, setDates });
                            }}
                        >
                            {"< Previous"}
                        </div>
                    </div>
                    <div className='col-4 offset-1'>
                        <div
                            className="btn btn-primary habitus-button"
                            onClick={() => {
                                switchNext({ period, dates, setDates });
                            }}
                        >
                            {"Next >"}
                        </div>
                    </div>
                    <div className='col-1' />
                    <div className="col-9 offset-2 habitus-large-text">
                        {months[dates[0].getMonth()]} - {dates[0].getFullYear()}
                    </div>
                    <div className="col-1"></div>
                    <BuildCalendarHeader />
                    {
                        calendarData &&
                        <BuildCalendarDays
                            start_date={dates[0]}
                            end_date={dates[1]}
                            calendarData={calendarData}
                            setSelectedDayData={setSelectedDayData}
                        />
                    }
                </div>
            </div>
            <div className='col-12 col-md-1' />
            <div className="habitus-separator"></div>
        </div>
    );
};

export default CalendarView;