// const vary = (base, range) => {
//     return base + Math.floor(Math.random() * (2 * range + 1)) - range;
//   };
  
//   const generateNextDayData = (previousData) => {
//     const prevDate = new Date(previousData.date);
//     const nextDate = new Date(prevDate.setDate(prevDate.getDate() + 1))
//       .toISOString().split('T')[0];
  
//     return {
//       date: nextDate,
//       steps: vary(previousData.steps, 500),
//       calories: vary(previousData.calories, 200),
//       heartRate: vary(previousData.heartRate, 5),
//       sleepHours: parseFloat((vary(previousData.sleepHours * 10, 10) / 10).toFixed(1))
//     };
//   };
  
//   module.exports = generateNextDayData;


const vary = (base, range) => {
  return base + Math.floor(Math.random() * (2 * range + 1)) - range;
};

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const generateNextDayData = (previousData) => {
  const prevDate = new Date(previousData.date);
  const nextDate = new Date(prevDate.setDate(prevDate.getDate() + 1))
    .toISOString().split('T')[0];

  return {
    date: nextDate,
    steps: vary(previousData.steps, 500),
    calories: vary(previousData.calories, 200),
    heartRate: vary(previousData.heartRate, 5),
    sleepHours: parseFloat((vary(previousData.sleepHours * 10, 10) / 10).toFixed(1)),
    bloodOxygen: clamp(vary(previousData.bloodOxygen || 97, 1), 95, 100),
    distance: parseFloat(clamp(vary((previousData.distance || 4.0) * 10, 5) / 10, 2.0, 10.0).toFixed(2))
  };
};

module.exports = generateNextDayData;
