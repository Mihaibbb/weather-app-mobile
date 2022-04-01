import React, { useState } from "react";
import { View, TouchableOpacity, Image} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFeather from 'react-native-vector-icons/Feather';
import {LinearGradient} from "expo-linear-gradient";

import styles from '../Styles/TemperatureButtonsStyle';
import getThemeColor from "../Data/ThemeColor";

export default function TemperatureButtons({callback, isDay }) {

    const [activeIdx, setActiveIdx] = useState(0);
    const [buttons, setButtons] = useState([true, false, false]);
    const themeColor = getThemeColor(isDay);

    const handleClickButton = (idx) => {
        setActiveIdx(idx);
        let newButtons = [false, false, false];
        newButtons[idx] = true;
        setButtons(newButtons);
        callback(newButtons);
    };

    const iconsElements = [
        <IconFeather size={25} color="#fff" name="airplay" />,
        <IconEntypo size={25} color="#fff" name="bar-graph" />,
        <Icon size={25} color="#fff" name="line-chart" />
    ];
    
    return (
        <View style={styles.body}>
            <View style={styles.buttonsContainer}>
                {
                    iconsElements.map((iconElement, idx) => 
                        <TouchableOpacity key={idx} style={{...styles.button, borderRightWidth: idx === 2 ? 0 : 1}} onPress={(e) => handleClickButton(idx)}>
                            <LinearGradient colors={activeIdx === idx ? themeColor : ["transparent", "transparent"]} style={styles.background}>
                                {iconElement}
                            </LinearGradient>
                        </TouchableOpacity>
                    )
                }
            </View>
        </View>
    );
}