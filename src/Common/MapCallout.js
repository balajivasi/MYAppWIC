import { View, Text, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import { MapPinIcon, PhoneIcon } from 'react-native-heroicons/outline'
const MapCallout = ({ markerDetails }) => {
    return (
        <View className="p-1 flex-col">
            <Text className="text-2xl text-center mb-1">{markerDetails?.ClinicName || markerDetails?.StoreName}</Text>
            {markerDetails?.StoreType !=="" && <Text className="text-xl text-center">{markerDetails?.StoreType}</Text>}
            <View className="flex-row gap-3">
                <TouchableOpacity className="mt-5"><MapPinIcon size={35} /></TouchableOpacity>
                <Text className="text-base">{markerDetails?.Address1}{'\n'}{markerDetails?.Address2}{'\n'}{markerDetails?.PhoneNumber}</Text>
                <TouchableOpacity className="mt-5" onPress={() => Linking.openURL(`tel:${markerDetails?.PhoneNumber}`)}>
                    <PhoneIcon size={35} />
                </TouchableOpacity>
            </View>
            {markerDetails?.OperationHours1 !== "" && <Text className=" text-base text-center">{markerDetails.OperationHours1}{markerDetails.OperationHours2}{markerDetails.OperationHours3}</Text>}
        </View>
    )
}

export default MapCallout