import {Platform, StyleSheet} from 'react-native';
import {Colors, Constants, Layout} from '../../../globals';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  screenContent: {
    flex: 1,
    paddingHorizontal: Constants.DEFAULT_APP_PADDING,
  },
  logo: {
    width: Layout.widthPercentageToDP(70),
    height: Layout.widthPercentageToDP(32),
    alignSelf: 'center',
  },
  label: {
    fontSize: Layout.RFValue(16),
    marginVertical: Layout.heightPercentageToDP(1.2),
  },
  input: {
    borderWidth: 1,
    padding: Layout.widthPercentageToDP(2),
    borderRadius: Layout.widthPercentageToDP(1),
  },
  datePickerContainer: {
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
  },
  error: {
    color: Colors.red,
    fontSize: Layout.RFValue(12),
  },
});
