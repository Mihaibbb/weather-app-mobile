import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    body: {
        width: "100%",
        minHeight: 180,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        marginBottom: 50
    },

    container: {
        width: "100%",
        maxWidth: "90%",
        height: "100%",
        borderRadius: 10
    },

    scrollContainer: {
        flex: 1,
        flexDirection: "row",
        minWidth: "100%",
        height: "100%",
    },

    hourContainer: {
        width: "100%",
        minWidth: 75,
        height: "100%",
        
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
    },

    hour: {
        fontSize: 18,
        color: "#fff",
        textAlign: "center",
        fontFamily: "SfProDisplayMedium",
    },

    text: {
        fontSize: 20,
        color: "#fff",
        textAlign: "center",
        fontFamily: "SfProDisplayMedium",
    },

    iconContainer: {
        width: 40,
        height: 40,
       
    }
});

export default styles;