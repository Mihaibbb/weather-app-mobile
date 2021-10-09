import React, { useState, useEffect } from 'react';
import { ScrollView, Dimensions, Text, View } from "react-native";
import { LineChart } from 'react-native-chart-kit';
import * as shape from 'd3-shape';
import styles from '../Styles/TemperatureChartStyles';

export default function TemperatureChart({ temp, labels }) {

    const [dataPoint, setDataPoint] = useState(null);

    return (
        <ScrollView stlye={styles.chartContainer} horizontal={true}>
             <LineChart
                data={{
                    labels: labels,
                    datasets: [{
                        data: temp
                    }]
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
                    backgroundGradientFrom: "rgb(145,98,235)",
                    backgroundGradientTo: "rgb(18,102,244)",
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
                    marginVertical: 28,
                    marginHorizontal: -85,
                    borderRadius: 16,
                }}
                withVerticalLines={false}
                withHorizontalLines={false}
                onDataPointClick={(value) => {
                    const xPos = value.x;
                    const yPos = value.y;
                    const element = 
                        <Text
                          style={{
                            position: 'absolute',
                            top: yPos - 10,
                            left: xPos - 90,
                            zIndex: 1000,
                            fontSize: 22,
                            color: "#fff"
                        }}>
                            {value.value}°
                        </Text>

                    setDataPoint(element);
                }}
                bezier
            />

            {dataPoint && dataPoint}
        </ScrollView>
    )
};