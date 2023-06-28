import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapScreen from '../Common/MapScreen';
import CustomTextInput from '../Common/CustomTextInput';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { StoresService, fetchCoordinates } from '../Services/apiService';
import { Slider } from '@miblanchard/react-native-slider';
import { AbortController } from 'abort-controller';
import { useTranslation } from 'react-i18next';

export default function Stores({ navigation }) {
  const [miles, setMiles] = useState(5);
  const [address, setAddress] = useState("");
  const [latLng, setLatLng] = useState({ lat: 30.412822, lng: -84.3348902 });
  const [markers, setMarkers] = useState();
  const [abortController, setAbortController] = useState(null);
  const { t } = useTranslation();

  const handleSliderComplete = (newValue) => {
    setMiles(newValue[0]);
  };

  const searchAddress = async () => {
    try {
      const response = await fetchCoordinates(address);
      if (response) {
        setLatLng(response);
      }
    } catch (error) {
      console.error('Failed to fetch address', error);
    }
  };

  const getClinics = async () => {
    if (abortController) {
      abortController.abort();
    }

    const newAbortController = new AbortController();
    setAbortController(newAbortController);

    try {
      const clinicResponse = await StoresService(latLng.lat, latLng.lng, miles, newAbortController.signal);
      if (clinicResponse) {
        setMarkers(clinicResponse.ServiceResponse);
      }
    } catch (error) {
      console.error('Failed to fetch Stores', error);
    } finally {
      // Reset the abortController after the service call is complete
      setAbortController(null);
    }
  };

  useEffect(() => {
    getClinics();
  }, [latLng, miles, navigation]);

  return (
    <View className="flex-col  h-screen ">
      <View className="flex-row">
        <CustomTextInput placeholder={t('TPH.PH_AddZip')} value={address} onChangeText={setAddress} />
        <View className="mt-5 mr-2" >
          <TouchableOpacity onPress={searchAddress}>
            <MagnifyingGlassIcon size={40} />
          </TouchableOpacity>
        </View>
      </View>
      <View className="h-4/6">
        <MapScreen latLng={latLng} markers={markers} miles={miles} />
      </View>
      <View className="flex-row">
        <Text className="w-2/12 text-lg mt-2 leading-7 text-center">0{'\n'}{t('pageText.miles')}</Text>
        <View className="w-8/12">
          <Text className="text-center text-base">{miles} {t('pageText.miles')}</Text>
          <Slider value={miles} onSlidingComplete={handleSliderComplete} step={2} minimumValue={0} maximumValue={30} /></View>
        <Text className="w-2/12 text-lg mt-2 leading-7 text-center">30{'\n'}{t('pageText.miles')}</Text>
      </View>
    </View>
  );
}
