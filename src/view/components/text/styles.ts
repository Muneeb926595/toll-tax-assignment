// https://material.io/design/typography/the-type-system.html#type-scale

import {StyleSheet} from 'react-native';

import {Colors} from '../../../globals';

export const styles = StyleSheet.create({
  button: {
    fontSize: 14,
    letterSpacing: 1.25,
    fontWeight: '500',
  },
  heading6: {
    fontSize: 20,
    letterSpacing: 0.15,
    fontWeight: '500',
  },
  paragraph: {
    color: Colors.foreground,
  },
});

export const StyledTextStyles = styles;
