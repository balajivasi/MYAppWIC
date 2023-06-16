import React from "react";
import { Text } from "react-native";

const ErrorText = ({ message }) => {
  return (
    <Text className="rounded-xl bg-red-100 border border-red-400 text-red-700 px-4 py-3 w-4/5 mx-auto">
      {message}
    </Text>
  );
};

export default ErrorText;
