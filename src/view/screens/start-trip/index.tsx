import React, { useState } from 'react'
import { magicSheet } from 'react-native-magic-sheet';
import DropDownPicker from 'react-native-dropdown-picker'
import { TouchableOpacity, Platform, View, Image } from 'react-native'
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';

import { styles } from './styles'
import { AppText, AuthInput, Button, Container, DatePickerBottomSheet } from '../../components';
import { CommonBottomSheetStyle } from '../../components/bottom-sheet-wrapper/styles';
import { Colors, Constants, ENTRY_POINTS, Images, Layout } from '../../../globals';

export const StartTripScreen = (props) => {
    const [selectedDate, setSelectedDate] = useState(new Date())

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(ENTRY_POINTS?.[0]?.value);
    const [items, setItems] = useState(ENTRY_POINTS);

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            numberPlate: '',
        }
    });

    const handleOpenCalender = async () => {
        await magicSheet.show(() => <DatePickerBottomSheet
            setSelectedDates={(values) => {
                setSelectedDate(values);
                magicSheet?.hide()
            }}
            headerTitle={"Select Date"}
        />, { ...CommonBottomSheetStyle, snapPoints: [Layout.heightPercentageToDP(56)] })
    }

    const handleSubmitTrip = (data) => {
        const payload = {
            numberPlate: data?.numberPlate,
            entryDateTime: selectedDate,
            entryInterchange: value,
        }

        props.navigation.navigate('EndTripScreen', { tripStatupPointData: payload })
    }
    return (
        <Container hasScroll insetsToHandle={['top', 'right', 'left']} screenBackgroundStyle={{ backgroundColor: Colors.background, }} containerStyles={{ backgroundColor: Colors.white, paddingHorizontal: 0 }} >
            <View style={styles.container}>
                <View style={styles.screenContent} >
                    <Image
                        source={Images.Logo}
                        resizeMode='cover'
                        style={styles.logo}
                    />

                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        multiple={false}
                        searchable={true}
                        searchPlaceholder={"Search"}
                        mode="BADGE"
                        maxHeight={Layout.heightPercentageToDP(42)}
                        placeholder={"Select Interchange"}
                        dropDownContainerStyle={{ borderWidth: 0, borderTopWidth: 1 }}
                        selectedItemContainerStyle={{ backgroundColor: Colors.surface['400'] }}
                    />

                    <Controller
                        control={control}
                        rules={{
                            required: true,
                            pattern: Constants.REGEX_NUMBER_PLATE
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <AuthInput
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                placeholder={"Number Plate (LLL-NNN)"}
                                isError={errors?.numberPlate}
                            />
                        )}
                        name="numberPlate"
                    />
                    {errors?.numberPlate && <AppText style={styles.error} >
                        Number plate is invalid please enter in following pattern ABC-343
                    </AppText>}

                    <TouchableOpacity style={[styles.datePickerContainer]} onPress={handleOpenCalender}>
                        <AppText style={{ color: selectedDate ? Colors.surface['DEFAULT'] : Colors.typography['100'], fontSize: Layout.RFValue(Platform.select({ ios: 13.4, android: 16 })) }}>
                            {dayjs(selectedDate).format(Constants.DATE_AND_TIME_FORMATE) ?? "Date Time"}
                        </AppText>
                    </TouchableOpacity>

                    <Button
                        buttonLable={"Submit"}
                        onPress={handleSubmit(handleSubmitTrip)}
                        buttonContainer={{ backgroundColor: Colors.black, marginTop: Layout.heightPercentageToDP(3) }}
                        btnLabelStyles={{ color: Colors.white }}
                    />
                </View>
            </View>
        </Container>
    )
}