import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    forecast: {
        
        width: "100%",
        maxWidth: "100%",
        height: 275,
        flex: 1,
        
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20,
        
    },

    pressContainer: {
        width: "100%",
        maxWidth: "100%",
        minHeight: 225,
        
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 12,
    },

    dailyContainer: {
        width: "100%",
        height: "100%",
        borderRadius: 16,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    
    
    dateDay: {
        color: "#fff",
        marginTop: 20,
        fontSize: 16,
        fontFamily: "SfProDisplayMedium"
    },

    text: {
        color: '#fff'
    },

    textTemp: {
        marginTop: 10,
        fontSize: 22,
        fontFamily: "SFProDisplayMedium",
        color: '#fff',
    },

    temperature: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: -20
    },

    statusContainer: {
        width: 50,
        height: 50,
        
        
        
    }
});

export default styles;