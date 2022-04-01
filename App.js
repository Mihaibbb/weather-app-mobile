import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, Platform, TextInput, Image } from 'react-native';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import icons from './Data/Icons';

// Components
import UseFonts  from './Components/Fonts';
import Header from './Components/Header';
import SearchBar from './Components/SearchBar';
import TemperatureContainer from './Components/TemperatureContainer';
import TemperatureGestureChart from './Components/TemperatureGestureChart';
import TemperatureLineChart from './Components/TemperatureChart';
import Forecast from './Components/Forecast';
import TemperatureButtons from './Components/TemperatureButttons';
import TemperatureBarChart from './Components/TemperatureBarChart';
import WeatherDetails from './Components/WeatherDetails';
import getThemeColor from './Data/ThemeColor';

const App = () => {

  const [currentLocation, setCurrentLocation] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [weatherStatus, setCondition] = useState(null);
  const [coords, setCoords] = useState(null);
  const [changeSearchBar, setChangeSearchBar] = useState("#444");
  const [hourlyTemp, setHourlyTemp] = useState(false);
  const [hourlyWind, setHourlyWind] = useState(false);
  const [todayHoursFullyDate, setTodayHoursFullyDate] = useState([]);
  const [todayHoursDateData, setTodayHoursDateData] = useState([]);
  const [todayHoursFullyTempData, setTodayHoursFullyTempData] = useState([]);
  const [todayHoursIcon, setTodayHoursIcon] = useState([]);
  const [todayHoursTempData, setTodayHoursTempData] = useState([]);
  const [todayHoursWindData, setTodayHoursWindData] = useState([]);
  const [todayHoursWindDeg, setTodayHoursWindDeg] = useState([]);
  const [todayWind, setTodayWind] = useState(null);
  const [todayWindDeg, setTodayWindDeg] = useState(null);
  const [todayWindDir, setTodayWindDir] = useState(null);
  const [todayPrecip, setTodayPrecip] = useState(null);
  const [todayTempFeels, setTodayTempFeels] = useState(null);
  const [todaySunrise, setTodaySunrise] = useState(null);
  const [todaySunset, setTodaySunset] = useState(null);
  const [todayUV, setTodayUV] = useState(null);
  const [todayHumidity, setTodayHumidity] = useState(null);
  const [todayVisibility, setTodayVisibility] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [airQualityCO2, setAirQualityCO2] = useState(null);
  const [isDay, setIsDay] = useState(true);
  const [dailyData, setDailyData] = useState(null);
  const [forecastTempGesture, setForecastTempGesture] = useState(true);
  const [forecastTempBar, setForecastTempBar] = useState(null);
  const [forecastTempLine, setForecastTempLine] = useState(null);
  
  const API_URL = 'http://192.168.1.6:5001';
  const [loaded] = UseFonts();

  const styles = StyleSheet.create({
    main: {
      width: "100%",
      maxWidth: "100%",
      height: Platform.OS === "web" ? "100vh" : "100%",
      backgroundColor: "rgb(14,14,14)",
      flex: 1,
      zIndex: 1
    },  
  });

  const geoSuccess = (location) => {
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;

    const coords = {
        latitude: latitude,
        longitude: longitude
    }; 
    console.warn('access of location'); 
    getTemperature(coords, true);
  };

  const geoFailure = (err) => {
    console.err(err);
  }

  const getCoords = () => {

    const geoOptions = {
      enableHighAccuracy: true,
      timeOut: 5,
      maximumAge: 60 *  24
    };
    
    Location.installWebGeolocationPolyfill();
    navigator.geolocation.getCurrentPosition(geoSuccess, geoFailure, geoOptions);
  };

  const getTemperature = async (coords, effect=false) => {
    
    const options = {
      method: "POST",
      body: JSON.stringify(coords),
      headers: {
        'Content-Type': 'application/json',
      }
    };

    // Gettin data

    const serverReq = await fetch(`${API_URL}/weather`, options);
    const serverRes = await serverReq.json();
    const data = await serverRes.data;
    const temp = await data.current.temp_c;
    const condition = await data.current.condition.text;
    const locationData = await data.location;
    const location = `${await data.location.region}, ${await data.location.country}`;
    const forecasts = await data.forecast.forecastday;
    const is_day = await data.current.is_day;
    const currentWind = await data.current.wind_kph;
    const currentWindDeg = await data.currentwind_degree;
    const currentWindDir = await data.current.wind_dir;
    const tempFeelsLike = await data.current.feelslike_c;
    const humidity = await data.current.humidity;
    const visibility = await data.current.vis_km;
    const UV = await data.current.uv;
    const precip = await data.current.precip_mm;
    const airQualityData = await data.current.air_quality["pm10"];
    const airQualityCO2Data = await data.current.air_quality["co"];
    const currLocalTime = await locationData.localtime.split(" ")[0];
    const currDate = new Date();
    const currentHour = currDate.getHours();
    const minHour = currentHour - 2;
    
    let dailyData = [],
        todayHoursDate = [],
        todayHours = [],
        todayHoursTemp = [],
        evenHourStamp,
        todayHoursWind = [],
        todayFullyHoursTemp = [],
        todayFullyHoursDate = [],
        todayFullyHoursIcon = [],
        todayHoursWindDeg = []; 

    forecasts.forEach(day => {
      const dayData = day;
      dailyData.push(dayData);
    });

    dailyData.forEach(day => {
      const dailyMinTemp = day.day.mintemp_c;
      const dailyMaxTemp = day.day.maxtemp_c;
      const dailyCondition = day.day.condition;
      const dailyIcon = dailyCondition.icon;
      const dailyText = dailyCondition.text;
      const dailyPrecip = day.day.totalprecip_mm;
      const hourlyStatusWeather = day.hour;
      const hourlyWindSpeed = day.wind_kph;
      let dailyTextKeyword = dailyText.toLowerCase().replaceAll(" ", "_"); 
      const dailyStatus = icons[dailyTextKeyword];
    
      if (day.date === currLocalTime) {
          hourlyStatusWeather.forEach(hourData => {
              
              const hourDate = new Date(hourData.time);
              const hourTime = hourDate.getHours();
              const hour = hourTime < 10 ? `0${hourTime}` : hourTime.toString();
              const hourString = hourTime === 0 ? "12 AM": hourTime === 12 ? "12 PM" : hourTime < 12 ? `${hourTime} AM` : `${parseInt(hourTime) - 12} PM`;
              const condition = hourData.condition.text.toLowerCase().replaceAll(" ", "_");
             
              if (hourTime === minHour) {
                  const thisTemp = Math.round(hourData.temp_c);
                  const thisWind = Math.round(hourData.wind_kph);
                  evenHourStamp = currentHour % 2;
                  todayHours.push(hourString);
                  todayHoursTemp.push(thisTemp);
                  todayHoursDate.push(hourData.time);
                  todayHoursWind.push(thisWind);
                  todayHoursWindDeg.push(hourData.wind_degree);
                  
              } else if (hourTime > minHour) {
                  if (hourTime >= currentHour) {
                    todayFullyHoursTemp.push(Math.round(hourData.temp_c));
                    todayFullyHoursDate.push(hour);
                    todayFullyHoursIcon.push(condition);
                  }
                  
                  if (evenHourStamp !== hourTime % 2) return;
                  const thisTemp = Math.round(hourData.temp_c);
                  const thisWind = Math.round(hourData.wind_kph);
                  todayHours.push(hourString);
                  todayHoursTemp.push(thisTemp);
                  todayHoursDate.push(hourData.time);
                  todayHoursWind.push(thisWind);
                  todayHoursWindDeg.push(hourData.wind_degree);
              }              
          }); 

         setTodaySunrise(day.astro.sunrise);
         setTodaySunset(day.astro.sunset);
      } else {
          hourlyStatusWeather.forEach(hourData => {

              const hourDate = new Date(hourData.time);
              const hourTime = hourDate.getHours();  
              const hour = hourTime < 10 ? `0${hourTime}` : hourTime.toString();
              const condition = hourData.condition.text.toLowerCase().replaceAll(" ", "_");
              
              if (todayFullyHoursTemp.length < 24) {
                todayFullyHoursTemp.push(Math.round(hourData.temp_c));
                todayFullyHoursDate.push(hour);
                todayFullyHoursIcon.push(condition);
              }

              if (todayHours.length > 14) return;
              const hourString = hourTime === 0 ? "12 AM" : hourTime === 12 ? "12 PM" : hourTime < 12 ? `${hourTime} AM` : `${parseInt(hourTime) - 12} PM`;
              
              if (hourTime % 2 === evenHourStamp) {
                  const thisTemp = Math.round(hourData.temp_c);
                  const thisWind = Math.round(hourData.wind_kph);
                  todayHours.push(hourString);
                  todayHoursTemp.push(thisTemp);
                  todayHoursDate.push(hourData.time);
                  todayHoursWind.push(thisWind);
                  todayHoursWindDeg.push(hourData.wind_degree);
              }
          });
      }
    });

    // forecast component data
    setTodayHoursDateData(todayHours);
    setTodayHoursTempData(todayHoursTemp)
    setTodayHoursWindData(todayHoursWind);
    setTodayHoursWindDeg(todayHoursWindDeg);
    setTemperature(temp);
    setCondition(condition);
    setCurrentLocation(location);
    setIsDay(is_day);
    setDailyData(await forecasts);
    setTodayHoursFullyTempData(todayFullyHoursTemp);
    setTodayHoursFullyDate(todayFullyHoursDate);
    setTodayHoursIcon(todayFullyHoursIcon)

    // Set details
    setTodayPrecip(precip);
    setTodayWind(currentWind);
    setTodayWindDeg(currentWindDeg);
    setTodayWindDir(currentWindDir);
    setTodayTempFeels(tempFeelsLike);
    setTodayHumidity(humidity);
    setTodayVisibility(visibility);
    setTodayUV(UV);
    setAirQuality(airQualityData);
    setAirQualityCO2(airQualityCO2Data);
  };

  // Effects

  useEffect(() => getCoords(), []);

  const handleSearchLocation = (data, details) => {
    console.warn("Handle location");
    setCurrentLocation(data.description);
    const coords = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng
    };

    getTemperature(coords);
  };

  const handleDailyData = (forecastData) => {
    const hoursData = forecastData.hour;
    let hoursTemp = [], hoursWind = [], hoursFullyDate = [], hoursFullyTemp = [];

    hoursData.forEach((hour, idx) => {
      const hourTime = new Date(hour.time).getHours();
      hoursFullyTemp.push(Math.round(hour.temp_c));
      hoursFullyDate.push(hourTime < 10 ? `0${hourTime}` : hourTime);
      console.warn(hour);
      if (idx % 2 !== 0) return;
      hoursTemp.push(Math.round(hour.temp_c));
      hoursWind.push(hour.wind_kph);
    });

    setTodayHoursTempData(hoursTemp);
    setTodayHoursWindData(hoursWind);
    setTodayHoursFullyTempData(hoursFullyTemp);
    setTodayHoursFullyDate(hoursFullyDate);
  };

  const handleForecast = (buttonsArr) => {
    setForecastTempGesture(buttonsArr[0]);
    setForecastTempBar(buttonsArr[1]);
    setForecastTempLine(buttonsArr[2]);
  }

  if (!loaded) return null;

  return temperature && weatherStatus && currentLocation && dailyData && (
    <ScrollView style={styles.main} keyboardShouldPersistTaps="always">
      <SearchBar callback={handleSearchLocation} />
      <Header location={currentLocation} />
      <TemperatureContainer temp={Math.round(temperature)} cond={weatherStatus} isDay={isDay}/>
      <Forecast dailyData={dailyData} isDay={isDay} setDailyData={handleDailyData}/>
      <TemperatureButtons callback={handleForecast} isDay={isDay}/>
      {forecastTempGesture && <TemperatureGestureChart data={todayHoursFullyTempData} date={todayHoursFullyDate} icon={todayHoursIcon} isDay={isDay} />}
      {forecastTempBar && <TemperatureBarChart isDay={isDay} data={todayHoursTempData} labels={todayHoursDateData} unit='°' color={getThemeColor(isDay)} percent={10}/>}
      {forecastTempLine && <TemperatureLineChart temp={todayHoursTempData} labels={todayHoursDateData} isDay={isDay} />}
      {todayHoursWindData && <TemperatureBarChart data={todayHoursWindData} deg={todayHoursWindDeg} labels={todayHoursDateData} unit=' km' color={["#194f8a", "#4780bf"]} percent={7.5}/>}
      <WeatherDetails 
        isDay={isDay}  
        precip={todayPrecip}
        wind={todayWind}
        windDir={todayWindDir}
        windDeg={todayWindDeg}
        feelsTemp={todayTempFeels}
        humidity={todayHumidity}
        visibility={todayVisibility}
        sunrise={todaySunrise}
        sunset={todaySunset}
        uv={todayUV}
        airQuality={airQuality}
        co2={airQualityCO2}
      />
    </ScrollView>
  );
}

export default App;