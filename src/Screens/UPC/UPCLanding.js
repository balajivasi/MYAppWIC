import { View, Text } from 'react-native'
import React from 'react'

const UPCLanding = ({ route }) => {
    const { Barcode, PageTitle } = route.params;


    return (
        <View>
            <Text>UPCLanding {Barcode}</Text>
        </View>
    )
}

export default UPCLanding