import { View, Text, TouchableOpacity, } from 'react-native'
import React from 'react'
import { PencilSquareIcon } from 'react-native-heroicons/outline'
import { useTranslation } from 'react-i18next'
const SignatureList = ({ data, selectSign }) => {
    const { t } =useTranslation()
    const onSignatureSelected = () => {
        selectSign();
    }

    return (
        <TouchableOpacity onPress={onSignatureSelected}>
            <View className="border border-orange-500 rounded-md my-2 p-5 flex-row justify-between">
                <View>
                    <Text className="text-xl pb-4">{data.DocName}</Text>
                    <Text>{data.CompletedStatus == 1 ? t('InfoMessages.SignatureIsCompleted') : t('InfoMessages.SignatureIsNotCompleted')}</Text>
                </View>
                <PencilSquareIcon color={data.CompletedStatus == 1 ? '#f97316' : '#666666'} size={50} />
            </View>
        </TouchableOpacity>
    )
}

export default SignatureList