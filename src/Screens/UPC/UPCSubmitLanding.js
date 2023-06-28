import { View } from 'react-native'
import React, { useState } from 'react'
import UPCSubmitProduct from './UPCSubmitProduct'
import UPCSubmitLabel from './UPCSubmitLabel'
import UPCSubmit from './UPCSubmit'

const UPCSubmitLanding = ({ navigation }) => {
    const [productPic, setProductPic] = useState();
    const [productLabel, setProductLabel] = useState();
    const [UPCSubmitStatus, setUPCSubmitStatus] = useState();
    const getProductPic = (productPic) => {
        setProductPic(productPic)
    }
    const getProductLabel = (productLabel) => {
        setProductLabel(productLabel)
    }
    const startOver = () => {
        setProductPic(null);
        setProductLabel(null);
    }
    const UPCSubmitted = (data) => {
        setUPCSubmitStatus(data)
        navigation.push('UPCSubmitStatus', { UPCSubmittedStatus: data });
    }
    const showPage = () => {
        if (!productPic) {
            return <UPCSubmitProduct getProductPic={getProductPic} navigation={navigation} />;
        } else if (productPic && !productLabel) {
            return <UPCSubmitLabel getProductLabel={getProductLabel} navigation={navigation} />;
        } else {
            return <View className="w-screen"><UPCSubmit ProductPic={productPic} navigation={navigation} ProductLabel={productLabel} StartOver={startOver} UPCSubmitted={UPCSubmitted} /></View>;
        }
    }

    return (
        <>
            {showPage()}
        </>
    )
}

export default UPCSubmitLanding