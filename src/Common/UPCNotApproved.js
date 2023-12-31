import { View, Text, Image } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { NoSymbolIcon } from 'react-native-heroicons/outline';
import { useTranslation } from 'react-i18next';
import CustomButton from './CustomButton';

const UPCNotApproved = ({ UPCCode, submitUPC, cancelClicked }) => {
    const { t } = useTranslation();

    const resetUPCScanStack = () => {
        cancelClicked()
    };
    const submitHandler = () => {
        submitUPC()
    }



    return (
        <View className="mx-auto h-full flex w-11/12">
            <View className="flex-1">
                <View className="mb-5" style={{ alignItems: 'center' }}>
                    <NoSymbolIcon size={100} color={'red'} />
                    <Text className="text-red-600 text-lg">{t('pageText.NotWICApproved')}</Text>
                </View>
                <View className="border border-gray-500 py-3 rounded-md flex-row w-full justify-center" style={{ alignItems: 'center' }}>
                    <Image source={require('../../assets/Images/UPC/barcode.png')} style={{ width: 50, height: 50 }} />
                    <Text className="text-2xl pl-4">{UPCCode}</Text>
                </View>
                <Text className="text-red-500 text-center mt-10 text-base">{t('pageText.NotWICApprovedDetails')}</Text>
            </View>
            <View className="flex-row justify-center gap-5 footer">
                <CustomButton title={t('buttons.scanAgain')} CSSName="w-2/5" onPress={resetUPCScanStack} /><Text>&nbsp;&nbsp;&nbsp;</Text>
                <CustomButton title={t('buttons.submit')} CSSName="w-2/5" onPress={submitHandler} />
            </View>
        </View>
    )
}

export default UPCNotApproved