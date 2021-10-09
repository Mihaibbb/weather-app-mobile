import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    temperatureContainer: {
        width: "100%",
        maxWidth: "90%",
        minHeight: 50,
        marginLeft: "auto",
        marginRight: "auto",
       
    },

    background: {
        width: "100%",
        
        height: "100%",
        minHeight: 275,
        borderRadius: 32,
        flex: 1,
        alignItems: "center",
    },

    temperature: {
        fontFamily: "SfProDisplayRegular",
        fontSize: 120,
        color: "#fff",
        marginTop: 20
    },

    temperatureValue: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start"
    },

    condition: {
        color: "#fff",
        marginTop: 25,
        fontSize: 18,
        fontFamily: "SfProDisplayRegular"
    },

    weatherStatus: {
        width: 75,
        height: 75,
        position: 'absolute',
        bottom: 0,
    },

    svgContainer: {
        
    }
});