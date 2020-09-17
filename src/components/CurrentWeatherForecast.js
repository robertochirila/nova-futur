import React, { useEffect, useState } from "react";
import styled from "styled-components";

const CurrentWeatherWrapper = styled.div`
    display: inline-block;
    min-width: 100%;
    text-align: center;
`;

export const Col = styled.div`
    width: 33.3%;
    float: left;
    text-align: center;
`;
const Row = styled.div`
    min-width: 100%;
`;

const Label = styled.label`
    display: block;
`;

const Progress = styled.progress`
    width: 60%;
`;

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
        currentTemp = Math.round(currentWeather.main.temp);
    }

    return (
        <CurrentWeatherWrapper>
            <Row>
                <Col>
                    <h3>{currentCity}</h3>
                </Col>
                <Col>
                    <h3>{time}</h3>
                </Col>
                <Col>
                    <h3>{currentTemp}&deg;C</h3>
                </Col>
            </Row>
            <Row>
                <Label htmlFor="file">
                    Reloading in: {60 - progressValue} seconds
                </Label>
                <Progress id="file" value={progressValue} max="60">
                    {progressValue}%
                </Progress>
            </Row>
        </CurrentWeatherWrapper>
    );
};
