import React, { Component } from "react";
import { CurrentWeatherForecast } from "./components/CurrentWeatherForecast";
import { NextDaysWeatherForecast } from "./components/NextDaysWeatherForecast";
import styled from "styled-components";

const Wrapper = styled.div`
    display: block;
`;

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentWeather: {},
            nextDaysWeather: [],
            step: true,
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        const { step } = this.state;
        var currentWeather;
        var nextDaysWeather;

        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=1fc71092a81b329e8ce0e1ae88ef0fb7"
        )
            .then((response) => {
                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new TypeError("No JSON data!");
                }
                return response.json();
            })
            .then((data) => {
                currentWeather = data;
            })
            .catch((error) => console.error(error));
        fetch(
            "https://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&appid=1fc71092a81b329e8ce0e1ae88ef0fb7"
        )
            .then((response) => {
                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new TypeError("No JSON data!");
                }
                return response.json();
            })
            .then((data) => {
                nextDaysWeather = data.list;
            })
            .catch((error) => console.error(error));

        let f = setTimeout(() => {
            this.setState({
                currentWeather: currentWeather,
                nextDaysWeather: nextDaysWeather,
            });
        }, 1000);
    };

    handleRefresh = () => {
        this.fetchData();
    };

    render() {
        const { currentWeather, nextDaysWeather } = this.state;
        return (
            <Wrapper>
                <CurrentWeatherForecast
                    currentWeather={currentWeather}
                    handleRefresh={this.handleRefresh}
                />
                <NextDaysWeatherForecast nextDaysWeather={nextDaysWeather} />
            </Wrapper>
        );
    }
}

export default App;
