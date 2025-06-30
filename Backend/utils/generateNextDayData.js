const vary = (base, range) => {
    return base + Math.floor(Math.random() * (2 * range + 1)) - range;
  };
  
  const generateNextDayData = (previousData) => {
    const prevDate = new Date(previousData.date);
    const nextDate = new Date(prevDate.setDate(prevDate.getDate() + 1))
      .toISOString().split('T')[0];
  
    return {
      date: nextDate,
      steps: vary(previousData.steps, 500),
      calories: vary(previousData.calories, 200),
      heartRate: vary(previousData.heartRate, 5),
      sleepHours: parseFloat((vary(previousData.sleepHours * 10, 10) / 10).toFixed(1))
    };
  };
  
  module.exports = generateNextDayData;
  