import React, { useRef } from 'react';
import { View, Button } from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';

const Sign = ({ onOK, onClear }) => {
  const ref = useRef();

  const handleSignature = signature => {
    const base64Data = signature.replace('data:image/png;base64,', '');
    onOK(base64Data);
  };

  const handleClear = () => {
    ref.current.clearSignature();
    onClear();
  }
  const handleConfirm = () => {
    ref.current.readSignature();
  }
  return (
    <View className="flex h-40 w-full">
      <SignatureScreen
        ref={ref}
        onOK={handleSignature}
        className="w-full"
      />
      <View className="flex-row justify-between">
        <Button
          title="Clear"
          onPress={handleClear}
        />
        <Button
          title="Confirm"
          onPress={handleConfirm}
        />
      </View>
    </View>
  );
}

export default Sign;
