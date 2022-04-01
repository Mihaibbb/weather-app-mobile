import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient} from 'expo-linear-gradient';
import styles from "../Styles/ForecastStyle";
import icons from "../Data/Icons";
import getThemeColor from "../Data/ThemeColor";
import UseFonts from "./Fonts";

export default function Forecast({ dailyData, isDay, setDailyData }) {

    const themeColor = getThemeColor(isDay);
    const [loaded] = UseFonts();

    const clickForecastDay = (dayData) => setDailyData(dayData);

    const dailyComponent = () => {

        return dailyData.map((dayData, idx) => {
            
            const date = new Date(dayData.date).toLocaleDateString('en', {weekday: 'long'});
            const shortDate = date.slice(0, 3);
            
            const dailyStatusText = dayData.day.condition.text;
            const dailyStatus = dailyStatusText.toLowerCase().replaceAll(" ", "_");
            const dailyStatusComponent = icons[dailyStatus];

            return (
                <TouchableOpacity onPress={() => clickForecastDay(dayData)} key={idx} style={styles.pressContainer}>
                    <LinearGradient style={styles.dailyContainer} colors={themeColor}>
                        <View>
                            <Text style={styles.dateDay} >{shortDate}</Text>
                            <Text></Text>
                        </View>

                        <View style={styles.temperature}>
                            <Text style={styles.textTemp}>{Math.round(dayData.day.mintemp_c)}°</Text>
                            <Text style={styles.textTemp}>{Math.round(dayData.day.maxtemp_c)}°</Text>
                        </View>

                        <View style={styles.statusContainer}>
                            {dailyStatusComponent}
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
            );
        });

    }

    if (!loaded) return null;
    
    return (
        <View style={styles.forecast}>
            {dailyComponent()}
        </View>
    );
}
