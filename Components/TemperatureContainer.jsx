import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from "../Styles/TemperatureContainerStyle";
import icons from "../Data/Icons";
import getThemeColor from "../Data/ThemeColor";

export default function TemperatureContainer({ temp, cond, isDay }) {

    const [status, setStatus] = useState(null);
    const themeColor = getThemeColor(isDay);

    const getIcons = () => {
        const currCondition = `${cond.toLowerCase().replaceAll(' ', '_')}${!isDay ? "_night" : ""}`;
        
        const condition = icons[currCondition];
        console.warn(icons);
        setStatus(condition);
    };
    
    const getTemp = () => {
        const temperature = `${temp}°`;
        const keywords = temperature.split("");
        
        let texts = [];

        keywords.forEach((keyword, idx) => {
            texts.push(
                <Text style={styles.temperature} key={idx}>{keyword}</Text>
            );
        });

        return texts;
    };

    useEffect(() => {
        getIcons();
    }, [temp, cond, isDay]);

    return (
    <View style={styles.temperatureContainer}>
        <LinearGradient colors={themeColor} style={styles.background}>
            <Text style={styles.condition}>{cond}</Text>
            <View style={styles.temperatureValue}>
                {getTemp()}
            </View>
            <View style={styles.statusContainer}>
                {status && status}
            </View>
            
        </LinearGradient>
    </View>
    );
};