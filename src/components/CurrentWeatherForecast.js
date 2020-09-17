import React, { useEffect, useState } from "react";

export const CurrentWeatherForecast = (props) => {
    const { currentWeather } = props;
    const [progressValue, setValue] = useState(0);
    var currentTemp;
    var currentCity;
    var today = new Date();
    var time =
        today.getHours() +
        ":" +
        (today.getMinutes() < 10
            ? "0" + today.getMinutes()
            : today.getMinutes()) +
        ":" +
        today.getSeconds();
    console.log(time);
    /**useEffect(() => {
        const interval = setInterval(() => {
            setValue(prevProgressValue => prevProgressValue === 60 ? 0 : prevProgressValue + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => progressValue === 60 && props.handleRefresh(), [progressValue]); */
    useEffect(() => {
        const interval = setInterval(() => {
            props.handleRefresh();
        }, 20000);
        const updateProgressBar = setInterval(() => {
            setValue((progressValue) =>
                progressValue < 61 ? progressValue + 1 : (progressValue = 0)
            );
        }, 1000);
        return () => clearInterval(interval, updateProgressBar);
    }, []);
    if (
        Object.keys(currentWeather).length !== 0 &&
        currentWeather.constructor === Object
    ) {
        currentCity = currentWeather.name;
        currentTemp = currentWeather.main.temp;
    }

    console.log(currentTemp);
    console.log(currentWeather);

    return (
        <div>
            <React.Fragment>
                <h3>{currentCity}</h3>
                <h3>{time}</h3>
                <h3>{currentTemp}</h3>
                <label htmlFor="file">
                    Reloading in: {60 - progressValue} seconds
                </label>
                <progress id="file" value={progressValue} max="60">
                    {progressValue}%
                </progress>
            </React.Fragment>
        </div>
    );
};
