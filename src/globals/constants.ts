import {Layout} from './layout';

class _Constants {
  /**
   * Durations in millisecs
   */
  readonly duration = {
    extraShort: 250,
    short: 500,
    medium: 1000,
    long: 2000,
    extraLong: 6000,
  };

  readonly REGEX_NUMBER_PLATE = /^[A-Z]{3}-\d{3}$/;

  readonly DATE_MONTH_YEAR_FORMATE_DASHED = 'DD-MM-YYYY';
  readonly DATE_MONTH_YEAR_FORMATE_SLASHED = 'DD/MM/YYYY';

  readonly commaSeparator = ',';

  readonly DEFAULT_APP_PADDING = Layout.widthPercentageToDP(4);

  readonly DEBOUNCE_DELAY = 400;
  readonly DISPOSE_DELAY = 700;

  readonly POP_UP_DURATION = 3000;
  readonly POP_UP_DIRECTION = 'bottom';
  readonly POP_UP_GESTTURE_CONFIG_DIRECTION = 'y';

  readonly DEFAULT_APP_LOCALE = 'en-US';
  readonly DEFAULT_APP_CURRENCY = 'USD';
}

export const Constants = new _Constants();
