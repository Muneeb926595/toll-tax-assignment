import {Dimensions, PixelRatio, Platform, StatusBar} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const smallFormFactorMaxHeight = 620;
const iphone13FactorMaxHeight = 844;

export const Layout = {
  divisionFactorForWidth: 4,
  divisionFactorForHeight: 8,
  window: {
    width,
    height,
    bottom: height - height * 0.86,
    top: 100,
  },
  screen: {
    headerHeight: 62,
    controlsHeight: 31,
    isOfSmallFormFactor: height < smallFormFactorMaxHeight,
    minContentHeight: height * 0.92,
  },

  /**
   * Incremental sizes
   * used for margin, padding
   */
  zero: 0,
  tiny: 2,
  micro: 5,
  mini: 10,
  small: 15,
  medium: 20,
  large: 25,
  xlarge: 27,
  xxlarge: 40,
  xxxlarge: 80,

  /**
   * Dimensional sizes in percentage
   */
  zeroWidth: '0%',
  half: '50%',
  full: '100%',

  /**
   * Loader Width
   */
  loaderWidth: '15%',
  loaderContainerWidth: '85%',

  /**
   * Width of screen
   */
  widthWithMiniPadding: '90%',

  /**
   * Position of an element
   */
  absolutePosition: 'absolute' as 'absolute',
  relativePosition: 'relative' as 'relative',

  /**
   * Shadow boxes
   */
  shadowBox: {
    lightestShadow: {
      shadowColor: '#cccccc',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 3,
    },
    lightShallow: {
      shadowColor: '#0000000A',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 2,
    },
    shallow: {
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 3,
      shadowOpacity: 0.3,
      elevation: 2,
    },
    lightDropShadow: {
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowRadius: 4,
      shadowOpacity: 0.05,
      elevation: 3,
      marginBottom: 3,
    },
    low: {
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 3,
      shadowOpacity: 0.4,
      elevation: 3,
      marginBottom: 3,
    },
    deep: {
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowRadius: 8,
      shadowOpacity: 0.6,
      elevation: 8,
    },
  },

  image: {
    small: {
      height: 30,
      width: 30,
      borderRadius: 0,
      borderWidth: 0,
    },
    medium: {
      height: 40,
      width: 40,
      borderRadius: 0,
      borderWidth: 0,
    },
  },

  isSmallDevice: width < 375,

  /**
   * Calculate App Responsive Units to make UI responsive on all of (Small And Large) devices
   */

  /**
   * Converts provided width percentage to independent pixel (dp).
   * @param  {string} widthPercent The percentage of screen's width that UI element should cover
   *                               along with the percentage symbol (%).
   * @return {number}              The calculated dp depending on current device's screen width.
   */
  widthPercentageToDP: (widthPercent: number | string) => {
    // Parse string percentage input and convert it to number.
    const elemWidth =
      typeof widthPercent === 'number'
        ? widthPercent
        : parseFloat(widthPercent);

    // Use PixelRatio.roundToNearestPixel method in order to round the layout
    // size (dp) to the nearest one that correspons to an integer number of pixels.
    return PixelRatio.roundToNearestPixel((width * elemWidth) / 100);
  },

  /**
   * Converts provided height percentage to independent pixel (dp).
   * @param  {string} heightPercent The percentage of screen's height that UI element should cover
   *                                along with the percentage symbol (%).
   * @return {number}               The calculated dp depending on current device's screen height.
   */
  heightPercentageToDP: (heightPercent: number | string) => {
    // Parse string percentage input and convert it to number.
    const elemHeight =
      typeof heightPercent === 'number'
        ? heightPercent
        : parseFloat(heightPercent);

    // Use PixelRatio.roundToNearestPixel method in order to round the layout
    // size (dp) to the nearest one that correspons to an integer number of pixels.
    return PixelRatio.roundToNearestPixel((height * elemHeight) / 100);
  },

  // guideline height for standard 5" device screen is 680
  RFValue: (fontSize: any, standardScreenHeight = iphone13FactorMaxHeight) => {
    const standardLength = width > height ? width : height;
    const offset: any =
      width > height ? 0 : Platform.OS === 'ios' ? 78 : StatusBar.currentHeight; // iPhone X style SafeAreaView size in portrait

    const deviceHeight =
      isIphoneX() || Platform.OS === 'android'
        ? standardLength - offset
        : standardLength;

    const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
    return Math.round(heightPercent);
  },
};
