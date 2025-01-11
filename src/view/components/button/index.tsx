import React from "react";
import { TouchableOpacity, ActivityIndicator, } from "react-native";
import { styles } from "./styles";
import { Props } from "./types";
import { AppText } from "../text";
import { Colors } from "../../../globals";

export const Button = (props: Props) => {

    const { onPress,
        buttonLable,
        buttonContainer,
        btnLabelStyles,
        loading,
        disabled,
        authenticationRequired,
        disableBgColor,
        leftIcon,
        rightIcon } = props

    const renderButtonContent = () => {
        if (loading) {
            return <ActivityIndicator color={Colors.background} />;
        }

        return (
            <>
                {leftIcon ? leftIcon : null}
                <AppText style={[styles.btnLabel, btnLabelStyles]}>{buttonLable}</AppText>
                {rightIcon ? rightIcon : null}
            </>
        );
    };

    return (
        <TouchableOpacity
            onPress={async () => {
                if (authenticationRequired) {
                    return;
                }
                onPress()
            }}
            style={[styles.buttonContainer, buttonContainer, disabled && { backgroundColor: disableBgColor ?? Colors.darkGray }]}
            disabled={disabled || loading}
        >
            {renderButtonContent()}
        </TouchableOpacity>
    );
};