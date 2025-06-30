const getThreeMonthAverages = (history) => {
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  
    const filtered = history.filter(entry => new Date(entry.date) >= ninetyDaysAgo);
  
    const avg = { steps: 0, calories: 0, heartRate: 0, sleepHours: 0 };
    if (filtered.length === 0) return avg;
  
    for (const entry of filtered) {
      avg.steps += entry.steps;
      avg.calories += entry.calories;
      avg.heartRate += entry.heartRate;
      avg.sleepHours += entry.sleepHours;
    }
  
    const count = filtered.length;
    return {
      steps: Math.round(avg.steps / count),
      calories: Math.round(avg.calories / count),
      heartRate: Math.round(avg.heartRate / count),
      sleepHours: parseFloat((avg.sleepHours / count).toFixed(1))
    };
  };
  
  module.exports = getThreeMonthAverages;
  