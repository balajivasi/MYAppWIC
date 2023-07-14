import moment from 'moment';
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

const FutureBenefitsTab = ({ futureBenList, selectedTab, onSelectTab, StartDate, EndDate }) => {
  const sortedFutureBenList = futureBenList.sort((a, b) => parseInt(a.IssueMonth) - parseInt(b.IssueMonth));
  const getStartDate = (monthNumber) => {
    var startDate;
    var endDate;
    if (StartDate) {
      const [month, day, year] = StartDate?.split('/');
      startDate = `${monthNumber}/${day}/${year}`;
    }

    var currentDate = moment(startDate, 'M/D/YYYY');
    //var futureDay = moment(currentDate).add(30, 'd');
    var futureMonth = moment(currentDate).add(1, 'M').subtract(1, 'd');
    return `${currentDate.format('M/D/YYYY')}-${futureMonth.format('M/D/YYYY')}`;
  }
  return (
    <View className="flex-row justify-evenly"><ScrollView horizontal={true}>
      {sortedFutureBenList?.map((data) => {
        const isSelected = selectedTab === data.IssueMonth;
        const tabStyles = `flex text-xs p-4 border-b border-solid border-gray-500 ${isSelected ? 'font-bold' : ''}`;
        return (
          <TouchableOpacity key={data.IssueMonth} onPress={() => onSelectTab(data.IssueMonth)}>
            <Text className={tabStyles}>
              {getStartDate(data.IssueMonth)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView></View>
  );
};

export default FutureBenefitsTab;
