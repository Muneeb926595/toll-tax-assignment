import React, { useState } from 'react';
import { StyleProp, TextInput, ViewStyle, } from 'react-native';
import { styles } from './styles';
import { FieldError } from 'react-hook-form';
import { Colors, } from '../../../globals';

type Props = {
    placeholder?: string,
    onChange: (value: any) => void,
    value: string,
    onBlur: any,
    isError?: boolean | FieldError,
    customStyles?: StyleProp<ViewStyle>
}

export const AuthInput = ({ placeholder, onChange, value, onBlur, isError, customStyles }: Props) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (e) => {
        onBlur(e)
        setIsFocused(false);
    };

    const getInputBorderColor = () => {
        return isError ? Colors.red : isFocused ? Colors.brand['DEFAULT'] : Colors.surface['DEFAULT']
    }
    const getInputBackgroundColor = () => {
        return isError ? `${Colors.red}20` : Colors.transparent
    }


    return (
        <TextInput
            value={value}
            onChangeText={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholderTextColor={isError ? Colors.red : Colors.typography['100']}
            placeholder={placeholder}
            style={[
                styles.input,
                {
                    borderColor: getInputBorderColor(),
                    backgroundColor: getInputBackgroundColor(),
                },
                customStyles
            ]}
        />
    );
};