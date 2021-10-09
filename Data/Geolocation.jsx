import {useState} from "react";

const [coords, setCoords] = useState('');

    
navigator.geolocation.getCurrentPosition(position => {
    const data = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    };  

    setCoords(data);
});

export default coords;





