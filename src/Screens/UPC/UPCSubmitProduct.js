import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from '../../Common/CustomButton'
import { useTranslation } from 'react-i18next'
import BarcodeScanner from '../../Common/BarcodeScanner'

const UPCSubmitProduct = ({ navigation }) => {
    const { t } = useTranslation()
    return (
        <View className="mx-auto h-full flex w-11/12">

            <View className="flex-1">

            </View>
            <View className="flex-row justify-center gap-5 footer">
                <CustomButton title={t('buttons.cancel')} CSSName="w-2/5" /><Text>&nbsp;&nbsp;&nbsp;</Text>
                <CustomButton title={t('buttons.continue')} CSSName="w-2/5" onPress={() => { navigation.navigate('UPCSubmitLabel') }} />
            </View>
        </View>
    )
}

export default UPCSubmitProduct