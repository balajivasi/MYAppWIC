import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { handleInvalidWICAccount } from '../../Common/handleInvalidWICAccount';
import { CurrentBenefitsService } from '../../Services/apiService';
import BenefitsList from '../../Common/BenefitsList';

const CurrentBenefits = ({navigation}) => {
    const Token = useSelector(state => state.user.Token);
    const [benefits, setBenefits] = useState([]);
    const [serverError, setServerError] = useState('');
    const ActiveCardNumber = useSelector(state => state.user.EBTCardNumber);
    const dispatch=useDispatch()
    const loadCurrentBenefits = async () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const EffDateCode = `${year}${month}`;

        try {
            const response = await CurrentBenefitsService(Token, EffDateCode);
            if (response.Status === 1) {
                response.ServiceResponse.length != 0 ? setBenefits(response.ServiceResponse):setBenefits([]);
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
    }

    useEffect(() => {
        loadCurrentBenefits();
    }, [ActiveCardNumber]);

    const handleSelectCard = (benefit) => {
        navigation.push('BenefitsDetails', { Benefit: benefit });
    }


    return (
        <View className="h-ful mx-auto mt-2" >
            {benefits[0] && <Text className="text-center text-xl mb-3">{benefits[0]?.BenefitStartDate} - {benefits[0]?.BenefitEndDate}</Text> }
            <ScrollView>
                <View className="w-full flex-row flex-wrap gap-2 mb-10 items-stretch">
                    {benefits?.map((benefit, index) => {
                        return (
                            <View key={index} className="border border-gray-500 bg-slate-300 rounded-lg" style={{ width: '31.3%' }}>
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
