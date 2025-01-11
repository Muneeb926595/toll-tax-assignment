import { FC } from "react";
import { StyleProp, TextProps, TextStyle, ViewStyle } from "react-native";

export type Props = FC<
    TextProps & {
        emphasis?: Emphasis;
    } & {
        maxNumberOfLines?: number
    }
>;

export type SmallParagraphLinkProps = {
    style?: StyleProp<TextStyle>;
    onPress: Function;
    children?: JSX.Element;
}

export type ParagraphLinkProps = {
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<TextStyle>;
    onPress: any;
    title: JSX.Element | string;
}

export type ParagraphLinkBoldProps = {
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<TextStyle>;
    onPress: any;
    title: JSX.Element | string;
}

export enum Emphasis {
    low = 'low',
    high = 'high',
    medium = 'medium',
}