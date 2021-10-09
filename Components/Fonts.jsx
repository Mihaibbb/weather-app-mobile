
import {useFonts} from 'expo-font';

export default function UseFonts() {
    return useFonts({
        SourceSansPro: require('../assets/fonts/SourceSansPro-Regular.ttf'),
        SfProDisplayMedium: require('../assets/fonts/SFProDisplay-Medium.ttf'),
        SfProDisplayRegular: require('../assets/fonts/SFProDisplay-Regular.ttf'),
        // SfProDisplayBold: require('../assets/fonts/SFProDisplay-Bold.OTF'),
        InterRegular: require("../assets/fonts/Inter-Regular.ttf"),
        // InterMedium: require("../assets/fonts/Inter-Medium.ttf"),
        InterThin: require("../assets/fonts/Inter-Thin.ttf"),
        InterSemiBold: require("../assets/fonts/Inter-SemiBold.ttf"),
        QuicksandBold: require("../assets/fonts/Quicksand-Bold.ttf"),
        LatoRegular: require("../assets/fonts/Lato-Regular.ttf"),
        RalewayRegular: require("../assets/fonts/Raleway-Regular.ttf"),
        RalewayMedium: require("../assets/fonts/Raleway-Medium.ttf"),
    });
};

