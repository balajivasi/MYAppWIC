import React, { useState, Suspense, lazy, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TabView } from 'react-native-tab-view';

import ActiveCard from '../../Common/ActiveCard';
import CustomButton from '../../Common/CustomButton';
import { useSelector } from 'react-redux';
import CurrentBenefits from './CurrentBenefits';
import FutureBenefits from './FutureBenefits';
/*
// Lazy load the components
const CurrentBenefits = lazy(() => import('./CurrentBenefits'));
const FutureBenefits = lazy(() => import('./FutureBenefits'));
*/

export default function Benefits({ navigation }) {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'CurrentBenefits', title: t('pageTitles.current') },
    { key: 'FutureBenefits', title: t('pageTitles.future') },
  ]);

  const ActiveCardNumber = useSelector(state => state.user.EBTCardNumber);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'CurrentBenefits':
        return <CurrentBenefits navigation={navigation} />;
      case 'FutureBenefits':
        return <FutureBenefits navigation={navigation} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    setIndex(0)
  }, [ActiveCardNumber])

  const renderTabBar = (props) => {
    const activeTabClass = 'flex-1 py-3 bg-blue-600';
    const inactiveTabClass = 'flex-1 py-3 bg-gray-300';
    const leftRound = "rounded-l-lg";
    const rightRound = "rounded-r-lg";
    const activeClass = "text-white text-center text-base";
    const inactiveClass = "text-black text-center text-base";

    return (
      <View className="flex-row w-11/12 mx-auto mt-2 rounded-s-lg">
        {props.navigationState.routes.map((route, index) => {
          const classNames = index === props.navigationState.index ? activeClass : inactiveClass;
          let tabClass = index === props.navigationState.index ? activeTabClass : inactiveTabClass;

          if (route.title === 'Current') {
            tabClass = `${tabClass} ${leftRound}`;
          } else if (route.title === 'Future') {
            tabClass = `${tabClass} ${rightRound}`;
          }

          return (
            <TouchableOpacity className={tabClass} key={index} onPress={() => props.jumpTo(route.key)}>
              <Text className={classNames}>{route.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View className="h-full w-full mx-auto flex-col">

      <CustomButton title={t('buttons.UPCScan')} CSSName="w-3/4 mx-auto" />
      <ActiveCard />
    </View>
  );
}
