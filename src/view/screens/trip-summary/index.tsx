import React from 'react'
import { View, Image } from 'react-native'

import { styles } from './styles'
import { AppText, Button, Container, } from '../../components';
import { Colors, Images, Layout } from '../../../globals';

export const TripSummaryScreen = (props) => {
    const { baseRate, discount, distanceCost, subTotal, totalCost } = props?.route?.params?.summary;

    return (
        <Container hasScroll insetsToHandle={['top', 'right', 'left']} screenBackgroundStyle={{ backgroundColor: Colors.background, }} containerStyles={{ backgroundColor: Colors.white, paddingHorizontal: 0 }} >
            <View style={styles.container}>
                <View style={styles.screenContent} >
                    <Image
                        source={Images.Logo}
                        resizeMode='cover'
                        style={styles.logo}
                    />


                    <AppText style={styles.title}>Toll Report</AppText>
                    <View style={styles.row}>
                        <AppText style={styles.label}>Base Rate:</AppText>
                        <AppText style={styles.value}>{baseRate}</AppText>
                    </View>
                    <View style={styles.row}>
                        <AppText style={styles.label}>Distance Cost:</AppText>
                        <AppText style={styles.value}>{distanceCost}</AppText>
                    </View>
                    <View style={styles.row}>
                        <AppText style={styles.label}>Sub Total:</AppText>
                        <AppText style={styles.value}>{subTotal}</AppText>
                    </View>
                    <View style={styles.row}>
                        <AppText style={styles.label}>Discount:</AppText>
                        <AppText style={styles.value}>- {discount}</AppText>
                    </View>
                    <View style={[styles.row, styles.totalRow]}>
                        <AppText style={styles.label}>Total Cost:</AppText>
                        <AppText style={styles.totalValue}>{totalCost}</AppText>
                    </View>

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