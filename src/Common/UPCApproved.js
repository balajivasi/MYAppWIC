import { View, Text, Image } from 'react-native';
import React from 'react';
import { CheckCircleIcon } from 'react-native-heroicons/outline';
import { useTranslation } from 'react-i18next';
import CustomButton from './CustomButton';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { formatDate } from './DateFormat';

const UPCApproved = ({ UPCData, UPCCode }) => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const resetUPCScanStack = () => {
        /* navigation.dispatch(
             CommonActions.reset({
                 index: 0,
                 routes: [{ name: 'UPCScan' }]
             })
         );*/
        navigation.goBack();
    };

    return (
        <View className="mx-auto h-full flex w-11/12">
            <View className="flex-1">
                <View className="mb-5" style={{ alignItems: 'center' }}>
                    <CheckCircleIcon size={100} color={'green'} />
                    <Text className="text-green-600 text-lg">{t('pageText.WICApproved')}</Text>
                </View>
                <View className="border border-gray-500 py-3 rounded-md flex-row w-full justify-center" style={{ alignItems: 'center' }}>
                    <Image source={require('../../assets/Images/UPC/barcode.png')} style={{ width: 50, height: 50 }} />
                    <Text className="text-2xl pl-4">{UPCCode}</Text>
                </View>
                <View className="border border-gray-500 pt-3 rounded-md mt-10 relative">
                    <View className="border border-gray-400 rounded-full w-16 p-1 left-[42%] absolute -top-7 bg-white z-10">
                        <Image source={require('../../assets/Benefits/benefit_02.png')} style={{ width: 50, height: 50 }} className="" />
                    </View>
                    <Text className="mt-6 text-lg text-center">{UPCData.FoodDescription}</Text>
                    <View className="flex-row mt-2 justify-around">
                        <Text className="text-center">{t('pageText.BenefitStart')} {'\n'} {formatDate(UPCData.BenefitStartDate)}</Text>
                        <Text className="text-center">{t('pageText.BenefitEnd')} {'\n'} {formatDate(UPCData.BenefitEndDate)}</Text>
                    </View>
                    <Text className="mt-5 text-center text-green-600 font-medium">{t('pageText.RemainingQuantity')}</Text>
                    <Text className="text-center text-green-600 text-3xl font-medium">{UPCData.RemainingQuantity}</Text>
                </View>
            </View>
            <View className="flex-row justify-center gap-5 footer">
                <CustomButton title={t('buttons.scanAgain')} CSSName="w-2/5" onPress={resetUPCScanStack} />
            </View>
        </View>
    )
}

export default UPCApproved