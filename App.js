import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, Platform, TextInput, Image } from 'react-native';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Styles } from "./Styles/SearchBarStyle";
import icons from './Data/Icons';

// Components
import UseFonts  from './Components/Fonts';
import Header from './Components/Header';
import TemperatureContainer from './Components/TemperatureContainer';
import TemperatureChart from './Components/TemperatureChart';

const App = () => {

  const [currentLocation, setCurrentLocation] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [weatherStatus, setCondition] = useState(null);
  const [coords, setCoords] = useState(null);
  const [autocompleteValue, setAutocompleteValue] = useState('');
  const [changeSearchBar, setChangeSearchBar] = useState("#444");
  const [hourlyTemp, setHourlyTemp] = useState(false);
  const [hourlyWind, setHourlyWind] = useState(false);
  const [todayHoursDateData, setTodayHoursDateData] = useState([]);
  const [todayHoursTempData, setTodayHoursTempData] = useState([]);
  const [todayHoursWindData, setTodayHoursWindData] = useState([]);
  const [isDay, setIsDay] = useState(true);

  const ref = useRef();

  const stylesSearchBar = Styles("#444");

  useEffect(() => {
      ref.current?.setAddressText();
  }, []);
  
  const API_URL = 'http://192.168.1.2:5001';
  const [loaded] = UseFonts();

  const styles = StyleSheet.create({
    main: {
      width: "100%",
      maxWidth: "100%",
      height: Platform.OS === "web" ? "100vh" : "100%",
      backgroundColor: "rgb(10,10,10)",
      flex: 1,
      zIndex: 1
    },  
  });

  const getCoords = async () => {

    try {

      const permission = await Location.requestForegroundPermissionsAsync();
      const location = await Location.getCurrentPositionAsync({});
     
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;

      const data = {
          latitude: latitude,
          longitude: longitude
      }; 

      setCoords(data);
    } catch (e) {
      console.warn(e);
    }

    
  };

  const getTemperature = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify(coords),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const serverReq = await fetch(`${API_URL}/weather`, options);
    const serverRes = await serverReq.json();
    const data = await serverRes.data;
    const temp = await data.current.temp_c;
    const condition = await data.current.condition.text;
    const locationData = await data.location;
    const location = `${await data.location.region}, ${await data.location.country}`;
    const forecasts = await data.forecast.forecastday;
    const is_day = await data.current.is_day;
    console.log(await is_day);

    const currLocalTime = await locationData.localtime.split(" ")[0];
    const currDate = new Date();
    const currentHour = currDate.getHours();
    console.log(currLocalTime);
    let dailyData = [],
        todayHoursDate = [],
        todayHours = [],
        todayHoursTemp = [],
        evenHourStamp,
        todayHoursWind = [];

    console.log(await data);

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
              const hourString = hourTime === 0 ? "12 AM" : hourTime < 12 ? `${hourTime} AM` : `${parseInt(hourTime) - 12} PM`;
              
              if (hourTime === currentHour) {
                  const thisTemp = Math.round(hourData.temp_c);
                  const thisWind = Math.round(hourData.wind_kph);
                  evenHourStamp = currentHour % 2;
                  todayHours.push(hourString);
                  todayHoursTemp.push(thisTemp);
                  todayHoursDate.push(hourData.time);
                  todayHoursWind.push(thisWind);
                  
              } else if (hourTime > currentHour && evenHourStamp === hourTime % 2) {
                  const thisTemp = Math.round(hourData.temp_c);
                  const thisWind = Math.round(hourData.wind_kph);
                  todayHours.push(hourString);
                  todayHoursTemp.push(thisTemp);
                  todayHoursDate.push(hourData.time);
                  todayHoursWind.push(thisWind);
              }                
          }); 
      } else {
          hourlyStatusWeather.forEach(hourData => {
              if (todayHours.length >= 12) return;
              const hourDate = new Date(hourData.time);
              const hourTime = hourDate.getHours();  
              const hourString = hourTime === 0 ? "12 AM" : hourTime === 12 ? "12 PM" : hourTime < 12 ? `${hourTime} AM` : `${parseInt(hourTime) - 12} PM`;
              
              if (hourTime % 2 === evenHourStamp) {
                  const thisTemp = Math.round(hourData.temp_c);
                  const thisWind = Math.round(hourData.wind_kph);
                  todayHours.push(hourString);
                  todayHoursTemp.push(thisTemp);
                  todayHoursDate.push(hourData.time);
                  todayHoursWind.push(thisWind);
              }
          });
      }
    });
    
    setTodayHoursDateData(todayHours);
    setTodayHoursTempData(todayHoursTemp)
    setTodayHoursWindData(todayHoursWind);
    setTemperature(temp);
    setCondition(condition);
    setCurrentLocation(location);
    setIsDay(is_day);

  };

  const getWeatherData = async (coords) => {
    const latitude = coords.lat;
    const longitude = coords.lng;
    const coordsData = {
        latitude: latitude,
        longitude: longitude
    };
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(coordsData)
    }

    const responseJSON = await fetch(`${API_URL}/weather`, options);
    const response = await responseJSON.json();
    const data = await response.data;
    console.log(data);
    const temperature = await data.current.temp_c;
    const status = await data.current.condition.text;
    setTemperature(await temperature);
    setCondition(await status);
  };


  const getLocation = (e) => {
    
  };

  // Effects
  useEffect(() => {
    if (coords === null) return;
    getTemperature();
  }, [coords]);

  
  useEffect(() => {
    (async () => {
      await getCoords();
    })();
  }, []);


  if (!loaded) return null;

  return (
    <ScrollView style={styles.main} keyboardShouldPersistTaps="always">
      
      <View style={stylesSearchBar.searchBarContainer}>
        <GooglePlacesAutocomplete
            ref={ref}
            placeholder='Search'
            
            fetchDetails={true}
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data.description, details.geometry.location);
                setCurrentLocation(data.description);
                getWeatherData(details.geometry.location);
                setAutocompleteValue('');

            }}
            query={{
                key: 'AIzaSyCffhtcZzCpacqM1uAQeL00rHMo0A8ieB0',
                language: 'en',
            }}

            requestUrl={{
                useOnPlatform: 'web', // or "all"
                url:
                  'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api', // or any proxy server that hits https://maps.googleapis.com/maps/api
                headers: {
                  Authorization: `an auth token`, // if required for your proxy
                },
            }}

            textInputProps={{
                onChangeText: (text) => { 
                  setAutocompleteValue(text);
                },
                value: autocompleteValue,
                placeholderTextColor: "rgb(63,70,86)"
            }}

            styles={{
                container: {
                    
                    width: "100%",
                    maxWidth: 400
                },

                textInputContainer: {
                    
                    width: "108%",
                },
                textInput: {
                    height: 50,
                    color: changeSearchBar,
                    fontSize: 20,
                    backgroundColor: 'transparent',
                    width: "108%",
                    borderRadius: 32,
                    borderColor: 'rgb(42,46,51)',
                    borderWidth: 1,
                    color: 'rgb(63,70,86)'
                },
                predefinedPlacesDescription: {
                    color: '#fff',
                    backgroundColor: "#111"
                },

                listView: {
                    width: "108%",
                    
                },

                row: {
                    backgroundColor: "#111",
                    
                },

                description: {
                    color: "rgba(255, 255, 255, .9)",
                },

                poweredContainer: {
                    transform: [{ scale: 0 }]
                }
            }}
            
        />
        <View onClick={(e) => getLocation(e)} style={[stylesSearchBar.searchIconContainer, {transform: [{ translateX: -15}, { translateY: 10 }]}]}>
            <Icon name="search" size={27} color="rgb(206,209,213)" style={stylesSearchBar.searchIcon} /> 
        </View>
      </View>
      { currentLocation && (<Header location={currentLocation} />) }
      {temperature && weatherStatus && (<TemperatureContainer temp={Math.round(temperature)} cond={weatherStatus} is_day={isDay}/>)}
      {currentLocation && weatherStatus && (<TemperatureChart temp={todayHoursTempData} labels={todayHoursDateData} />)}
    </ScrollView>
  );
}

export default App;




