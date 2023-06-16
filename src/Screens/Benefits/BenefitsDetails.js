import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';

const BenefitsDetails = ({ route, navigation }) => {
  const { t } = useTranslation()
  const { Benefit } = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: Benefit.FoodShoppingListDescription,
    });
  }, [navigation]);

  return (
    <ScrollView className="h-fit ">
      <View className="w-11/12 mx-auto">
        <Text className="text-xl">{Benefit.FoodDescription}</Text>
        <Text className="text-base">{t('pageText.issuedQuantity')} {Benefit.IssuedQuantity} {Benefit.FoodPackageSize}</Text>
        <Text className="text-base mb-2">{t('pageText.issuedQuantity')} {Benefit.RemainingQuantity} {Benefit.FoodPackageSize}</Text>
        <Image source={require("../../../assets/Benefits_content/content_05.png")} style={{ resizeMode: 'contain', width: '100%' }} />
      </View>
    </ScrollView>
  )
}

export default BenefitsDetails