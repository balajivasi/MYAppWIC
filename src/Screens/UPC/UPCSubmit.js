import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../../Common/CustomButton'
import { useTranslation } from 'react-i18next'
import CustomTextInput from '../../Common/CustomTextInput'
import { validateDescription, validateEmail, validatePackage, validatePhone } from '../../Common/FormValidation'
import PhoneNumberInput from '../../Common/PhoneNumberInput'
import { UPCSubmitService } from '../../Services/apiService'
import { useSelector } from 'react-redux'

const UPCSubmit = ({ navigation, ProductPic, ProductLabel, StartOver, UPCSubmitted, UPCCode }) => {
    const { t } = useTranslation();
    const [packageSize, setPackageSize] = useState();
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [Description, setDescription] = useState();
    const Token = useSelector(state => state.user.Token);

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

            try {
                // OldEBTCard,wicEbtNumber, birthDate, zipCode, Token
                const response = await UPCSubmitService(Token, UPCCode, Description, packageSize, email, phoneNumber, ProductPic, ProductLabel);
                // Handle the successful response
                if (response?.Status === 1) {
                    Alert.alert('Success', 'Account Verified Successfully', [{ text: 'OK', onPress: closeAddCard }]);
                } else {
                    setServerError(response.ServiceResponse[0]?.Message);
                    try {
                        await handleInvalidWICAccount(response, dispatch);
                    } catch (error) {
                        console.log('handleInvalidWICAccount failed.', error)
                    }
                }
                // Perform any additional actions or update the UI accordingly
            } catch (error) {
                // Handle the error
                console.error('Registration failed', error);
                // Display an error message or perform any error handling logic
            }

        }

    }
    const resetSubmit = () => {
        StartOver()
    }
    return (
        <View className="h-full w-full flex">
            <View className="">
                <Text>3.{t('pageText.submitUPCInfo')}</Text>
            </View>
            <CustomTextInput label={t('labels.packageSize')} FieldType='number' value={packageSize} placeholder='Please enter package size' numericValue={true} onChangeText={setPackageSize} />
            <CustomTextInput label={t('labels.emailAddress')} FieldType='Email' value={email} placeholder='Enter Email Address' onChangeText={setEmail} validate={true} />
            <PhoneNumberInput label={t('labels.phoneNumber')} value={phoneNumber} onChangeText={setPhoneNumber} />
            <CustomTextInput label={t('labels.description')} FieldType='Description' value={Description} placeholder={'Please enter Product Description'} onChangeText={setDescription} />

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