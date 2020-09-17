import React, { useEffect, useState } from "react";

/*export const CurrentWeatherForecast = (props) => {
    const { currentWeather } = props;
    const [progressValue, setValue] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setValue((progressValue) => {
                if (progressValue < 5) return progressValue + 1;
                else {
                    props.handleRefresh();
                    return 0;
                }
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <label htmlFor="file">Downloading progress:</label>
            <progress id="file" value={progressValue} max="60">
                {progressValue}%
            </progress>
        </div>
    );
};*/

export const CurrentWeatherForecast = (props) => {
    const [progressValue, setValue] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            props.handleRefresh();
        }, 10000);
        const updateProgressBar = setInterval(() => {
            setValue((progressValue) =>
                progressValue < 61 ? progressValue + 1 : (progressValue = 0)
            );
        }, 1000);
        return () => clearInterval(interval, updateProgressBar);
    }, []);

    return (
        <div>
            <label htmlFor="file">Downloading progress:</label>
            <progress id="file" value={progressValue} max="60">
                {progressValue}%
            </progress>
        </div>
    );
};
