import { useEffect, useState } from "react";
import Search from "../search";
import axios from "axios";



export default function Weather() {

    const [search, setSearch] = useState('')
    const [weatherData, setWeatherData] = useState(null)
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null)


    const fetchWeatherData = async (city) => {

        // try {
        //     setLoading(true);

        //     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}
        //                                   &appid=d5229491108edfe97ce3a1e5eb8205b4&units=metric`)

        //     const data = await response.json();

        //     console.log(data);  // for checking the output in console

        //     if (data) {
        //         setWeatherData(data);
        //         setLoading(false);
        //     }
        // }
        // catch (e) {
        //     setErrorMsg(e.message);
        //     setLoading(false);
        // }

        setLoading(true);

        await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}
                        &appid=d5229491108edfe97ce3a1e5eb8205b4&units=metric`)
                   .then((response) => {
                         setWeatherData(response.data);
                         setLoading(false);
                         setSearch('');
                        })
                    .catch((e) => {
                        setErrorMsg(e.message);
                        setLoading(false);
                    })    
    }


    const handleSearch = async () => {

        fetchWeatherData(search)
    }


    useEffect(() => {
        fetchWeatherData('Delhi')      // default value
    }, [])


    const getCurrentDate = () => {

        return new Date().toLocaleDateString("en-us", {
            weekday: "long",
            month: "long",
            day: 'numeric',
            year: 'numeric',
        })
    }

    if (loading) {
        return (
            <div>
                Loading! Please wait
            </div>
        )
    }

    if (errorMsg !== null) {
        return (
            <div>
                Error Occured {errorMsg}
            </div>

        )
    }

console.log(weatherData);

    return (
        <div>
            <Search
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch} />

            {
                weatherData
                    ? <div>

                        <div className='city-name'>
                            <h2>{weatherData.name}, <span>{weatherData.sys.country}</span></h2>
                        </div>

                        <div className='date'>
                            <span>{getCurrentDate()}</span>
                        </div>

                        <div className="temp">
                            {weatherData.main.temp} °C
                        </div>

                        <p className='description'>{weatherData.weather[0].description}</p>

                        <div className="weather-info">
                            <div className='column'>
                                <div>
                                    <p>{weatherData.wind.speed}</p>
                                    <p>Speed</p>
                                </div>
                            </div>

                            <div className='column'>
                                <div>
                                    <p>{weatherData.main.humidity}%</p>
                                    <p>Humidity</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    : null
            }
        </div>
    )
}