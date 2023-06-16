import { View, Text,Linking, ScrollView } from 'react-native'
import React from 'react'

export default function ResourceLinks() {
  return (
    <View className="min-h-full w-10/12 mx-auto">
      <ScrollView className="mt-5">
        <Text className="my-2 text-base text-blue-600" onPress={()=> Linking.openURL('https://google.com')}>WIC Income Guidelines</Text>
        <Text className="my-2 text-base text-blue-600" onPress={()=> Linking.openURL('https://google.com')}>WIC Contact Information</Text>
        <Text className="my-2 text-base text-blue-600" onPress={()=> Linking.openURL('https://google.com')}>WIC Prescreen Tool</Text>
        <Text className="my-2 text-base text-blue-600" onPress={()=> Linking.openURL('https://google.com')}>Florida WIC Foods</Text>
        <Text className="my-2 text-base text-blue-600" onPress={()=> Linking.openURL('https://google.com')}>WIC Eligibility Information</Text>
        <Text className="my-2 text-base text-blue-600" onPress={()=> Linking.openURL('https://google.com')}>WIChealth Online Training</Text>
        <Text className="my-2 text-base text-blue-600" onPress={()=> Linking.openURL('https://google.com')}>How WIC Works</Text>
        <Text className="my-2 text-base text-blue-600" onPress={()=> Linking.openURL('https://google.com')}>Nondiscrimination Statement</Text>
      </ScrollView>
      <View className="mx-auto mb-10">
          <Text className="mt-8 text-2xl">WIC App Customer Service</Text>
          <Text className="my-2 mx-auto text-base text-blue-600" onPress={()=> Linking.openURL('tel:+1123456789')}>Phone: 1-800-342-3556</Text>
          <Text className="my-2 text-2xl">WIC EBT Customer Service</Text>
          <Text className="my-2 mx-auto text-base text-blue-600" onPress={()=> Linking.openURL('tel:+1123456789')}>Phone: 1-866-629-1095</Text>
      </View>
    </View>
  )
}