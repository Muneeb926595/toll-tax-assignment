export const calculateToll = () => {
  // Validation
  //   if (!numberPlate.match(/^[A-Z]{3}-\d{3}$/)) {
  //     Alert.alert('Error', 'Invalid number plate format. Use LLL-NNN.');
  //     return;
  //   }
  //   if (entryPoint === exitPoint) {
  //     Alert.alert('Error', 'Entry and exit points cannot be the same.');
  //     return;
  //   }
  //   if (!entryDate || !exitDate) {
  //     Alert.alert('Error', 'Entry and exit dates are required.');
  //     return;
  //   }
  //   // Parse dates
  //   const entryDateObj = new Date(entryDate);
  //   const exitDateObj = new Date(exitDate);
  //   const entryDay = entryDateObj.toLocaleString('en-US', {weekday: 'short'});
  //   const exitDay = exitDateObj.toLocaleString('en-US', {weekday: 'short'});
  //   const exitDayMultiplier = ['Sat', 'Sun'].includes(exitDay)
  //     ? WEEKEND_MULTIPLIER
  //     : 1;
  //   // Distance
  //   const distance = Math.abs(exitPoint - entryPoint);
  //   let cost = BASE_RATE + distance * PER_KM_RATE * exitDayMultiplier;
  //   // Discount on specific days
  //   const plateNumber = parseInt(numberPlate.split('-')[1], 10);
  //   const isEvenPlate = plateNumber % 2 === 0;
  //   const entryDateFormatted = `${
  //     entryDateObj.getMonth() + 1
  //   }-${entryDateObj.getDate()}`;
  //   if (HOLIDAY_DATES.includes(entryDateFormatted)) {
  //     cost *= 0.5; // 50% discount on holidays
  //   } else if (DISCOUNT_DAYS.even.includes(entryDay) && isEvenPlate) {
  //     cost *= 0.9; // 10% discount for even plates
  //   } else if (DISCOUNT_DAYS.odd.includes(entryDay) && !isEvenPlate) {
  //     cost *= 0.9; // 10% discount for odd plates
  //   }
  //   return cost.toFixed(2);
};
