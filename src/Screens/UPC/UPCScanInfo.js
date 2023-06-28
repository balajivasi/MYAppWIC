import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from '../../Common/CustomButton'
import { useTranslation } from 'react-i18next'
import { CameraIcon, PencilIcon } from 'react-native-heroicons/outline'

const UPCScanInfo = ({ navigation }) => {
    const { t } = useTranslation();
    return (
        <View className="mx-auto h-full flex w-11/12">
            <View className="flex-1">
                <Text className="mt-5 text-base">{t('pageText.UPCScanInfo')}</Text>
                <View style={{ alignItems: 'center' }} className="mt-3 pb-5 border-b border-gray-500">
                    <View>
                        <CameraIcon size={50} color={'black'} />
                    </View>
                    <Text className="mt-5 text-base text-center">{t('pageText.productPic')}</Text>
                </View>
                <View style={{ alignItems: 'center' }} className="mt-3 pb-5 border-b border-gray-500">
                    <View>
                        <CameraIcon size={50} color={'black'} />
                    </View>
                    <Text className="mt-5 text-base text-center">{t('pageText.nutritionLabelPic')}</Text>
                </View>
                <View style={{ alignItems: 'center' }} className="mt-3">
                    <PencilIcon size={50} color={'black'} />
                    <Text className="mt-5 text-base text-center">{t('pageText.prodDesc')}</Text>
                </View>
            </View>
            <View className="flex-row justify-center gap-5 footer">
                <CustomButton title={t('buttons.cancel')} CSSName="w-2/5" onPress={() => { navigation.navigate('Home') }} /><Text>&nbsp;&nbsp;&nbsp;</Text>
                <CustomButton title={t('buttons.continue')} CSSName="w-2/5" onPress={() => { navigation.navigate('UPCSubmitLanding') }} />
            </View>
        </View>
    )
}

export default UPCScanInfo