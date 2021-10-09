import { StyleSheet, Platform } from "react-native";

export function Styles(changeSearchBar) {

    const styles = StyleSheet.create({
        searchBarContainer: {
            flex: 1,
            width: "100%",
            maxWidth: 320,
            height: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 65,
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          },
        
          searchBar: {
            width: "100%",
            maxWidth: "100%",
            height: 50,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderRadius: 32,
            padding: 16,
            fontSize: 22,
            color: changeSearchBar,
            fontFamily: "SourceSansPro",
          },
        
          searchIconContainer: {
            // cursor: Platform.OS === 'web' ? "pointer" : 'initial'
            
          },

    
    });

    return styles;

}
 