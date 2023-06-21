import { View, Text } from 'react-native'
import React from 'react'
import BarcodeScanner from '../Common/BarcodeScanner'

const UPCScan = () => {
    return (
        <View className="h-screen bg-red-600">
            <BarcodeScanner />
        </View>
    )
}

export default UPCScan