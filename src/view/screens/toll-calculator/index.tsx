import { Text, TextInput, Alert, SafeAreaView, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import { AppText, AuthInput, Button, Container, DatePickerBottomSheet } from '../../components';
import { magicSheet } from 'react-native-magic-sheet';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker'
import { CommonBottomSheetStyle } from '../../components/bottom-sheet-wrapper/styles';
import { Colors, Constants, Layout } from '../../../globals';
import { getSelectedDateRangeLabelFromSelectedDates } from '../../../utils/timeDateUtils';
import { Controller, useForm } from 'react-hook-form';

// Constants
const ENTRY_POINTS = [
    { label: 'Zero Point', value: 0 },
    { label: 'NS Interchange', value: 5 },
    { label: 'Ph4 Interchange', value: 10 },
    { label: 'Ferozpur Interchange', value: 17 },
    { label: 'Lake City Interchange', value: 24 },
    { label: 'Raiwand Interchange', value: 29 },
    { label: 'Bahria Interchange', value: 34 },
];

const WEEKEND_MULTIPLIER = 1.5;
const BASE_RATE = 20;
const PER_KM_RATE = 0.2;
const DISCOUNT_DAYS = {
    even: ['Mon', 'Wed'],
    odd: ['Tue', 'Thu'],
};
const HOLIDAY_DATES = ['03-23', '08-14', '12-25']; // MM-DD format

export const TollCalculatorScreen = () => {
    const [numberPlate, setNumberPlate] = useState('');
    const [entryPoint, setEntryPoint] = useState(0);
    const [exitPoint, setExitPoint] = useState(0);
    const [entryDate, setEntryDate] = useState('');
    const [exitDate, setExitDate] = useState('');
    const [selectedDates, setSelectedDates] = useState(undefined)

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const calculateToll = () => {
        // Validation
        if (!numberPlate.match(/^[A-Z]{3}-\d{3}$/)) {
            Alert.alert('Error', 'Invalid number plate format. Use LLL-NNN.');
            return;
        }

        if (entryPoint === exitPoint) {
            Alert.alert('Error', 'Entry and exit points cannot be the same.');
            return;
        }

        if (!entryDate || !exitDate) {
            Alert.alert('Error', 'Entry and exit dates are required.');
            return;
        }

        // Parse dates
        const entryDateObj = new Date(entryDate);
        const exitDateObj = new Date(exitDate);

        const entryDay = entryDateObj.toLocaleString('en-US', { weekday: 'short' });
        const exitDay = exitDateObj.toLocaleString('en-US', { weekday: 'short' });
        const exitDayMultiplier = ['Sat', 'Sun'].includes(exitDay) ? WEEKEND_MULTIPLIER : 1;

        // Distance
        const distance = Math.abs(exitPoint - entryPoint);
        let cost = BASE_RATE + distance * PER_KM_RATE * exitDayMultiplier;

        // Discount on specific days
        const plateNumber = parseInt(numberPlate.split('-')[1], 10);
        const isEvenPlate = plateNumber % 2 === 0;
        const entryDateFormatted = `${entryDateObj.getMonth() + 1}-${entryDateObj.getDate()}`;

        if (HOLIDAY_DATES.includes(entryDateFormatted)) {
            cost *= 0.5; // 50% discount on holidays
        } else if (DISCOUNT_DAYS.even.includes(entryDay) && isEvenPlate) {
            cost *= 0.9; // 10% discount for even plates
        } else if (DISCOUNT_DAYS.odd.includes(entryDay) && !isEvenPlate) {
            cost *= 0.9; // 10% discount for odd plates
        }

        return cost.toFixed(2);
    };

    // const handleSubmit = async () => {
    //     const totalCost = calculateToll();

    //     if (!totalCost) return;

    //     const data = {
    //         EntryDateTime: entryDate,
    //         NumberPlate: numberPlate,
    //         EntryInterchange: ENTRY_POINTS.find(point => point.value === entryPoint)?.label,
    //         TripStatus: 'Completed',
    //         ExitDateTime: exitDate,
    //         ExitInterchange: ENTRY_POINTS.find(point => point.value === exitPoint)?.label,
    //         TotalCostTrip: totalCost,
    //     };

    //     try {
    //         await axios.post('https://crudcrud.com/api/0de6f86092554f1a984f644dc24fb0f5/trips', data);
    //         Alert.alert('Success', 'Trip data submitted successfully.');
    //     } catch (error) {
    //         Alert.alert('Error', 'Failed to submit trip data.');
    //         console.error(error);
    //     }
    // };

    const handleOpenCalender = async () => {
        await magicSheet.show(() => <DatePickerBottomSheet
            setSelectedDates={(values) => {
                setSelectedDates(values);
                magicSheet?.hide()
            }}
            headerTitle={"selectDateOfBirth"}
        />, { ...CommonBottomSheetStyle, snapPoints: [Layout.heightPercentageToDP(56)] })
    }
    return (
        <Container hasScroll insetsToHandle={['top', 'right', 'left']} screenBackgroundStyle={{ backgroundColor: Colors.background, }} containerStyles={{ backgroundColor: Colors.white, paddingHorizontal: 0 }} >
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <AuthInput
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder={"Number Plate (LLL-NNN)"}
                        isError={errors?.email}
                    />
                )}
                name="email"
            />
            {errors?.email && <AppText style={styles.error} >
                Number plate is invalid
            </AppText>}


            <Text style={styles.label}>Entry Point:</Text>
            {/* <Picker selectedValue={entryPoint} onValueChange={setEntryPoint}>
        {ENTRY_POINTS.map(point => (
          <Picker.Item key={point.value} label={point.label} value={point.value} />
        ))}
      </Picker>

      <Text style={styles.label}>Exit Point:</Text>
      <Picker selectedValue={exitPoint} onValueChange={setExitPoint}>
        {ENTRY_POINTS.map(point => (
          <Picker.Item key={point.value} label={point.label} value={point.value} />
        ))}
      </Picker> */}

            <Text style={styles.label}>Entry Date (YYYY-MM-DD):</Text>
            <TextInput
                style={styles.input}
                value={entryDate}
                onChangeText={setEntryDate}
                placeholder="2024-01-01"
            />

            <TouchableOpacity style={[styles.datePickerContainer]} onPress={handleOpenCalender}>
                <AppText style={{ color: selectedDates ? Colors.surface['DEFAULT'] : Colors.typography['100'], fontSize: Layout.RFValue(Platform.select({ ios: 13.4, android: 16 })) }}>
                    {getSelectedDateRangeLabelFromSelectedDates(selectedDates) ?? "dateOfBirthWithSterek"}
                </AppText>
            </TouchableOpacity>

            <Text style={styles.label}>Exit Date (YYYY-MM-DD):</Text>
            <TextInput
                style={styles.input}
                value={exitDate}
                onChangeText={setExitDate}
                placeholder="2024-01-01"
            />

            <Button
                buttonLable={"Submit Trip"}
                //   loading={loading}
                //   onPress={handleSubmit(handleLogin)}
                onPress={() => { }}
                buttonContainer={{ backgroundColor: Colors.black, marginTop: -Layout.heightPercentageToDP(1) }}
                btnLabelStyles={{ color: Colors.white }}
            />
        </Container>
    )
}