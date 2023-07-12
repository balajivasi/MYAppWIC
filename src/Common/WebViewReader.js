import React from 'react'
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

export const WebViewReader = (Data) => {
    const HTMLContent = Data.Data;
    const { width } = useWindowDimensions();
    return (<RenderHtml source={{ html: HTMLContent }} contentWidth={width} className="text-xl" />);
}
