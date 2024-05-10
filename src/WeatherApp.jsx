import React from 'react'

function WeatherApp(){
    const [weatherData,setWeatherData] = React.useState({
        temperature :'',
        humidity:'',
        windspeed:'',
        description:'',
        coordinates:'',
        location_name:'',

    })
    
    const fetchWeatherData = async (cityname)=>{
        const API_KEY = 'fec996f68996c5608b25dc6d1174bd8f'
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_KEY}&units=metric`;
        const response = await fetch(API_URL)
        const data = await response.json()
        // console.log(data)
        setWeatherData({
            temperature:data.main.temp,
            humidity:data.main.humidity,
            windspeed:data.wind.speed,
            description:data.weather[0].description,
            coordinates:[data.coord.lon,data.coord.lat],
            location_name:data.name,
        })
    }
    const handleSubmit = (event)=>{
        event.preventDefault()
        const cityname = event.target.elements.cityname.value;
        fetchWeatherData(cityname)
        let time = document.getElementById('time')
        time.innerText = new Date().toLocaleTimeString()
    }

    return(
        <div className="weather-app">
            <div className="header">
                <h1>Weather App</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <label htmlfor="cityname">Enter City:</label>
                    <input type="text" name="cityname" id="cityname" required/>
                    <button type="submit" id="search">Search</button>
                </form>
            </div>
            <div className="weather-info">
                <div className="left-container">
                    <img src='https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png' alt="..."/>
                        <p className="temp">{weatherData.temperature}</p>
                    <div className="details">
                        <h3>{weatherData.location_name}</h3>
                        <p><strong>Humiduty:</strong>{weatherData.humidity}</p>
                        <p><strong>WindSpeed</strong>{weatherData.windspeed}</p>
                    </div>
                </div>
                <div className="right-container">
                    <h2>Weather</h2>
                    <p className="time">As of Now:<span id='time'></span></p>
                    <p><strong>Description:</strong>{weatherData.description}</p>
                    <p><strong>Co-Ordinates:</strong><span>Lon:{weatherData.coordinates[0]}, Lat:{weatherData.coordinates[1]}</span></p>
                </div>



            </div>
        </div>
    )
}
export default WeatherApp