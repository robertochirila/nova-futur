import React, { useEffect, useState } from "react";

export const CurrentWeatherForecast = (props) => {
    const { currentWeather } = props;
    const [progressValue, setValue] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setValue((progressValue) =>
                progressValue < 6 ? progressValue + 1 : (progressValue = 0)
            );
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    if (progressValue === 5) {
        props.handleRefresh();
    }

    return (
        <div>
            <label htmlFor="file">Downloading progress:</label>
            <progress id="file" value={progressValue} max="60">
                {progressValue}%
            </progress>
        </div>
    );
};
