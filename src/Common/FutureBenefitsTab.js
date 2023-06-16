import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const FutureBenefitsTab = ({ futureBenList,selectedTab, onSelectTab }) => {
  //const benefitsList = useSelector(state => state.benefitsList);
  
  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1); // JavaScript months are zero-based (0-11)
    const monthName = date.toLocaleString('default', { month: 'long' });
    return monthName;
  };

  return (
    <View className="flex-row justify-evenly">
      {futureBenList?.map((data) => {
        const isSelected = selectedTab === data.IssueMonth;
        const tabStyles = `flex text-xl p-2 border-b border-solid border-gray-500 ${isSelected ? 'font-bold' : ''}`;
        return (
          <TouchableOpacity key={data.IssueMonth} onPress={() => onSelectTab(data.IssueMonth)}>
            <Text className={tabStyles}>
              {getMonthName(data.IssueMonth)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default FutureBenefitsTab;
