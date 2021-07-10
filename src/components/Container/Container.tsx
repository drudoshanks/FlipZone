import { useTheme } from '@shopify/restyle';
import React, { ReactNode } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Overlay } from "react-native-elements";

export interface ContainerProps {
    children: ReactNode,
    isLoading?: boolean
}

export function Container({ children, isLoading = false }: ContainerProps) {
    const theme = useTheme();
    const { mainBackground, mainText } = theme.colors;
    return (
        <View style={{ backgroundColor: mainBackground, flex: 1 }}>
            <Overlay isVisible={isLoading} >
                <View style={{ padding: 24 }}>
                    <ActivityIndicator size="large" color={'black'} />
                </View>
            </Overlay>
            {children}
        </View>
    );
}
