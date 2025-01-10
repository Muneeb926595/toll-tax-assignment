/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,

} from 'react-native';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);


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

function App(): React.JSX.Element {
  const [numberPlate, setNumberPlate] = useState('');
  const [entryPoint, setEntryPoint] = useState(0);
  const [exitPoint, setExitPoint] = useState(0);
  const [entryDate, setEntryDate] = useState('');
  const [exitDate, setExitDate] = useState('');

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

  const handleSubmit = async () => {
    const totalCost = calculateToll();

    if (!totalCost) return;

    const data = {
      EntryDateTime: entryDate,
      NumberPlate: numberPlate,
      EntryInterchange: ENTRY_POINTS.find(point => point.value === entryPoint)?.label,
      TripStatus: 'Completed',
      ExitDateTime: exitDate,
      ExitInterchange: ENTRY_POINTS.find(point => point.value === exitPoint)?.label,
      TotalCostTrip: totalCost,
    };

    try {
      await axios.post('https://crudcrud.com/api/0de6f86092554f1a984f644dc24fb0f5/trips', data);
      Alert.alert('Success', 'Trip data submitted successfully.');
    } catch (error) {
      Alert.alert('Error', 'Failed to submit trip data.');
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Number Plate (LLL-NNN):</Text>
      <TextInput
        style={styles.input}
        value={numberPlate}
        onChangeText={setNumberPlate}
        placeholder="ABC-123"
      />

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

      <Text style={styles.label}>Exit Date (YYYY-MM-DD):</Text>
      <TextInput
        style={styles.input}
        value={exitDate}
        onChangeText={setExitDate}
        placeholder="2024-01-01"
      />

      <Button title="Submit Trip" onPress={handleSubmit} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, marginVertical: 10 },
  input: { borderWidth: 1, padding: 8, borderRadius: 4 },
});

export default App;
