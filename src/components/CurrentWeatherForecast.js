import React, { useEffect, useState } from "react";
import styled from "styled-components";
const CurrentWeatherWrapper = styled.div`
    display: inline-block;
    min-width: 100%;
    text-align: center;
`;

export const Col = styled.div`
    width: 100%;
    overflow: hidden;
    text-align: center;
    margin: 1%;
    -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
    -moz-animation: fadein 2s; /* Firefox < 16 */
    -ms-animation: fadein 2s; /* Internet Explorer */
    -o-animation: fadein 2s; /* Opera < 12.1 */
    animation: fadein 2s;
    @keyframes fadein {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @-moz-keyframes fadein {
        /* Firefox */
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @-webkit-keyframes fadein {
        /* Safari and Chrome */
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @-o-keyframes fadein {
        /* Opera */
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @media (min-width: 780px) {
        width: 100%;
        margin: 0 0 0 0;
    }
    @media (min-width: 1000px) {
        width: 33.3%;
        float: left;
        margin-top: 1%;
    }
`;
const Row = styled.div`
    min-width: 100%;
    overflow: hidden;
`;

const Label = styled.label`
    display: block;
`;

const Progress = styled.div`
    width: 60%;
    margin-left: 20%;
    height: 30px;
    background: white;
    border-radius: 20px;
    border: 1px solid #fff;
    margin-top: 1%;
    animation: ${(props) => props.pulse};
    animation-iteration-count: infinite;
    @keyframes pulse {
        0% {
            background-color: #001f3f;
        }
        100% {
            background-color: #ff4136;
        }
    }
`;

const Level = styled.span`
    height: 30px;
    display: block;
    border-radius: 20px;
    transition: all 1s ease-in;
    background-color: ${(props) => props.changeColor};
`;

export const CurrentWeatherForecast = (props) => {
    const { currentWeather } = props;
    const [progressValue, setValue] = useState(0);
    const [progressBarValue, setProgressBarValue] = useState(3.2);
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

    useEffect(() => {
        const interval = setInterval(() => {
            props.handleRefresh();
        }, 60000);
        const updateProgressBar = setInterval(() => {
            setValue((progressValue) =>
                progressValue < 60 ? progressValue + 1 : (progressValue = 0)
            );
            setProgressBarValue((progressBarValue) =>
                progressBarValue < 100
                    ? (progressBarValue += 1.6)
                    : (progressBarValue = 0)
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
            {Object.keys(currentWeather).length !== 0 &&
            currentWeather.constructor === Object ? (
                <React.Fragment>
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
                        <Progress
                            pulse={
                                progressValue > 7 ? "pulse 2s infinite" : null
                            }
                        >
                            <Level
                                changeColor={
                                    progressValue > 5
                                        ? "rgb(3, 255, 41)"
                                        : "rgb(255, 3, 108)"
                                }
                                style={{
                                    width: progressBarValue + "%",
                                }}
                            ></Level>
                        </Progress>
                    </Row>
                </React.Fragment>
            ) : null}
        </CurrentWeatherWrapper>
    );
};
