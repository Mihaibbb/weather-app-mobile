import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import UseFonts  from './Fonts';
import { Styles } from "../Styles/SearchBarStyle";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const API_URL = 'http://192.168.1.2:5001';


export default function SearchBar() {

    const [loaded] = UseFonts();
    const [location, setLocation] = useState(false);
    const [weatherData, setWeatherData] = useState(false);
    const [searchBarValue, setSearchBarValue] = useState("Type in your location...");
    const [changeSearchBar, setChangeSearchBar] = useState("#444");

    const ref = useRef();

    useEffect(() => {
        ref.current?.setAddressText();
    }, []);

    const styles = Styles(changeSearchBar);

    const changeValueSearchBar = (ev) => {
        setSearchBarValue(ev.value);
        if (ev.value === "") setChangeSearchBar("#444");
    };
    
    const changeValueByFocus = (ev) => {
        if (searchBarValue === "Type in your location...") setSearchBarValue("");
        setChangeSearchBar("rgb(128,99,236)")
    };
    
    const changeValueByBlur = (ev) => {
        setChangeSearchBar("#444");
        setSearchBarValue("Type in your location...");
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
        setWeatherData(data);
    };

    if (!loaded) return null;

    const component = (
    <View style={styles.searchBarContainer}>
        <GooglePlacesAutocomplete
            ref={ref}
            placeholder='Search'
            fetchDetails={true}
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data.description, details.geometry.location);
                setLocation(data.description);
                getWeatherData(details.geometry.location);
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
                    backgroundColor: 'rgb(20, 20, 20)',
                    width: "108%",
                    borderRadius: 32,
                },
                predefinedPlacesDescription: {
                    color: '#1faadb',
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
        <View style={[styles.searchIconContainer, {transform: [{ translateX: -15}, { translateY: 10 }]}]}>
            <Icon name="search" size={27} color="#fff" style={styles.searchIcon} />
            
        </View>
    </View>);

    return {
        component: component,
        data: weatherData,
        location: location
    };
};

