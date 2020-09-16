import React, { Component } from "react";
import { CurrentWeatherForecast } from "./components/CurrentWeatherForecast";
import { NextDaysWeatherForecast } from "./components/NextDaysWeatherForecast";

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentWeather: [],
            nextDaysWeather: [],
        };
    }
    componentDidMount() {
        console.log("it mounted");
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=London&appid=1fc71092a81b329e8ce0e1ae88ef0fb7"
        )
            .then((response) => {
                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new TypeError("No JSON data!");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                this.setState({ currentWeather: data });
            })
            .catch((error) => console.error(error));
        fetch(
            "https://api.openweathermap.org/data/2.5/forecast?q=London&appid=1fc71092a81b329e8ce0e1ae88ef0fb7"
        )
            .then((response) => {
                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new TypeError("No JSON data!");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                let requiredData = data.list.slice(0, 5);
                this.setState({ nextDaysWeather: requiredData });
            })
            .catch((error) => console.error(error));
    }
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
