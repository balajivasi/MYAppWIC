import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from "../../Context/LanguageProvider";
import { useDispatch } from 'react-redux';
import { setProfileLanguage } from '../../slices/profileSlice'
export default function Settings() {
    const { t, i18n } = useTranslation();
    const { language, updateLanguage } = useLanguage(i18n.language);
    const dispatch = useDispatch()
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language)

    const handleLanguageChange = async (value) => {
        try {
            await AsyncStorage.setItem('WICAppLanguage', value);
            setSelectedLanguage(value);
            //updateLanguage(value);
            dispatch(setProfileLanguage(value));
            i18n.changeLanguage(value);
        } catch (error) {
            console.log('Error saving language:', error);
        }
    };

    return (
        <View className="flex-col mt-10">
            <Text className="text-center text-xl">{t('version')}</Text>
            <Text className="text-center mb-10 text-2xl">v3.2(100)</Text>
            <Text className="text-center text-xl">{t('language')}</Text>
            <View>
                <Picker selectedValue={selectedLanguage} onValueChange={(value) => handleLanguageChange(value)}>
                    <Picker.Item label="Device: English(en)" value="default" />
                    <Picker.Item label="English" value="en" />
                    <Picker.Item label="Español" value="es" />
                </Picker>
            </View>
        </View>
    )
}
