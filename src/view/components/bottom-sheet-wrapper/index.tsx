import { View, } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { magicSheet } from 'react-native-magic-sheet'
import { AppText } from '../text'
import { backArrowIcon, Colors } from '../../../globals'
import { SvgXml } from 'react-native-svg'

type Props = {
    children: any,
    headerTitle: string
}

export const BottomSheetWrapper = ({ children, headerTitle, }: Props) => {
    const handleCloseBottomSheet = () => {
        magicSheet.hide()
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <TouchableOpacity onPress={handleCloseBottomSheet}>
                    <SvgXml
                        xml={backArrowIcon}
                        width={24}
                        height={20}
                        color={Colors.black}
                        fill={Colors.black}
                        stroke={Colors.black}
                    />
                </TouchableOpacity>
                <AppText style={styles.heading}>
                    {headerTitle}
                </AppText>
            </View>

            {children}
        </View>
    )
}