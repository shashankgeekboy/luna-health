import { useState, useEffect } from 'react';
import { CycleData, CycleDay } from '@/types';
import { addDays, format, parseISO, differenceInDays } from 'date-fns';

// Mock function to get cycle data (in a real app, this would come from an API)
export const getMockCycleData = (): CycleData[] => {
  const today = new Date();
  const lastMonth = addDays(today, -28);
  const twoMonthsAgo = addDays(today, -56);
  
  return [
    {
      id: '1',
      userId: '1',
      startDate: format(twoMonthsAgo, 'yyyy-MM-dd'),
      endDate: format(addDays(twoMonthsAgo, 5), 'yyyy-MM-dd'),
      length: 28,
      periodLength: 5,
      cycleType: 'regular',
      days: generateMockDays(twoMonthsAgo, 5),
    },
    {
      id: '2',
      userId: '1',
      startDate: format(lastMonth, 'yyyy-MM-dd'),
      endDate: format(addDays(lastMonth, 6), 'yyyy-MM-dd'),
      length: 29,
      periodLength: 6,
      cycleType: 'regular',
      days: generateMockDays(lastMonth, 6),
    },
    {
      id: '3',
      userId: '1',
      startDate: format(today, 'yyyy-MM-dd'),
      length: undefined,
      periodLength: undefined,
      cycleType: undefined,
      days: generateMockDays(today, 2, true),
    },
  ];
};

// Helper function to generate mock days data
const generateMockDays = (startDate: Date, length: number, current: boolean = false): CycleDay[] => {
  const days: CycleDay[] = [];
  const symptoms = ['cramps', 'headache', 'bloating', 'tender breasts', 'fatigue'];
  const moods = ['happy', 'sad', 'irritable', 'anxious', 'calm'];
  
  for (let i = 0; i < length; i++) {
    const date = addDays(startDate, i);
    const flowIntensity = i === 0 || i === length - 1 
      ? 'light' 
      : i === 1 || i === length - 2 
        ? 'medium' 
        : 'heavy';
    
    days.push({
      date: format(date, 'yyyy-MM-dd'),
      flow: (flowIntensity as 'light' | 'medium' | 'heavy'),
      symptoms: i < 3 ? [symptoms[i % symptoms.length], symptoms[(i + 1) % symptoms.length]] : undefined,
      mood: [moods[i % moods.length]],
      notes: i === 1 ? 'Feeling a bit better today' : undefined,
    });
  }
  
  // If it's the current cycle and not finished, only return completed days
  if (current) {
    return days;
  }
  
  return days;
};

