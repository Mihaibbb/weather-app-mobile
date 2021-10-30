import React from "react";
import {ScrollView, View, Text} from "react-native";
import styles from "../Styles/TemperatureGestureStyles";
import { LinearGradient } from "expo-linear-gradient";

import icons from "../Data/Icons";
import getThemeColor from "../Data/ThemeColor";
import UseFonts from "./Fonts";
import { useFonts } from "expo-font";

export default function TemperatureGestureChart({data, date, icon, isDay}) {

    const [loaded] = useFonts();
    const themeColor = getThemeColor(isDay);
    // if (!loaded) return null;    
    console.warn(icon);

    return (
        <View style={styles.body}>
            <LinearGradient colors={themeColor} style={styles.container}>
                <ScrollView style={styles.scrollContainer} horizontal={true}>
                    {
                        data.map((temp, idx) => {
                            const condition = `${icon[idx]}${!isDay ? "_night" : ""}`;
                            const iconCondition = icons[condition];
                            
                            return (
                                <View style={styles.hourContainer} key={idx}>
                                    <Text style={styles.hour}>{date[idx]}</Text>
                                    <View style={styles.iconContainer}>
                                        {iconCondition && iconCondition}
                                    </View>
                                    <Text style={styles.text}>{temp}°</Text>
                                </View>
                            );
                        })
                    }
                </ScrollView>
            </LinearGradient>
        </View>
    )
}