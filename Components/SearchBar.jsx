import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import UseFonts  from './Fonts';
import { Styles } from "../Styles/SearchBarStyle";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


export default function SearchBar({callback}) {

    const [loaded] = UseFonts();
    const [location, setLocation] = useState(false);
    const [weatherData, setWeatherData] = useState(false);
    const [searchBarValue, setSearchBarValue] = useState("Type in your location...");
    const [autocompleteValue, setAutocompleteValue] = useState('');
    const [changeSearchBar, setChangeSearchBar] = useState("#444");

    const ref = useRef();

    useEffect(() => {
        ref.current?.setAddressText();
    }, []);

    const styles = Styles(changeSearchBar);

    if (!loaded) return null;

    const handlePress = (data, details) => {
        console.warn('here');
        callback(data, details);
        setAutocompleteValue('');
    };

    return (
        <View style={styles.searchBarContainer}>
        <GooglePlacesAutocomplete
            ref={ref}
            placeholder='Search'
            
            fetchDetails={true}
            onPress={(data, details = null) => {
                console.warn('here');
                return handlePress(data, details)
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
                  console.warn('ok');
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
        <View onClick={(e) => getLocation(e)} style={[styles.searchIconContainer, {transform: [{ translateX: -15}, { translateY: 10 }]}]}>
            <Icon name="search" size={27} color="rgb(206,209,213)" style={styles.searchIcon} /> 
        </View>
      </View>
    );
};

