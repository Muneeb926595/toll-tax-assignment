import {Platform, StyleSheet} from 'react-native';
import {Colors, Layout} from '../../../globals';

export const styles = StyleSheet.create({
  input: {
    borderRadius: Layout.widthPercentageToDP(1),
    color: Colors.surface['DEFAULT'],
    backgroundColor: Colors.background,
    paddingVertical: Layout.heightPercentageToDP(
      Platform.select({ios: Layout.small, android: Layout.mini}) /
        Layout.divisionFactorForHeight,
    ),
    borderColor: Colors.surface['DEFAULT'],
    borderWidth: 1,
    paddingHorizontal: Layout.widthPercentageToDP(
      Layout.medium / Layout.divisionFactorForWidth,
    ),
    marginVertical: Layout.heightPercentageToDP(
      Layout.micro / Layout.divisionFactorForHeight,
    ),
  },
});
