import { Dimensions, Platform, View, } from 'react-native'
import React, { useState } from 'react'
import DatePicker from 'react-native-date-picker'

import { convertDateStringToObj } from '../../../utils/timeDateUtils';
import { BottomSheetWrapper } from '../bottom-sheet-wrapper';
import { Colors, Layout } from '../../../globals';
import { Button } from '../button';

type Props = {
    headerTitle: any,
    setSelectedDates: (values) => void
}
export const DatePickerBottomSheet = ({ setSelectedDates, headerTitle, }: Props) => {
    const [value, setValue] = useState<Date>()

    const doDateChange = (date?: Date) => {
        setValue(date)
    };

    const getDefaultDOB = () => {
        const defaultDob = new Date();
        defaultDob.setFullYear(defaultDob.getFullYear());
        return defaultDob;
    }

    const handleDone = () => {
        setSelectedDates(value)
    }
    return (
        <BottomSheetWrapper headerTitle={headerTitle ?? ""}>
            <View style={{ backgroundColor: Colors.white, flex: 1, borderTopLeftRadius: Layout.widthPercentageToDP(4), borderTopRightRadius: Layout.widthPercentageToDP(4), paddingVertical: Layout.widthPercentageToDP(4) }}>
                <DatePicker
                    mode="datetime"
                    date={value ?? getDefaultDOB()}
                    onDateChange={doDateChange}
                    style={{ width: Dimensions.get('screen').width }}
                />

                <View style={{ paddingHorizontal: Layout.widthPercentageToDP(4) }}>
                    <Button
                        buttonLable={"Done"}
                        onPress={handleDone}
                        buttonContainer={{ backgroundColor: Colors.black, }}
                        btnLabelStyles={{ color: Colors.white }}
                    />
                </View>
            </View>
        </BottomSheetWrapper>
    )
}