export const useCycle = () => {
  const [cycles, setCycles] = useState<CycleData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCycle, setCurrentCycle] = useState<CycleData | null>(null);
  const [nextPeriodDate, setNextPeriodDate] = useState<string | null>(null);
  const [ovulationDate, setOvulationDate] = useState<string | null>(null);
  const [fertileDays, setFertileDays] = useState<string[]>([]);

  useEffect(() => {
    // Simulate API call
    const fetchCycles = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would call your API here
        await new Promise(resolve => setTimeout(resolve, 1000));
        const data = getMockCycleData();
        setCycles(data);
        
        // Set current cycle
        const current = data.find(cycle => !cycle.endDate);
        setCurrentCycle(current || null);
        
        // Calculate predictions
        if (data.length >= 2) {
          calculatePredictions(data);
        }
      } catch (error) {
        console.error('Error fetching cycle data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCycles();
  }, []);

  const calculatePredictions = (cycleData: CycleData[]) => {
    // Get completed cycles for calculation
    const completedCycles = cycleData.filter(cycle => cycle.endDate);
    
    if (completedCycles.length < 2) return;
    
    // Calculate average cycle length
    const avgCycleLength = completedCycles.reduce((sum, cycle) => {
      return sum + (cycle.length || 28);
    }, 0) / completedCycles.length;
    
    // Get last period start date
    const lastPeriodStart = parseISO(completedCycles[completedCycles.length - 1].startDate);
    
    // Calculate next period date
    const nextPeriod = addDays(lastPeriodStart, Math.round(avgCycleLength));
    setNextPeriodDate(format(nextPeriod, 'yyyy-MM-dd'));
    
    // Calculate ovulation (typically 14 days before next period)
    const ovulation = addDays(nextPeriod, -14);
    setOvulationDate(format(ovulation, 'yyyy-MM-dd'));
    
    // Calculate fertile window (typically 5 days before and 1 day after ovulation)
    const fertileWindow = [];
    for (let i = -5; i <= 1; i++) {
      fertileWindow.push(format(addDays(ovulation, i), 'yyyy-MM-dd'));
    }
    setFertileDays(fertileWindow);
  };

  const logPeriod = async (date: string, flow: 'light' | 'medium' | 'heavy' | 'spotting') => {
    try {
      // Check if we have a current cycle
      if (currentCycle) {
        // Add to existing cycle
        const updatedDays = [...currentCycle.days];
        const existingDayIndex = updatedDays.findIndex(day => day.date === date);
        
        if (existingDayIndex >= 0) {
          // Update existing day
          updatedDays[existingDayIndex] = {
            ...updatedDays[existingDayIndex],
            flow,
          };
        } else {
          // Add new day
          updatedDays.push({
            date,
            flow,
          });
        }
        
        const updatedCycle = {
          ...currentCycle,
          days: updatedDays,
        };
        
        // Update cycles
        setCycles(cycles.map(cycle => 
          cycle.id === currentCycle.id ? updatedCycle : cycle
        ));
        setCurrentCycle(updatedCycle);
      } else {
        // Start a new cycle
        const newCycle: CycleData = {
          id: Date.now().toString(),
          userId: '1', // This would come from auth in a real app
          startDate: date,
          days: [{
            date,
            flow,
          }],
        };
        
        setCycles([...cycles, newCycle]);
        setCurrentCycle(newCycle);
      }
    } catch (error) {
      console.error('Error logging period:', error);
    }
  };

  const logSymptom = async (date: string, symptom: string) => {
    try {
      if (currentCycle) {
        const updatedDays = [...currentCycle.days];
        const existingDayIndex = updatedDays.findIndex(day => day.date === date);
        
        if (existingDayIndex >= 0) {
          // Update existing day
          const existingSymptoms = updatedDays[existingDayIndex].symptoms || [];
          updatedDays[existingDayIndex] = {
            ...updatedDays[existingDayIndex],
            symptoms: existingSymptoms.includes(symptom) 
              ? existingSymptoms.filter(s => s !== symptom) // Remove if already exists
              : [...existingSymptoms, symptom], // Add if not exists
          };
        } else {
          // Add new day
          updatedDays.push({
            date,
            symptoms: [symptom],
          });
        }
        
        const updatedCycle = {
          ...currentCycle,
          days: updatedDays,
        };
        
        // Update cycles
        setCycles(cycles.map(cycle => 
          cycle.id === currentCycle.id ? updatedCycle : cycle
        ));
        setCurrentCycle(updatedCycle);
      }
    } catch (error) {
      console.error('Error logging symptom:', error);
    }
  };

  const logMood = async (date: string, mood: string) => {
    try {
      if (currentCycle) {
        const updatedDays = [...currentCycle.days];
        const existingDayIndex = updatedDays.findIndex(day => day.date === date);
        
        if (existingDayIndex >= 0) {
          // Update existing day
          const existingMoods = updatedDays[existingDayIndex].mood || [];
          updatedDays[existingDayIndex] = {
            ...updatedDays[existingDayIndex],
            mood: existingMoods.includes(mood) 
              ? existingMoods.filter(m => m !== mood) 
              : [...existingMoods, mood],
          };
        } else {
          // Add new day
          updatedDays.push({
            date,
            mood: [mood],
          });
        }
        
        const updatedCycle = {
          ...currentCycle,
          days: updatedDays,
        };
        
        // Update cycles
        setCycles(cycles.map(cycle => 
          cycle.id === currentCycle.id ? updatedCycle : cycle
        ));
        setCurrentCycle(updatedCycle);
      }
    } catch (error) {
      console.error('Error logging mood:', error);
    }
  };

  const endPeriod = async (date: string) => {
    if (!currentCycle) return;
    
    try {
      const startDate = parseISO(currentCycle.startDate);
      const endDate = parseISO(date);
      const length = differenceInDays(endDate, startDate) + 1;
      
      const updatedCycle = {
        ...currentCycle,
        endDate: date,
        periodLength: length,
      };
      
      // Update cycles
      setCycles(cycles.map(cycle => 
        cycle.id === currentCycle.id ? updatedCycle : cycle
      ));
      setCurrentCycle(null);
    } catch (error) {
      console.error('Error ending period:', error);
    }
  };

  return {
    cycles,
    currentCycle,
    isLoading,
    nextPeriodDate,
    ovulationDate,
    fertileDays,
    logPeriod,
    logSymptom,
    logMood,
    endPeriod,
  };
};