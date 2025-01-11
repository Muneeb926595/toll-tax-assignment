import React, { useState } from 'react'
import { magicSheet } from 'react-native-magic-sheet';
import { View, Image } from 'react-native'

import { styles } from './styles'
import { AppText, AuthInput, Button, Container, DatePickerBottomSheet } from '../../components';
import { CommonBottomSheetStyle } from '../../components/bottom-sheet-wrapper/styles';
import { Colors, Constants, ENTRY_POINTS, Images, Layout } from '../../../globals';

export const TripSummaryScreen = (props) => {
    console.log("props", props?.route?.params)
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

    return (
        <Container hasScroll insetsToHandle={['top', 'right', 'left']} screenBackgroundStyle={{ backgroundColor: Colors.background, }} containerStyles={{ backgroundColor: Colors.white, paddingHorizontal: 0 }} >
            <View style={styles.container}>
                <View style={styles.screenContent} >
                    <Image
                        source={Images.Logo}
                        resizeMode='cover'
                        style={styles.logo}
                    />

                    <Button
                        buttonLable={"Start New Trip"}
                        onPress={() => props.navigation.navigate('StartTripScreen')}
                        buttonContainer={{ backgroundColor: Colors.black, marginTop: Layout.heightPercentageToDP(3) }}
                        btnLabelStyles={{ color: Colors.white }}
                    />
                </View>
            </View>
        </Container>
    )
}