import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Bars3Icon } from "react-native-heroicons/outline";
const MenuIcon = ({navigation}) => {
  return ( <TouchableOpacity onPress={() => navigation.openDrawer()} ><Bars3Icon color={"#fff"} size={33} /></TouchableOpacity>
  )
}

export default MenuIcon