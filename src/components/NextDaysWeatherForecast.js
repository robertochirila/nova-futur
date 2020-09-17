import React from "react";

export const NextDaysWeatherForecast = (props) => {
    const { nextDaysWeather } = props;
    let auxIndex = 0;
    let icon;
    let d = new Date();
    let n = d.getDay();
    let daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    return (
        <div>
            {nextDaysWeather.map((days, index) => {
                if (auxIndex < nextDaysWeather.length) {
                    let requiredDay = nextDaysWeather[auxIndex];
                    auxIndex = auxIndex + 8;
                    icon = requiredDay.weather[0].icon;
                    let iconAPI = `http://openweathermap.org/img/wn/${icon}.png​`;
                    n = n + 1;
                    if (n === 7) {
                        n = 0;
                    }
                    return (
                        <div key={index}>
                            <span>{daysOfWeek[n]}</span>
                            <span>{requiredDay.main.temp}&deg;C</span>
                            <span>{requiredDay.weather[0].description}</span>
                            <img src={iconAPI}></img>
                        </div>
                    );
                }
            })}
        </div>
    );
};
