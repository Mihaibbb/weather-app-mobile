import {StyleSheet} from "react-native";

const styles = StyleSheet.create({

    body: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center"
        
        
    },

    buttonsContainer: {
        width: "100%",
        maxWidth: "50%",
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: "auto",
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 1,
        
    },
    
    button: {
        
        height: 45,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRightColor: "#fff",
        borderRightWidth: 1,
        
    },

    background: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },  

    buttonLastChild: {
        borderRightWidth: 0
    }

    
});

export default styles;