import { View, Text, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../../Common/CustomButton'
import { useTranslation } from 'react-i18next'
import CustomTextInput from '../../Common/CustomTextInput'
import { validateDescription, validateEmail, validatePackage, validatePhone } from '../../Common/FormValidation'
import PhoneNumberInput from '../../Common/PhoneNumberInput'
import { UPCSubmitService } from '../../Services/apiService'
import { useDispatch, useSelector } from 'react-redux'
import { handleInvalidWICAccount } from '../../Common/handleInvalidWICAccount'
import { setLoading } from '../../slices/loaderSlice'

const UPCSubmit = ({ navigation, ProductPic, ProductLabel, StartOver, UPCSubmitted }) => {
    const { t } = useTranslation();
    const [packageSize, setPackageSize] = useState();
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [Description, setDescription] = useState();
    const Token = useSelector(state => state.user.Token);
    const UPCCode = useSelector(state => state.user.ScannedUPC);
    const [serverError, setServerError] = useState()
    const dispatch = useDispatch();

    const handlePackageSize = (text) => {
        const formattedText = text.replace(/[^\d.]/g, ''); // Remove non-digit and non-period characters
        const parts = formattedText.split('.'); // Split the text by the period
        let formattedPackageSize = '';

        if (parts.length === 1) {
            if (parts[0].length <= 4) {
                formattedPackageSize = parts[0].slice(0, 4);
            } else {
                formattedPackageSize = `${parts[0].slice(0, 4)}.`;
            }
        }
        else if (parts.length === 2) {
            const digitsBeforeDot = parts[0].slice(0, 4);
            const digitsAfterDot = parts[1].slice(0, 2);
            formattedPackageSize = `${digitsBeforeDot}.${digitsAfterDot}`;
        }
        setPackageSize(formattedPackageSize);
    };

    const handleEmail = (text) => {
        if (text.length <= 35) {
            setEmail(text)
        }
    }
    const handleDescription = (text) => {
        if (text.length <= 35) {
            setDescription(text)
        }
    }
    const submitUPC = async () => {
        const Package = validatePackage(packageSize);
        const emailAddress = validateEmail(email);
        const Phone = validatePhone(phoneNumber);
        const Desc = validateDescription(Description);
        if (
            Package &&
            emailAddress &&
            Phone &&
            Desc
        ) {
            dispatch(setLoading(true));
            try {
                const response = await UPCSubmitService(Token, UPCCode, Description, packageSize, email, phoneNumber, ProductPic, ProductLabel);
                // Handle the successful response
                console.log('upc submitted', response)
                if (response?.Status === 1) {
                    UPCSubmitted('200')
                } else {
                    const message = response.ServiceResponse[0]?.Message;
                    if (message === '1003') {
                        try {
                            await handleInvalidWICAccount(response, dispatch);
                        } catch (error) {
                            console.log('handleInvalidWICAccount failed.', error)
                        }
                    }
                    else {
                        UPCSubmitted(message)
                    }
                }
                // Perform any additional actions or update the UI accordingly
            } catch (error) {
                // Handle the error
                console.error('UPC Submit Service Failed.', error);
                // Display an error message or perform any error handling logic
            }
            dispatch(setLoading(false))
        } else {
            Alert.alert(t('errorMessages.allRequiredFields'))
        }

    }
    const resetSubmit = () => {
        StartOver()
    }
    useEffect(() => {
        navigation.setOptions({
            title: t('pageText.submitUPCInfo'),
            headerTitleStyle: {
                fontSize: 18,
                color: 'white'
            }
        });
    })
    return (
        <View className="h-full w-full flex">
            {/* <View className="m-2 bg-black opacity-50 rounded-md">
                <Text className="text-white text-base py-3 text-center">3.{t('pageText.submitUPCInfo')}</Text>
            </View> */}
            <CustomTextInput label={t('labels.packageSize')} FieldType='number' value={packageSize} placeholder='Please enter package size' numericValue={true} validate={true} onChangeText={handlePackageSize} />
            <CustomTextInput label={t('labels.emailAddress')} FieldType='Email' value={email} placeholder='Enter Email Address' onChangeText={handleEmail} validate={true} />
            <PhoneNumberInput label={t('labels.phoneNumber')} FieldType='phoneNumber' value={phoneNumber} onChangeText={setPhoneNumber} validate={true} />
            <CustomTextInput label={t('labels.description')} FieldType='description' value={Description} placeholder={'Please enter Product Description'} validate={true} onChangeText={handleDescription} />

            <View className="flex-row justify-around mt-10">
                <View>
                    <Text className="text-center text-base">{t('pageText.UPCProdPicTitle')}</Text>
                    <Image style={{ height: 150, width: 100 }} source={{ uri: `data:image/jpeg;base64,${ProductPic}` }} />
                </View>
                <View>
                    <Text className="text-center text-base">{t('pageText.UPCProdPicLabel')}</Text>
                    <Image style={{ height: 150, width: 100 }} source={{ uri: `data:image/jpeg;base64,${ProductLabel}` }} />
                </View>
            </View>
            <View className="flex-row justify-center gap-5 footer absolute bottom-10 left-10">
                <CustomButton title={t('buttons.startOver')} CSSName="w-2/5" onPress={() => resetSubmit()} /><Text>&nbsp;&nbsp;&nbsp;</Text>
                <CustomButton title={t('buttons.submit')} CSSName="w-2/5" onPress={() => submitUPC()} />
            </View>
        </View>
    )
}

export default UPCSubmit