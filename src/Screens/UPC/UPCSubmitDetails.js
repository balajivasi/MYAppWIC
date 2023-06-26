import { View, Text } from 'react-native'
import React, { useState } from 'react'
import UPCSubmitProduct from './UPCSubmitProduct'
import UPCSubmitLabel from './UPCSubmitLabel'
import UPCSubmit from './UPCSubmit'

const UPCSubmitDetails = ({ navigation }) => {
    const [productPic, setProductPic] = useState();
    const [productLabel, setProductLabel] = useState();
    const [UPCSubmitStatus, setUPCSubmitStatus] = useState();
    const getProductPic = (productPic) => {
        console.log('[UPCSubmitDetails][getProductPic]')
        setProductPic(productPic)
    }
    const getProductLabel = (productLabel) => {
        console.log('[UPCSubmitDetails][productLabel]')
        setProductLabel(productLabel)
    }
    const startOver = () => {
        setProductPic(null);
        setProductLabel(null);
    }
    const UPCSubmitted = (data) => {
        console.log('UPC Submitted', data);
        setUPCSubmitStatus(data)
        navigation.push('UPCStatus', { status: data });
    }
    const showPage = () => {
        if (!productPic) {
            return <UPCSubmitProduct getProductPic={getProductPic} />;
        } else if (productPic && !productLabel) {
            return <UPCSubmitLabel getProductLabel={getProductLabel} />;
        } else {
            return <View className="w-screen"><UPCSubmit ProductPic={productPic} ProductLabel={productLabel} StartOver={startOver} UPCSubmitted={UPCSubmitted} /></View>;
        }
    }

    return (
        <>
            {showPage()}
        </>
    )
}

export default UPCSubmitDetails