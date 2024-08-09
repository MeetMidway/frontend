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

function Map({ friendsAddresses, itinerary, containerStyle, stage }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "YOUR_API_KEY_HERE", // remove API key
  });

  const strokeColors = ["#FF0000", "#FDBF49", "#2985FF", "#2CCE59"];

  const [map, setMap] = useState(null);
  const [directionsResults, setDirectionsResults] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  const onLoad = useCallback(
    (map) => {
      const bounds = new window.google.maps.LatLngBounds();

      !!!friendsAddresses &&
        friendsAddresses.forEach((address) =>
          bounds.extend(
            new window.google.maps.LatLng(
              address.location.lat,
              address.location.lng
            )
          )
        );

      bounds.extend(
        new window.google.maps.LatLng(itinerary?.lat, itinerary?.lng)
      );
      map.fitBounds(bounds);
      setMap(map);
    },
    [itinerary, friendsAddresses]
  );

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const fetchDirections = useCallback(async () => {
    if (!map || !currentLocation || stage === 1) return;

    const directionsService = new window.google.maps.DirectionsService();

    const routePromises =
      !!friendsAddresses[0] &&
      friendsAddresses.map(
        (address) =>
          new Promise((resolve, reject) => {
            directionsService.route(
              {
                origin: new window.google.maps.LatLng(
                  address.location.lat,
                  address.location.lng
                ),
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

    try {
      const results = await Promise.all(routePromises);
      setDirectionsResults(results);
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  }, [map, currentLocation, itinerary, friendsAddresses]);

  // Reset directions when addresses change
  useEffect(() => {
    if ((isLoaded && map) || stage === 1) {
      setDirectionsResults([]); // Clear previous directions
      fetchDirections();
    }
  }, [isLoaded, map, friendsAddresses, itinerary, fetchDirections, stage]);

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

  console.log(friendsAddresses);

  return isLoaded && currentLocation ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentLocation}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {directionsResults.map((result, index) => (
        <MarkerF
          position={result.routes[0].overview_path[0]}
          key={index}
          icon={
            (index === 0 && RedPinIcon) ||
            (index === 1 && YellowPinIcon) ||
            (index === 2 && BluePinIcon) ||
            (index === 3 && GreenPinIcon)
          }
        />
      ))}
      {stage > 1 && (
        <MarkerF position={itinerary} key={"center"} icon={MidpointIcon} />
      )}

      {stage > 1 &&
        directionsResults.map((result, index) => (
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
            suppressMarkers={true}
          />
        ))}
    </GoogleMap>
  ) : (
    <div style={{height: containerStyle.height}} className="bg-base-white flex items-center justify-center">
      <h3 className="text-black">Loading Map</h3>
    </div>
  );
}

export default React.memo(Map);
