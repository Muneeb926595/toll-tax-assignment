import {StyleSheet} from 'react-native';
import {Layout} from '../../../globals';

export const styles = StyleSheet.create({
  sortingItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemLabel: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    marginBottom: 0,
    fontSize: Layout.RFValue(15),
  },
});
