import React, { useEffect, useState } from "react";

export const CurrentWeatherForecast = (props) => {
    const { currentWeather } = props;
    const [progressValue, setValue] = useState(0);
    var value = 0;

    useEffect(() => {
        const interval = setInterval(() => {
            console.log("This will run every second!");
            setValue((progressValue) => progressValue + 1);
            /*if (progressValue > 60) {
                setValue((progressValue) => (progressValue = 0));
            }*/
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    console.log(progressValue);
    // trigger the event in App js that will refresh the data
    return (
        <div>
            <label htmlFor="file">Downloading progress:</label>
            <progress id="file" value={progressValue} max="60">
                {progressValue}%
            </progress>
        </div>
    );
};
