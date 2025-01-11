import {StyleSheet} from 'react-native';
import {Colors, Layout} from '../../../globals';

export const styles = StyleSheet.create({
  container: {
    padding: Layout.widthPercentageToDP(5),
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
    paddingVertical: Layout.heightPercentageToDP(1.2),
    borderColor: Colors.surface['DEFAULT'],
    borderWidth: 1,
    paddingHorizontal: Layout.widthPercentageToDP(4),
    marginVertical: Layout.heightPercentageToDP(1),
  },
  error: {
    color: Colors.red,
    fontSize: Layout.RFValue(12),
  },
});
