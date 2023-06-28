import { View, Text } from 'react-native'
import React from 'react'
import BarcodeScanner from '../../Common/BarcodeScanner'
import { useDispatch, useSelector } from 'react-redux'
import { setScannedUPC } from '../../slices/profileSlice'


const UPCScan = ({ navigation }) => {

    const Barcode = useSelector(state => state.user.ScannedUPC);
    const dispatch = useDispatch()
    const barcodeData = (data) => {
        dispatch(setScannedUPC(data));
        navigation.replace('UPCLanding');
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