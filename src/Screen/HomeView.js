import React, { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  DirectionsRenderer,
} from "@react-google-maps/api";
import BluePinIcon from "../assets/icons/PinIcons/BluePinIcon.svg";
import RedPinIcon from "../assets/icons/PinIcons/RedPinIcon.svg";
import GreenPinIcon from "../assets/icons/PinIcons/GreenPinicon.svg";
import YellowPinIcon from "../assets/icons/PinIcons/YellowPinIcon.svg";
import MidpointIcon from "../assets/icons/MidpointIcon.svg";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

// Example addresses within New York City
const friendsAddresses = [
  { lat: 40.771155, lng: -73.813196 },
  { lat: 40.7700092, lng: -73.8149323 },
  { lat: 40.7654828, lng: -73.8132505 },
];

//will import coord for midpoint
const center = { lat: 40.7663, lng: -73.81423 };

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBdKyA2xeRRyMIb-Aj7WkY7VH7RlsVt6to", //remove api key
  });

  const strokeColors = ["#FF0000", "#FDBF49", "#2985FF", "#2CCE59"];
  
  
  //state variables
  const [map, setMap] = useState(null);
  const [directionsResults, setDirectionsResults] = useState([]);
  

  const onLoad = useCallback(function callback(map) {
    // bounds for all ze markers
    const bounds = new window.google.maps.LatLngBounds();
    friendsAddresses.forEach((address) =>
      bounds.extend(new window.google.maps.LatLng(address.lat, address.lng))
    );
    bounds.extend(new window.google.maps.LatLng(center.lat, center.lng));
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const fetchDirections = useCallback(async () => {
    if (!map) return;

    const directionsService = new window.google.maps.DirectionsService();

    //getting the direction from each friend to the midpoint
    const routePromises = friendsAddresses.map(
      (address) =>
        new Promise((resolve, reject) => {
          directionsService.route(
            {
              origin: new window.google.maps.LatLng(address.lat, address.lng),
              destination: new window.google.maps.LatLng(
                center.lat,
                center.lng
              ),
              travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
              if (status === window.google.maps.DirectionsStatus.OK) {
                resolve(result);
              } else {
                reject(`Directions request failed due to ${status}`);
              }
            }
          );
        })
    );

    //adding directions
    try {
      const results = await Promise.all(routePromises);
      setDirectionsResults(results);
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  }, [map]);

  //lisening for any state changes

  useEffect(() => {
    if (isLoaded && map) {
      fetchDirections();
    }
  }, [isLoaded, map, fetchDirections]);

  //const endpoint = directionsResults[0]?.routes[0].overview_path.length;

  
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {directionsResults.map((result, index) => (
        <MarkerF
          position={directionsResults[index]?.routes[0].overview_path[0]}
          key={index}
          icon={
            (index === 0 && RedPinIcon) ||
            (index === 1 && YellowPinIcon) ||
            (index === 2 && BluePinIcon) ||
            (index === 3 && GreenPinIcon)
          }
        />
      ))}
      <MarkerF
        position={center}
        key={"center"}
        icon={MidpointIcon}
      />

      {directionsResults.map((result, index) => (
        <DirectionsRenderer
          key={index}
          directions={result}
          options={{
            polylineOptions: {
              strokeColor: strokeColors[index],
              strokeWeight: 5,
            },
            suppressMarkers: true,
          }}
        />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
