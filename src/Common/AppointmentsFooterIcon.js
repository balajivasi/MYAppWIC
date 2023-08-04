import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { CalendarDaysIcon, CalendarIcon } from "react-native-heroicons/outline";
import { useSelector } from "react-redux";
import { dayOfMonth, monthName } from "./DateFormat";

const AppointmentsFooterIcon = ({ title, onPress, CSSName, ImgSrc }) => {
    const Appointments = useSelector(state => state.preData.Appointments);
    const [date, setDate] = useState();
    const [month, setMonth] = useState();

    useEffect(() => {
        if (Appointments.length > 0) {
            setMonth(monthName(Appointments[0]?.StartTime))
            setDate(dayOfMonth(Appointments[0]?.StartTime))
        }
    }, [Appointments])

    if (Appointments.length != 0) {
        const buttonStyle = `border w-1/3 py-0 border-gray-300 rounded-sm  ${CSSName}`;
        return (
            <TouchableOpacity className={buttonStyle} onPress={onPress}>
                <View className="mx-auto"><CalendarIcon size={70} color={'#339900'} />
                    <View className="absolute top-7 -left-6 w-28"><Text className="text-lg text-emerald-800 text-center">{date}</Text></View>
                    <View className="absolute -left-5 top-3 w-28"><Text className="text-xs text-red-600 text-center">{month}</Text></View>
                </View>
                <Text className="text-base text-center">{title}</Text>
            </TouchableOpacity>
        );
    } else {
        const buttonStyle = `border w-1/3 py-5 border-gray-300 rounded-sm  ${CSSName}`;
        return (
            <TouchableOpacity className={buttonStyle} onPress={onPress}>
                <View className="mx-auto"><CalendarDaysIcon size={40} color={'#339900'} /></View>
                <Text className="text-base pt-2 text-center">{title}</Text>
            </TouchableOpacity>
        );
    }
};

export default AppointmentsFooterIcon;
