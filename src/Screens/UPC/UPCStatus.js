import { View, Text } from 'react-native'
import React from 'react'

const UPCStatus = ({ route }) => {
    const status = route.params.status;
    return (
        <View>
            <Text>UPCStatus{status}</Text>
        </View>
    )
}

export default UPCStatus