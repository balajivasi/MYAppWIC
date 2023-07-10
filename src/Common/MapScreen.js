import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import MapCallout from './MapCallout';

const MapScreen = ({ latLng, markers, miles }) => {
  const [mapRegion, setMapRegion] = useState(null);

  useEffect(() => {
    // Set the initial map region based on the latLng prop
    if (latLng) {
      const metersPerMile = 1609.34;
      setMapRegion({
        latitude: latLng.lat,
        longitude: latLng.lng,
        latitudeDelta: (miles / metersPerMile) * 15, // Calculate latitude delta based on miles
        longitudeDelta: (miles / (metersPerMile * Math.cos((37.7749 * Math.PI) / 180))) * 15, // Calculate longitude delta based on miles and latitude
      });
    }

  }, [latLng, markers, miles]);

  const handleRegionChange = (region) => {
    // Update the mapRegion state whenever the user interacts with the map
    setMapRegion(region);
  };

  return (
    <View style={{ flex: 1 }}>
      {mapRegion && (
        <MapView
          style={{ flex: 1 }}
          region={mapRegion}
          onRegionChange={handleRegionChange}
          showsUserLocation={true}
        >
          {markers?.map((marker, index) => <Marker key={index} coordinate={{ latitude: marker.Latitude, longitude: marker.Longitude }} title={marker.ClinicName}
            description="Marker Description 2"
            pinColor="red" >
            <Callout>
              <MapCallout markerDetails={marker} />
            </Callout>
          </Marker>)}


        </MapView>
      )}
    </View>
  );
};

export default MapScreen;
