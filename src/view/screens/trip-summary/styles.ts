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

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  totalRow: {
    borderBottomWidth: 0,
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#555',
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    color: '#1e90ff',
    fontWeight: 'bold',
  },
});
