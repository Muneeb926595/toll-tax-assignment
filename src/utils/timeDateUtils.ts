import dayjs from 'dayjs';
import {Platform} from 'react-native';

export const monthsNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const getTimeDuration = duration => {
  let seconds = Math.floor((duration % 1) * 60);
  let minutes = Math.floor(duration);
  let hours = 0;
  if (minutes > 60) {
    hours = minutes / 60;
    minutes = (hours % 1) * 60;
    hours = Math.floor(hours);
  }
  let newDuration = '';
  if (hours > 0) {
    newDuration += hours + ' h ';
  }
  if (minutes > 0) {
    newDuration += minutes + ' min ';
  }
  if (seconds > 0) {
    newDuration += seconds + ' sec';
  }
  return newDuration;
};

export const covertMiliToDays = milli => {
  let minutes = Math.floor(milli / 60000);
  let hours = Math.round(minutes / 60);
  let days = Math.round(hours / 24);

  return (
    (days && {value: days, unit: 'days'}) ||
    (hours && {value: hours, unit: 'hours'}) || {
      value: minutes,
      unit: 'minutes',
    }
  );
};
export const toHHMMSS = timeInSeconds => {
  let hours = Math.floor(timeInSeconds / 3600);
  let minutes = Math.floor((timeInSeconds - hours * 3600) / 60);
  let seconds = timeInSeconds - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = +('0' + hours);
  }
  if (minutes < 10) {
    minutes = +('0' + minutes);
  }
  if (seconds < 10) {
    seconds = +('0' + seconds);
  }
  return hours + ':' + minutes + ':' + seconds;
};
export const numericToEnglishMonth = (month: number) => {
  if (month >= 0 && month < 12) {
    return monthsNames?.[month];
  }
};

/**
 * Get the current year.
 *
 * @returns {number} The current year as a four-digit number (e.g., 2023).
 */
export const getCurrentYear = () => {
  const currentDate = new Date();
  return currentDate.getFullYear();
};
/**
 * Get the full month and year from a timestamp.
 *
 * @param {number} timestamp - The timestamp to convert into a formatted date string.
 * @returns {string} The full month and year in the format "Month Year".
 */
export const getMonthFromTimestampDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const options: any = {month: 'long', year: 'numeric'};
  const monthAndYear = date?.toLocaleDateString('en-US', options);
  return monthAndYear;
};

export const getSelectedDateRangeLabelFromSelectedDates = selectedDates => {
  if (selectedDates) {
    const markedDates = Object.keys(selectedDates);

    // Parse the dates using dayjs
    if (markedDates?.length === 1) {
      const singleDate = dayjs(markedDates?.[0]);
      const formattedSingleDate = `${singleDate?.format(
        'DD',
      )} ${singleDate?.format('MMMM')} ${singleDate?.format('YYYY')}`;
      return formattedSingleDate;
    } else {
      const minDate = dayjs(markedDates?.[0]);
      const maxDate = dayjs(markedDates?.[markedDates?.length - 1]);
      const formattedDateRange = `${minDate?.format('DD')} - ${maxDate?.format(
        'DD',
      )} ${minDate?.format('MMMM')}, ${minDate.format('YYYY')}`;
      return formattedDateRange;
    }
  } else {
    return null;
  }
};

// to convert backend date object into frontend calendar object
export const convertDateStringToObj = dateString => {
  if (dateString) {
    // Convert date string to Date object
    const date = new Date(dateString);

    // Get year, month, and day from the Date object
    const year = date.getFullYear();
    // Months are zero-based in JavaScript, so we add 1 to get the correct month
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // Create the desired object
    const result = {
      [`${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`]:
        {
          marked: true,
          selected: true,
        },
    };

    return result;
  } else {
    return null;
  }
};

export const convertDateToTimeAMPM = date => {
  // Ensure the date is a valid Date object
  if (!(date instanceof Date)) {
    return '';
  }

  // Extract hours and minutes from the date
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine AM/PM
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  const hours12 = hours % 12 || 12;

  // Format the time as hh:mm AM/PM
  return `${String(hours12).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0',
  )} ${ampm}`;
};

