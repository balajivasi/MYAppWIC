import { View, Text } from 'react-native'
import React, { useState } from 'react'
import UPCSubmitProduct from './UPCSubmitProduct'
import UPCSubmitLabel from './UPCSubmitLabel'
import UPCSubmit from './UPCSubmit'

const UPCSubmitDetails = () => {
    const [productPic, setProductPic] = useState("ass");
    const [productLabel, setProductLabel] = useState("aa");
    const [UPCCode, setUPCCode] = useState();
    const getProductPic = (productPic) => {
        console.log('[UPCSubmitDetails][getProductPic]')
        setProductPic(productPic)
    }
    const getProductLabel = (productLabel) => {
        console.log('[UPCSubmitDetails][productLabel]')
        setProductLabel(productLabel)
    }
    const startOver = () => {
        //setProductPic(null);
        // setProductLabel(null)
        console.log('Start Over')
    }
    const UPCSubmitted = () => {
        console.log('UPC Submitted');
    }
    const showPage = () => {
        if (!productPic) {
            return <UPCSubmitProduct getProductPic={getProductPic} />;
        } else if (productPic && !productLabel) {
            return <UPCSubmitLabel getProductLabel={getProductLabel} />;
        } else {
            return <View className="w-screen"><UPCSubmit ProductPic={productPic} ProductLabel={productLabel} StartOver={startOver} UPCSubmitted={UPCSubmitted} UPCCode={UPCCode} /></View>;
        }
    }

    return (
        <>
            {showPage()}
        </>
    )
}

export default UPCSubmitDetails