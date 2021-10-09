import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from "../Styles/TemperatureContainerStyle";

import icons from "../Data/Icons";



export default function TemperatureContainer({ temp, cond, isDay }) {

    const [status, setStatus] = useState(null);

    const getIcons = () => {
        const conditionLowerCase = cond.toLowerCase();
        const currCondition = `${conditionLowerCase.replaceAll(' ', '_')}${!isDay ? "_night" : ""}`;
        console.log(currCondition);
        const condition = icons[currCondition];
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
    }, []);

    return (
    <View style={styles.temperatureContainer}>
        <LinearGradient colors={['rgb(145,98,235)', "rgb(18,102,244)"]} style={styles.background}>
            <Text style={styles.condition}>{cond}</Text>
            <View style={styles.temperatureValue}>
                {getTemp()}
            </View>

            {status}
        </LinearGradient>
    </View>
    );
};