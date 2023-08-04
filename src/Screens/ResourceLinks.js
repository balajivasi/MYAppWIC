import { View, Text, Linking, ScrollView } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function ResourceLinks() {
  const { t } = useTranslation();
  return (
    <View className="min-h-full w-10/12 mx-auto">
      <ScrollView className="mt-5">
        <Text className="my-2 text-base text-blue-600" onPress={() => Linking.openURL('https://google.com')}>{t('FLResource.IncomeGuide')}</Text>
        <Text className="my-2 text-base text-blue-600" onPress={() => Linking.openURL('https://google.com')}>{t('FLResource.ContactInfo')}</Text>
        <Text className="my-2 text-base text-blue-600" onPress={() => Linking.openURL('https://google.com')}>{t('FLResource.PrescreenTool')}</Text>
        <Text className="my-2 text-base text-blue-600" onPress={() => Linking.openURL('https://google.com')}>{t('FLResource.Foods')}</Text>
        <Text className="my-2 text-base text-blue-600" onPress={() => Linking.openURL('https://google.com')}>{t('FLResource.EligibilityInfo')}</Text>
        <Text className="my-2 text-base text-blue-600" onPress={() => Linking.openURL('https://google.com')}>{t('FLResource.Training')}</Text>
        <Text className="my-2 text-base text-blue-600" onPress={() => Linking.openURL('https://google.com')}>{t('FLResource.Works')}</Text>
        <Text className="my-2 text-base text-blue-600" onPress={() => Linking.openURL('https://www.floridahealth.gov/programs-and-services/wic/_documents/nds-eng-spa-hai.pdf')}>{t('FLResource.Statement')}</Text>
      </ScrollView>
      <View className="mx-auto mb-10">
        <Text className="mt-8 text-2xl text-center">{t('FLResource.AppCustSer')}</Text>
        <Text className="my-2 mx-auto text-base text-blue-600" onPress={() => Linking.openURL('tel:+18003423556')}>Phone: 1-800-342-3556</Text>
        <Text className="my-2 text-2xl text-center">{t('FLResource.EBTCustSer')}</Text>
        <Text className="my-2 mx-auto text-base text-blue-600" onPress={() => Linking.openURL('tel:+18666291095')}>Phone: 1-866-629-1095</Text>
      </View>
    </View>
  )
}