import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    body: {
        width: "100%",
        minHeight: 200,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 20
    },

    container: {
        width: "100%",
        maxWidth: "90%",
        height: "100%",
        borderRadius: 10,
        flex: 1,
        flexDirection: "column",
        
    },

    scrollContainer: {
        minWidth: "100%",
        height: "100%",
       
    },

    div: {
        flex: 1,
        justifyContent: "center",
        maxHeight: 255
    },

    barChart: {
        flex: 1,
        
          
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: "center",
        paddingTop: 35
    },

    tempContainer: {
        width: 50,
        height: 75,
        marginHorizontal: 12.5,
        borderRadius: 10,
        
        
    },

    barContainer: {
        width: "100%",
        height: "100%",
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: "50%"
    },

    labels: {
        padding: 10,
        borderTopWidth: 0.5,
        borderTopColor: "rgba(255, 255, 255, .5)",
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        justifyContent: "flex-end",
        alignItems: "flex-end",
       
        
    },

    labelsContainer: {
        marginHorizontal: 10,
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        height: 25,
        width: 25
    },

    labelsText: {
        color: "#fff",
        fontSize: 15,
        textAlign: "center",
        
    },

   
});

export default styles;