export const countTimeSlots = (startTime, endTime) => {
  const dummyDate = '2024-01-01'; // Using an arbitrary date
  const start = dayjs(`${dummyDate} ${startTime}`, 'YYYY-MM-DD HH:mm');
  const end = dayjs(`${dummyDate} ${endTime}`, 'YYYY-MM-DD HH:mm');

  // Validate the times
  if (!start.isValid() || !end.isValid()) {
    throw new Error('Invalid time format. Please use HH:mm format.');
  }

  // Ensure the end time is after the start time
  if (end.isBefore(start)) {
    throw new Error('End time must be after start time.');
  }

  // Initialize the slot count
  let slotCount = 0;

  // Initialize the current time as the start time
  let currentTime = start;

  // Loop through the time slots
  while (currentTime?.isBefore?.(end)) {
    // Move to the next slot (30 minutes)
    currentTime = currentTime?.add?.(30, 'minute');

    // Only count the slot if it is before the end time
    if (currentTime?.isBefore?.(end) || currentTime?.isSame?.(end)) {
      slotCount++;
    }
  }

  return slotCount;
};

export const calculateTimeRemaining = (fromTimestamp, endTimestamp) => {
  const userTimeZone = dayjs?.tz?.guess?.();

  const fromDateTime = Platform.select({
    ios: dayjs(fromTimestamp).tz(userTimeZone),
    android: dayjs(fromTimestamp),
  });
  const endDateTime = Platform.select({
    ios: dayjs(endTimestamp).tz(userTimeZone),
    android: dayjs(endTimestamp),
  });
  const currentDate = Platform.select({
    ios: dayjs().tz(userTimeZone),
    android: dayjs(),
  });

  // Check if the event is ongoing
  if (currentDate.isAfter(fromDateTime) && currentDate.isBefore(endDateTime)) {
    return 'Event is ongoing';
  }

  // Check if the event is in the past
  if (currentDate.isAfter(endDateTime)) {
    return 'Event already held';
  }

  const isToday = fromDateTime.isSame(currentDate, 'day');

  const timeDifference = fromDateTime.diff(currentDate);
  const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const daysHours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);

  if (daysRemaining === 0 && isToday) {
    return 'Today';
  }

  if (daysRemaining === 0 && !isToday) {
    return 'Tomorrow';
  } else if (daysRemaining === 1) {
    return 'Tomorrow';
  } else if (daysRemaining < 30) {
    return `In ${daysRemaining} days`;
  } else {
    const monthsRemaining = Math.floor(daysRemaining / 30);
    const remainingDays = daysRemaining % 30;
    if (remainingDays === 0) {
      return `In ${monthsRemaining} months`;
    } else {
      return `In ${monthsRemaining} months and ${remainingDays} days`;
    }
  }
};

export const formatTimeFromDate = timestamp => {
  const formattedTime = new Date(timestamp).toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  return formattedTime;
};

export const formatDateWithDay = timestamp => {
  const formattedDate = new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
    timeZone: 'UTC',
  });
  return formattedDate;
};

export const formatDateForChat = timestamp => {
  const currentDate = dayjs(); // Current date
  const targetDate = dayjs(timestamp); // Parse the MongoDB date

  const daysDiff = currentDate?.diff?.(targetDate, 'day'); // Difference in days

  // If within 7 days and the target date is a weekend (Saturday or Sunday)
  if (
    daysDiff < 7 &&
    (targetDate?.day?.() === 0 || targetDate?.day?.() === 6)
  ) {
    return targetDate?.format?.('ddd'); // Short weekday name (e.g., "Sat", "Sun")
  }

  // If within the current year
  if (currentDate?.year?.() === targetDate?.year?.()) {
    return targetDate?.format?.('MMM D'); // Month and day (e.g., "Nov 20")
  }

  // For dates in previous years
  return targetDate?.format?.('MMM YYYY'); // Month and year (e.g., "Nov 2023")
};
