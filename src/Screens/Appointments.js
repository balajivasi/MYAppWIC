import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AppointmentsService } from '../Services/apiService';
import { MapPinIcon, PhoneIcon } from "react-native-heroicons/outline";
import ActiveCard from '../Common/ActiveCard';
import { formatDate, formatTime } from '../Common/DateFormat'
import { handleInvalidWICAccount } from '../Common/handleInvalidWICAccount';

export default function Appointments({navigation}) {
  const Token = useSelector(state => state.user.Token);
  const [appointments, setAppointments] = useState();
  const { t } = useTranslation();
  const ActiveCardNumber = useSelector(state => state.user.EBTCardNumber);
  const dispatch= useDispatch();

  const loadAppointments = async () => {
    try {
      const response = await AppointmentsService(Token);
      // Handle the successful response
      if (response?.Status === 1) {
        response.ServiceResponse.length != 0 && setAppointments(response.ServiceResponse);
      } else {
        try {
          await handleInvalidWICAccount(response,dispatch);
        } catch (error) {
          console.log('handleInvalidWICAccount failed.',error)
        }
      }
    } catch (error) {
      console.error('Registration failed', error);
    }

  }
  useEffect(() => {
    loadAppointments()
  }, [ActiveCardNumber])


  const List = ({ name, time }) => {
    return (<View className="border flex-row justify-between mt-4 border-gray-300 p-5 rounded-md">
      <Text className="text-lg capitalize">{name}</Text>
      <Text className="text-lg">{formatTime(time)}</Text>
    </View>)
  };
  return (
    <View className="min-h-full">
      <ScrollView className="flex-1">
        {appointments ? <View className=" w-11/12 mx-auto mt-4">
          <View className="border p-2 rounded-md border-gray-300">
            <Text className="text-xl font-bold mb-5">{appointments[0]?.Clinic}</Text>
            <View className="flex-row justify-between mb-5">
              <View className="w-3/5">
                <Text className="text-base pb-1">{appointments[0]?.ClinicAddress}</Text>
                <Text className="text-base">{appointments[0]?.ClinicAddress2}</Text>
              </View>
              <View className="flex-row gap-6 justify-between">
                <MapPinIcon size={35} />
                <TouchableOpacity onPress={() => Linking.openURL(`tel:{${appointments[0]?.ClinicPhoneNumber}'}`)}>
                  <PhoneIcon size={35} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="w-4/5 mx-auto mb-5 mt-3 rounded-lg p-3 bg-blue-800">
            <Text className="text-center text-2xl text-white">{t('pageText.NextAppointmentOn')} {'\n'} {formatDate(appointments[0]?.StartTime)}</Text>
          </View>
          {appointments.map((client, index) => <List key={index} name={client.ClientName} time={client.StartTime} />)}
        </View>
          : <Text className="text-red-500 text-lg w-11/12 mx-auto mt-10">{t('pageText.noAppointments')}</Text>
        }
      </ScrollView>
      <ActiveCard />
    </View>
  )
}