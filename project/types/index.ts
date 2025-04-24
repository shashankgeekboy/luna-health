export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface CycleDay {
  date: string;
  flow?: 'light' | 'medium' | 'heavy' | 'spotting';
  symptoms?: string[];
  mood?: string[];
  notes?: string;
}

export interface CycleData {
  id: string;
  userId: string;
  startDate: string;
  endDate?: string;
  length?: number;
  periodLength?: number;
  cycleType?: 'regular' | 'irregular';
  days: CycleDay[];
}

export interface Symptom {
  id: string;
  name: string;
  icon: string;
  category: 'physical' | 'emotional' | 'other';
}

export interface Mood {
  id: string;
  name: string;
  icon: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  imageUrl: string;
  readTime: number;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  location: string;
}