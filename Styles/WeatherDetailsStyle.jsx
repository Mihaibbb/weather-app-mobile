import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    body: {
        width: "100%",
        maxWidth: "100%",
        minHeight: 300,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 25,
        marginBottom: 60
    },

    container: {
        width: "100%",
        maxWidth: "95%",
        height: "100%"
    },

    itemContainer: {
        width: "100%",
        height: 92.5 * Dimensions.get("window").width / (100 * 2),
        flex: 1,
        flexBasis: 0,
        
        margin: 7.5,
        borderRadius: 12,
        padding: 10
    },

    iconText: {
        fontSize: 20,
        color: "#fff"
    },

    titleContainer: {
        width: "100%",
        height: "100%",
        flex: 1,
        flexDirection: 'row',
        flexBasis: 20,
        
    },

    title: {
        fontSize: 17,
        color: "rgba(255, 255, 255, .7)",
        marginLeft: 10,
        fontFamily: "QuicksandRegular"
    },

    content: {
        fontSize: 20,
        flex: 1,
        flexBasis: "100%",
        marginTop: 30,
        alignItems: 'center',
        
    },

    contentText: {
        color: "#fff",
        fontSize: 24,
        fontFamily: "QuicksandBold"
    },

    contentTextUnit: {
        color: "#fff",
        fontSize: 24,
        fontFamily: "QuicksandMedium"
    }
});

export default styles;