import {TextStyle, ViewStyle} from 'react-native';
import {StyleProp} from 'react-native/types';

export type Props = {
  onPress: () => void;
  buttonLable: string;
  buttonContainer?: StyleProp<ViewStyle>;
  btnLabelStyles?: StyleProp<TextStyle>;
  loading?: boolean;
  rightIcon?: React.ReactElement;
  leftIcon?: React.ReactElement;
  disabled?: boolean;
  authenticationRequired?: boolean;
  disableBgColor?: string;
};
