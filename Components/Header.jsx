import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { styles } from '../Styles/HeaderStyle';

export default function Header({ location }) {
    
    const [currentDate, setCurrentDate] = useState("");
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    useEffect(() => {
        const date = new Date();
        const day = date.getDate();
        const monthName = date.toLocaleString("default", { month: "long" });
        const monthNameShort = monthName.slice(0, 3);
        const weekDay = date.getDay();
        const weekDayName = days[weekDay];
        
        const stringDate = `${weekDayName}, ${day} ${monthNameShort}`;
        setCurrentDate(stringDate);
    }, []);

    return (
        <View style={styles.header}>
            <Text style={styles.city}>{location}</Text>
            <Text style={styles.date}>{currentDate}</Text>
        </View>
    );
};