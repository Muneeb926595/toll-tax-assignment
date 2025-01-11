import React from 'react';
import { ColorValue, StyleSheet, Text, } from 'react-native';
import { styles } from './styles';
import { Emphasis, Props } from './types';


// https://material.io/design/color/text-legibility.html#text-backgrounds
const handleEmphasis = (emph?: Emphasis): ColorValue => {
  switch (emph) {
    case 'low':
      return '#00000061'; // 38%
    case 'high':
      return '#000000DE'; // 87%
    case 'medium':
      return '#00000099'; // 60%
    default:
      return '#000000DE';
  }
};

export const AppText: Props = (props) => {
  const style = StyleSheet.compose(
    [styles.paragraph, { color: handleEmphasis(props.emphasis), }],
    props.style
  );
  return (
    <Text {...props} allowFontScaling={false} style={style}>
      {props.children}
    </Text>
  );
};