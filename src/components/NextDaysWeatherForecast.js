import React from "react";
import styled from "styled-components";
import { Col } from "./CurrentWeatherForecast";

const NextDaysWrapper = styled.div`
    width: 90%;
    margin-left: 5%;
    margin-top: 5%;
    overflow: hidden;
`;
const ListWrapper = styled.div`
    transition: all 0.5s;
    overflow: hidden;
    border: 1px solid #fff;
    border-radius: 10px;
    margin: 1%;
    background: #0b468c;
    &:hover {
        opacity: 0.7;
    }
`;
const Span = styled.span``;
const Image = styled.img`
    display: inline-block;
`;
const ColSpan2 = styled.div`
    width: 100%;
    overflow: hidden;
    text-align: center;
    @media (min-width: 780px) {
        width: 100%;
    }
    @media (min-width: 1000px) {
        width: 50%;
    }
`;
export const NextDaysWeatherForecast = (props) => {
    const { nextDaysWeather } = props;
    let auxIndex = 0;
    let icon;
    let d = new Date();
    let n = d.getDay();
    let daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    return (
        <NextDaysWrapper>
            {nextDaysWeather.map((days, index) => {
                if (auxIndex < nextDaysWeather.length) {
                    let requiredDay = nextDaysWeather[auxIndex];
                    auxIndex = auxIndex + 8;
                    icon = requiredDay.weather[0].icon;
                    let iconAPI = `http://openweathermap.org/img/wn/${icon}.png​`;
                    iconAPI = iconAPI.replace(/\u200B/g, "");
                    n = n + 1;
                    if (n === 7) {
                        n = 0;
                    }
                    return (
                        <ListWrapper key={index}>
                            <Col>
                                <Span>{daysOfWeek[n]}</Span>
                            </Col>
                            <Col>
                                <Span>
                                    {Math.round(requiredDay.main.temp)}&deg;C
                                </Span>
                            </Col>
                            <Col>
                                <ColSpan2>
                                    <Span>
                                        {requiredDay.weather[0].description}
                                    </Span>
                                </ColSpan2>
                                <ColSpan2>
                                    <Image src={iconAPI}></Image>
                                </ColSpan2>
                            </Col>
                        </ListWrapper>
                    );
                }
            })}
        </NextDaysWrapper>
    );
};
