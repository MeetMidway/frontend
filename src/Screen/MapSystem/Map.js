import React, { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  DirectionsRenderer,
} from "@react-google-maps/api";
import BluePinIcon from "../../assets/icons/PinIcons/BluePinIcon.svg";
import RedPinIcon from "../../assets/icons/PinIcons/RedPinIcon.svg";
import GreenPinIcon from "../../assets/icons/PinIcons/GreenPinIcon.svg";
import YellowPinIcon from "../../assets/icons/PinIcons/YellowPinIcon.svg";
import MidpointIcon from "../../assets/icons/PinIcons/MidpointIcon.svg";



// Example addresses within New York City
// const friendsAddresses = [
//   { lat: 40.771155, lng: -73.813196 },
//   { lat: 40.7700092, lng: -73.8149323 },
//   { lat: 40.7654828, lng: -73.8132505 },
// ];

// // will import coord for midpoint
// const center = { lat: 40.7663, lng: -73.81423 };

function Map({ friendsAddresses, itinerary, containerStyle }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "", // remove API key
  });

  const strokeColors = ["#FF0000", "#FDBF49", "#2985FF", "#2CCE59"];

  // state variables
  const [map, setMap] = useState(null);
  const [directionsResults, setDirectionsResults] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  const onLoad = useCallback(function callback(map) {
    // bounds for all markers
    const bounds = new window.google.maps.LatLngBounds();
    friendsAddresses?.forEach((address) =>
      bounds.extend(new window.google.maps.LatLng(address.lat, address.lng))
    );
    bounds.extend(new window.google.maps.LatLng(itinerary?.lat, itinerary?.lng));
    map.fitBounds(bounds);
    setMap(map);
  }, [itinerary, friendsAddresses]);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const fetchDirections = useCallback(async () => {
    if (!map || !currentLocation) return;

    const directionsService = new window.google.maps.DirectionsService();

    // getting the direction from each friend to the midpoint
    const routePromises = friendsAddresses.map(
      (address) =>
        new Promise((resolve, reject) => {
          directionsService.route(
            {
              origin: new window.google.maps.LatLng(address.lat, address.lng),
              destination: new window.google.maps.LatLng(
                itinerary.lat,
                itinerary.lng
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

    // adding directions
    try {
      const results = await Promise.all(routePromises);
      setDirectionsResults(results);
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  }, [map, currentLocation, itinerary, friendsAddresses]);

  // listening for any state changes
  useEffect(() => {
    if (isLoaded && map) {
      fetchDirections();
    }
  }, [isLoaded, map, fetchDirections]);

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(userLocation);
          map?.setCenter(userLocation);
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [map]);

  return isLoaded && currentLocation ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentLocation}
      zoom={14}
      onLoad={friendsAddresses && onLoad}
      onUnmount={onUnmount}
    >
      {friendsAddresses?.map((address, index) => (
        <MarkerF position={address} key={index} />
      ))}
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
      <MarkerF position={itinerary} key={"center"} icon={MidpointIcon} />

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
