import React, { Component } from "react";
import { CurrentWeatherForecast } from "./components/CurrentWeatherForecast";
import { NextDaysWeatherForecast } from "./components/NextDaysWeatherForecast";

export class App extends Component {
    render() {
        return (
            <div>
                <CurrentWeatherForecast />
                <NextDaysWeatherForecast />
            </div>
        );
    }
}

export default App;
