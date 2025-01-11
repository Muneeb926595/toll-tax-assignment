import {StyleSheet} from 'react-native';
import {Colors, Layout} from '../../../globals';

export const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: Layout.heightPercentageToDP(1),
    width: '100%',
    backgroundColor: Colors.surface[100],
    paddingVertical: Layout.heightPercentageToDP(1),
    borderRadius: Layout.widthPercentageToDP(1),
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  btnLabel: {
    textAlign: 'center',
    color: Colors.background,
    fontSize: Layout.RFValue(15.5),
  },
});
