import React from "react";
import { FlatList, View, Image, Dimensions, Text } from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import IconFeather from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from "../Styles/WeatherDetailsStyle";
import getThemeColor from "../Data/ThemeColor";
import UseFonts from "./Fonts";

export default function WeatherDetails({ isDay, precip, wind, windDir, windDeg, feelsTemp, humidity, visibility, sunrise, sunset, uv, airQuality, co2 }) {

    const WIDTH = Dimensions.get("window").width;
    const themeColor = getThemeColor(isDay);
    const [loaded] = UseFonts();

    const airQualityValue = Math.max(airQuality * 10, co2) / 10;
    console.log(airQualityValue);

    const data = [
        {
            component: 
            <View style={styles.component}>
                <View style={styles.titleContainer}>
                    <Icon name="umbrella" color="rgba(255, 255, 255, .7)" size={20}/>
                    <Text style={styles.title}>Precipitation</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.contentText}>{Math.round(precip)} mm</Text>
                    <Text style={styles.contentTextUnit}>in last 24h</Text>
                </View>
            </View>
        },

        {
            component: 
            <View style={styles.component}>
                <View style={styles.titleContainer}>
                    <IconFeather name="wind" color="rgba(255, 255, 255, .7)" size={20} />
                    <Text style={styles.title}>Wind</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.contentText}>{Math.round(wind)}</Text>
                    <Text style={styles.contentTextUnit}>km/h</Text>
                </View>
            </View>
        },

        {
            component: 
            <View style={styles.component}>
                <View style={styles.titleContainer}>
                    <IconFeather name="sun" color="rgba(255, 255, 255, .7)" size={20} />
                    <Text style={styles.title}>Sunrise</Text>
                </View>
            </View>
        },

        {
            component: 
            <View style={styles.component}>
                <View style={styles.titleContainer}>
                    <MaterialIcon name="sunglasses" color="rgba(255, 255, 255, .7)" size={20} />
                    <Text style={styles.title}>UV</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.contentText}>{uv}</Text>
                    <Text style={styles.contentTextUnit}>
                        {uv > 0 && uv < 3 ? "Low" : uv >= 3 && uv < 5 ? "Medium" : uv >= 5 && uv <= 10 ? "High" : uv > 10 ? "Extremely high" : "Undefined"}
                    </Text>
                </View>
            </View>
        },

        {
            component: 
            <View style={styles.component}>
                <View style={styles.titleContainer}>
                    <Icon name="thermometer-half" color="rgba(255, 255, 255, .7)" size={20} />
                    <Text style={styles.title}>Feels Like</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.contentText}>{Math.round(feelsTemp)}°</Text>
                    <Text style={styles.contentTextUnit}>
                        {
                            feelsTemp < 0 ? "Extremely Cold" : 
                            feelsTemp >= 0 && feelsTemp < 5 ? "Very Cold" :
                            feelsTemp >= 5 && feelsTemp < 15 ? "Cold" : 
                            feelsTemp >= 15 && feelsTemp < 20 ? "Moderate" :
                            feelsTemp >= 20 && feelsTemp < 25 ? "Warm" :
                            feelsTemp >= 25 && feelsTemp < 35 ? "Hot" :
                            feelsTemp > 35 ? "Extremely hot" : "Not defined"
                        }
                    </Text>
                </View>
            </View>
        },

        {
            component: 
            <View style={styles.component}>
                <View style={styles.titleContainer}>
                    <Icon name="leaf" color="rgba(255, 255, 255, .7)" size={20} />
                    <Text style={styles.title}>Air Quality</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.contentText}>{
                        airQualityValue > 0 && airQualityValue < 50 ? "Fresh Air" :
                        airQualityValue >= 50 && airQualityValue < 100 ? "Good Air" :
                        airQualityValue >= 100 && airQualityValue < 250 ? "Moderate Air" :
                        airQualityValue >= 250 && airQualityValue < 350 ? "Poor Air" :
                        airQualityValue >= 350 && airQualityValue < 500 ? "Very Poor Air" :
                        "Severe Air"
                    }</Text>
                    <Text style={styles.contentTextUnit}>{Math.round(airQuality)} µg/m3</Text>
                </View>
            </View>
        },

        {
            component: 
            <View style={styles.component}>
                <View style={styles.titleContainer}>
                    <MaterialIcon name="waves" color="rgba(255, 255, 255, .7)" size={20} />
                    <Text style={styles.title}>Humidity</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.contentText}>{humidity}%</Text>
                    <Text style={styles.contentTextUnit}></Text>
                </View>
            </View>
        },

        {
            component: 
            <View style={styles.component}>
                <View style={styles.titleContainer}>
                    <IconFeather name="eye" color="rgba(255, 255, 255, .7)" size={20} />
                    <Text style={styles.title}>Visibility</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.contentText}>{visibility}</Text>
                    <Text style={styles.contentTextUnit}>km</Text>
                </View>
            </View>
        }

        
    ];

    const renderItem = ({item, idx}) => {
        return (
            <LinearGradient style={styles.itemContainer} colors={["#194f8a", "#4780bf"]}>
                {item.component}
            </LinearGradient>
        );
    };

    return (
        <View style={styles.body}>
            <View style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, idx) => idx.toString()}
                    numColumns={2}
                >
                </FlatList>
            </View>

        </View>
    );
}