import React from "react";
import { View, ScrollView, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import styles from "../Styles/TemperatureBarStyles";
import UseFonts from "./Fonts";
import Icon from "react-native-vector-icons/FontAwesome";

export default function TemperatureBarChart({ data, labels, unit, color, deg=null, percent, isDay }) {

    const [loaded] = UseFonts();

    if (!loaded) return null;

    const barContainerHeight = 275;
    let maxValue = Number.NEGATIVE_INFINITY;
    
    data.forEach(dataHourly => maxValue = Math.max(dataHourly, maxValue));
    console.warn(maxValue);

    // Algorithm for calculating the percentage for bar container's height
    // const percentage = maxValue / (barContainerHeight / 100);
    // console.warn(percentage);
    return (
        <View style={styles.body}>
            <LinearGradient colors={["#14202b", "#111"]} style={styles.container}>
                <ScrollView style={styles.scrollContainer} horizontal={true}>
                    <View>
                        <View style={styles.barChart}>
                            {
                                data.map((eachTemp, idx) => {
                                    const percentage = (eachTemp * 90) / maxValue;
                                    return (
                                        <View style={styles.div} key={idx}>
                                            <Text style={styles.labelsText}>{eachTemp}{unit}</Text>
                                            <LinearGradient colors={color} style={{...styles.tempContainer, height: `${percentage}%`}}>
                                                <View style={styles.barContainer}>
                                                    {deg && <Icon name="location-arrow" color="rgba(255, 255, 255, .75)" size={30} style={{transform: [{rotateZ: `${deg[idx] - 45}deg`}]}}/>}
                                                </View>
                                            </LinearGradient>
                                        </View>
                                    );
                                })
                            }
                        </View>

                        <View style={styles.labels}>
                            {
                                labels.map((label, idx) => {
                                    return (
                                        <View style={styles.labelsContainer} key={idx}>
                                            <Text style={styles.labelsText}>{label}</Text>
                                        </View>
                                    );
                                })
                            }
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient> 
        </View>
    );
};