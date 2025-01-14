import dayjs from 'dayjs';
import {Constants} from '../../../globals';

export const calculateToll = (tripStartData: any, tripEndData: any) => {
  const baseRate = Constants?.BASE_RATE; // Base rate
  const perKmRate = Constants?.PER_KM_RATE; // Rate per KM
  const weekendMultiplier = Constants?.WEEKEND_MULTIPLIER; // Multiplier for weekends
  const nationalHolidays = Constants?.HOLIDAY_DATES; // National holidays
  const distances = {
    0: 0,
    5: 5,
    10: 10,
    17: 17,
    24: 24,
    29: 29,
    34: 34,
  };

  const {entryDateTime, entryInterchange, numberPlate} = tripStartData;
  const {exitDateTime, exitInterchange} = tripEndData;

  if (!entryDateTime || !exitInterchange) {
    throw new Error('Incomplete trip data');
  }

  // Calculate distance traveled
  const entryDistance = distances?.[entryInterchange] || 0;
  const exitDistance = distances?.[exitInterchange] || 0;
  const distanceTraveled = Math?.abs?.(exitDistance - entryDistance);

  // Check if it's a weekend
  const isWeekend =
    dayjs?.(exitDateTime)?.day?.() === 0 ||
    dayjs?.(exitDateTime)?.day?.() === 6;

  // Check if it's a national holiday
  const isNationalHoliday = nationalHolidays?.includes?.(
    dayjs?.(entryDateTime)?.format?.('YYYY-MM-DD'),
  );

  // Extract the last digit of the number plate for discount rules
  const lastDigit = parseInt?.(numberPlate?.split?.('-')?.[1]?.[2]);

  // Base toll calculation
  const distanceCost = distanceTraveled * perKmRate;
  const subTotal = baseRate + distanceCost;

  let totalCost = subTotal;

  // Apply weekend multiplier
  if (isWeekend) {
    totalCost *= weekendMultiplier;
  }

  // Apply weekday discounts
  const entryDay = dayjs?.(entryDateTime)?.day?.();
  let discount = 0;

  if (entryDay === 1 || entryDay === 3) {
    // Monday or Wednesday: Discount for even-numbered plates
    if (lastDigit % 2 === 0) {
      discount = 0.1 * totalCost;
      totalCost -= discount;
    }
  } else if (entryDay === 2 || entryDay === 4) {
    // Tuesday or Thursday: Discount for odd-numbered plates
    if (lastDigit % 2 !== 0) {
      discount = 0.1 * totalCost;
      totalCost -= discount;
    }
  }

  // Apply national holiday discount
  if (isNationalHoliday) {
    discount = 0.5 * totalCost;
    totalCost -= discount;
  }

  return {
    baseRate,
    distanceCost: parseFloat?.(distanceCost?.toFixed?.(2)),
    subTotal: parseFloat?.(subTotal?.toFixed?.(2)),
    discount: parseFloat?.(discount?.toFixed?.(2)),
    totalCost: parseFloat?.(totalCost?.toFixed?.(2)),
  };
};
