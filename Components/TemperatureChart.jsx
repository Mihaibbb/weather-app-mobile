import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, Dimensions, Text, View, Animated } from "react-native";
import { LineChart } from 'react-native-chart-kit';
import * as shape from 'd3-shape';
import styles from '../Styles/TemperatureChartStyles';
import getThemeColor from '../Data/ThemeColor';

const AnimatedDataPoint = ({ oldCoords, newCoords, value }) => {
    console.warn(oldCoords, newCoords);
    const moveAnimationX = useRef(new Animated.Value(oldCoords.x)).current;
    const moveAnimationY = useRef(new Animated.Value(oldCoords.y)).current;
    console.warn(moveAnimationX);
};


export default function TemperatureChart({ temp, labels, isDay }) {

    const [dataPoint, setDataPoint] = useState(null);
    const [dataPointCoords, setDataPointCoords] = useState(null);
    const themeColor = getThemeColor(isDay);
    console.log(themeColor);

    useEffect(() => {
        setDataPoint(null);
    }, [temp, labels]);

    const dataPointAnimation = (moveAnimationX, moveAnimationY, newCoords) => {
        useEffect(() => {
            Animated.parallel([
                Animated.timing(
                    moveAnimationX,
                    {
                        toValue: newCoords.x,
                        duration: 2000
                    }
                ).start(),
                
                Animated.timing(
                    moveAnimationY,
                    {
                        toValue: newCoords.y,
                        duration: 2000
                    }
                ).start()
            ]);
           
        }, [moveAnimationX, moveAnimationY]);
    };

    let minNumber = Number.POSITIVE_INFINITY;
    let maxNumber = Number.NEGATIVE_INFINITY;

    temp.forEach(temperature => {
        if (temperature < minNumber) minNumber = temperature;
        if (temperature > maxNumber) maxNumber = temperature;
    });

    const minValue =  minValue > 0 ? 0 : minNumber - (minNumber % 5);
    const maxValue =  maxNumber + (5 - maxNumber % 5);

    return (
        <View style={styles.chartContainer}>
            <ScrollView stlye={styles.chartContainer} horizontal={true}>
                <LineChart
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                data: temp
                            },
                            {
                                data: [minValue]
                            },
                            {
                                data: [maxValue]
                            }
                    ]
                    }}
                    width={75 * temp.length} // from react-native
                    height={190}
                    yAxisLabel=""
                    yAxisSuffix=""
                    yAxisInterval={10} // optional, defaults to 1
                    yLabelsOffset={60}
                    withHorizontalLabels={false}
                    
                    withOuterLines={false}
                    chartConfig={{
                        backgoundColor: "#000",
                        backgroundGradientFrom: themeColor[0],
                        backgroundGradientTo: themeColor[1],
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(213, 235, 248, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: "3",
                            strokeWidth: "3",
                            stroke: "#fff",
                            color: "#fff"
                        },
                        propsForLabels: {
                            fontSize: 12,
                            padding: 20
                        },
                        barPercentage: .5
                    }}
                    style={{
                        marginVertical: 10,
                        marginHorizontal: -85,
                        borderRadius: 16,
                        
                    }}
                    withVerticalLines={false}
                    withHorizontalLines={false}
                    onDataPointClick={(value) => {

                        const xPos = value.x;
                        const yPos = value.y;
                        const oldCoords = dataPointCoords === null ? {x: xPos, y: yPos} : 
                                        {x: dataPointCoords.x, y: dataPointCoords.y};
                        const newCoords = {x: xPos, y: yPos};
                        const elementValue = `${value.value}°`;

                        const moveAnimationX = new Animated.Value(oldCoords.x);
                        const moveAnimationY = new Animated.Value(oldCoords.y);

                        console.warn(moveAnimationX);

                        dataPointAnimation(moveAnimationX, moveAnimationY, newCoords);

                        const element = 
                            <Text
                            style={{
                                fontSize: 22,
                                color: "#fff"
                            }}>
                                {elementValue}
                            </Text>
                        

                        setDataPoint(element);
                        // setDataPointCoords(xPos, yPos);
                    }}
                    
                />
                {dataPoint && dataPoint}
            </ScrollView>
        </View> 
    );
};