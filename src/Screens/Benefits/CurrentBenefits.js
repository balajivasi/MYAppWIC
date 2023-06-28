import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { handleInvalidWICAccount } from '../../Common/handleInvalidWICAccount';
import { CurrentBenefitsService } from '../../Services/apiService';
import BenefitsList from '../../Common/BenefitsList';
import { setLoading } from '../../slices/loaderSlice';
import { ExclamationTriangleIcon } from 'react-native-heroicons/outline';
import { useTranslation } from 'react-i18next';

const CurrentBenefits = ({ navigation }) => {
    const Token = useSelector(state => state.user.Token);
    const [benefits, setBenefits] = useState([]);
    const [serverError, setServerError] = useState('');
    const ActiveCardNumber = useSelector(state => state.user.EBTCardNumber);
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const loadCurrentBenefits = async () => {
        dispatch(setLoading(true));
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const EffDateCode = `${year}${month}`;

        try {
            const response = await CurrentBenefitsService(Token, EffDateCode);
            if (response.Status === 1) {
                response.ServiceResponse.length != 0 ? setBenefits(response.ServiceResponse) : setBenefits([]);
            } else {
                setServerError(response.ServiceResponse[0].Message);
                try {
                    await handleInvalidWICAccount(response, dispatch);
                } catch (error) {
                    console.log('handleInvalidWICAccount failed.', error)
                }
            }
        } catch (error) {
            console.log('Fail to load current Benefits', error);
        }
        dispatch(setLoading(false));
    }

    useEffect(() => {
        loadCurrentBenefits();
    }, [ActiveCardNumber]);

    const handleSelectCard = (benefit) => {
        navigation.push('BenefitsDetails', { Benefit: benefit });
    }


    return (
        <View className="h-ful mx-auto mt-2" >

            {benefits[0] && <Text className="text-center text-xl mb-3">{benefits[0]?.BenefitStartDate} - {benefits[0]?.BenefitEndDate}</Text>}
            <ScrollView >
                <View className="w-screen flex-row  flex-wrap gap-2 items-stretch">
                    {benefits.length >= 0 ? <View className="w-screen pt-16" style={{ alignItems: "center" }}>
                        <ExclamationTriangleIcon size={150} color={'gray'} />
                        <Text className="text-center text-gray-500">{t('pageText.noBenefits')}</Text>
                    </View> : null}
                    {benefits?.map((benefit, index) => {
                        return (
                            <View key={index} className="border border-gray-500 bg-slate-300 rounded-lg" style={{ width: '31%' }}>
                                <BenefitsList benefit={benefit} onSelect={() => handleSelectCard(benefit)} />
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
};

export default CurrentBenefits;
