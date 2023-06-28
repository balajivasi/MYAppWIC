import { View, Text, Image } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CustomButton from '../../Common/CustomButton';
import { setScannedUPC } from '../../slices/profileSlice';
import { CommonActions } from '@react-navigation/native';

const UPCSubmitStatus = ({ route, navigation }) => {
    const UPCCode = useSelector(state => state.user.ScannedUPC);
    const dispatch = useDispatch();
    const UPCSubmittedStatus = 1013;
    const { t } = useTranslation();
    const resetSubmit = () => {
        dispatch(setScannedUPC(null));
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'UPCScan' }]
            })
        );
    }


    return (
        <View className="h-full w-11/12 mx-auto flex">
            <View className="flex-1">
                <View className="border mt-3 border-gray-500 py-3 rounded-md flex-row w-full justify-center" style={{ alignItems: 'center' }}>
                    <Image source={require('../../../assets/Images/UPC/barcode.png')} style={{ width: 50, height: 50 }} />
                    <Text className="text-2xl pl-4">{UPCCode}</Text>
                </View>
                {UPCSubmittedStatus === 1013 ? <Text className="mt-5 text-lg text-center">{t('pageText.UPCExist')}</Text> : null}
                {UPCSubmittedStatus === 1014 ? <Text className="mt-5 text-lg text-center">{t('pageText.UPCInvalid')}</Text> : null}
            </View>
            <View className="flex-row justify-center gap-5 footer">
                <CustomButton title={t('buttons.startOver')} CSSName="w-2/5" onPress={() => resetSubmit()} />
            </View>
        </View>
    )
}

export default UPCSubmitStatus