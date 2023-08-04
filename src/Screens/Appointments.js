import { View, Text, ScrollView, TouchableOpacity, Linking, RefreshControl } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AppointmentsService } from '../Services/apiService';
import { ExclamationTriangleIcon, MapPinIcon, PhoneIcon } from "react-native-heroicons/outline";
import ActiveCard from '../Common/ActiveCard';
import { formatDate, formatTime } from '../Common/DateFormat'
import { handleInvalidWICAccount } from '../Common/handleInvalidWICAccount';
import { setLoading } from '../slices/loaderSlice';

export default function Appointments({ navigation }) {
  const Token = useSelector(state => state.user.Token);
  const ActiveCardNumber = useSelector(state => state.user.EBTCardNumber);
  const Appointments = useSelector(state => state.preData.Appointments);
  const [appointments, setAppointments] = useState(Appointments);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const loadAppointments = async () => {
    dispatch(setLoading(true));
    try {
      const response = await AppointmentsService(Token);
      console.log('loadAppointments', response)
      // Handle the successful response
      if (response?.Status === 1) {
        setAppointments(response.ServiceResponse);
      } else {
        try {
          await handleInvalidWICAccount(response, dispatch);
        } catch (error) {
          console.log('handleInvalidWICAccount failed.', error)
        }
      }
      setRefreshing(false)
      dispatch(setLoading(false));
    } catch (error) {
      console.error('Registration failed', error);
      setRefreshing(false)
      dispatch(setLoading(false));
    }

  }
  useEffect(() => {
    setAppointments(Appointments)
  }, [Appointments])

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadAppointments();
  }, []);

  const List = ({ name, time }) => {
    return (<View className="border flex-row justify-between mt-4 border-gray-300 p-5 rounded-md">
      <Text className="text-lg capitalize">{name}</Text>
      <Text className="text-lg">{formatTime(time)}</Text>
    </View>)
  };
  return (
    <View className="min-h-full">
      <ScrollView className="flex-1" refreshControl={<RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />}>
        {(appointments && appointments.length > 0) ? <View className=" w-11/12 mx-auto mt-4">
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
          {appointments?.map((client, index) => <List key={index} name={client.ClientName} time={client.StartTime} />)}
        </View>
          : <View className="w-screen pt-16" style={{ alignItems: "center" }}>
            <ExclamationTriangleIcon size={150} color={'gray'} />
            <Text className="text-center text-red-500">{t('pageText.noAppointments')}</Text>
          </View>
        }
      </ScrollView>
      <ActiveCard />
    </View>
  )
}