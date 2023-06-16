import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useSelector } from "react-redux";

const Spinner = () => {
  const loading = useSelector((state) => state.loader.isLoading);

  if (loading) {
    return (<View className="min-h-screen absolute justify-center text-center min-w-full bg-black opacity-40" >
      <ActivityIndicator size="large" color="red" />
    </View>)
  } else {
    return null
  }
};

export default Spinner;
