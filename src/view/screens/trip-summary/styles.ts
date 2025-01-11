import {StyleSheet} from 'react-native';
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
});
