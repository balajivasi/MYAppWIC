import { View, Text } from 'react-native'
import React from 'react'
import BarcodeScanner from '../Common/BarcodeScanner'

const UPCScan = () => {
    return (
        <View>
            <BarcodeScanner />
        </View>
    )
}

export default UPCScan