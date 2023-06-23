import { View, Text } from 'react-native'
import React from 'react'
import BarcodeScanner from '../../Common/BarcodeScanner'


const UPCScan = ({ navigation }) => {

    const barcodeData = (data) => {
        console.log('[UPCScan]', data)
        navigation.navigate('UPCLanding', { Barcode: data, PageTitle: "Verify Card" });
    }
    const cancelHandler = () => {
        navigation.goBack();
    }

    return (
        <View className="h-full bg-red-600">
            <BarcodeScanner barcode={barcodeData} cancelHandler={cancelHandler} />
        </View>
    )
}

export default UPCScan