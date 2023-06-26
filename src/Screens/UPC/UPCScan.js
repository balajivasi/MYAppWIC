import { View, Text } from 'react-native'
import React from 'react'
import BarcodeScanner from '../../Common/BarcodeScanner'
import { useDispatch } from 'react-redux'
import { setScannedUPC } from '../../slices/profileSlice'


const UPCScan = ({ navigation }) => {
    const dispatch = useDispatch()
    const barcodeData = (data) => {
        console.log('[UPCScan]', data)
        dispatch(setScannedUPC(data));
        navigation.navigate('UPCLanding');
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