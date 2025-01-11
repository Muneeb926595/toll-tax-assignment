import {StyleSheet} from 'react-native';
import {Colors, Layout} from '../../../globals';

export const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    paddingHorizontal: Layout.widthPercentageToDP(2),
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Colors.transparent,
    zIndex: 1,
  },
  backgroundImageStyle: {
    flex: 1,
  },
});
