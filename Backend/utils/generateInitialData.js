const generateInitialData = () => {
    const date = new Date().toISOString().split('T')[0];
    return {
      date,
      steps: Math.floor(Math.random() * 8000 + 4000),         
      calories: Math.floor(Math.random() * 1500 + 1500),     
      heartRate: Math.floor(Math.random() * 35 + 65),        
      sleepHours: parseFloat((Math.random() * 4 + 5).toFixed(1)),
      bloodOxygen: Math.floor(Math.random() * 3) + 96,           
      distance: (Math.random() * 3 + 2).toFixed(2)
    };
  };
  
  module.exports = generateInitialData;
  