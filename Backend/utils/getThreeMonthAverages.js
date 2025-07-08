const getThreeMonthAverages = (history) => {
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

  const filtered = history.filter(entry => new Date(entry.date) >= ninetyDaysAgo);

  const avg = {
    steps: 0,
    calories: 0,
    heartRate: 0,
    sleepHours: 0,
    bloodOxygen: 0,
    distance: 0
  };

  if (filtered.length === 0) return avg;

  for (const entry of filtered) {
    avg.steps += entry.steps || 0;
    avg.calories += entry.calories || 0;
    avg.heartRate += entry.heartRate || 0;
    avg.sleepHours += entry.sleepHours || 0;
    avg.bloodOxygen += entry.bloodOxygen || 0;
    avg.distance += entry.distance || 0;
  }

  const count = filtered.length;
  return {
    heartRate: Math.round(avg.heartRate / count),
    bloodOxygen: Math.round(avg.bloodOxygen / count),
    sleepHours: parseFloat((avg.sleepHours / count).toFixed(1)),
    steps: Math.round(avg.steps / count),
    calories: Math.round(avg.calories / count),
    distance: parseFloat((avg.distance / count).toFixed(2))
  };
};

module.exports = getThreeMonthAverages;
