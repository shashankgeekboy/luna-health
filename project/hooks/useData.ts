import { useState, useEffect } from 'react';
import { Article, Symptom, Mood } from '@/types';

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // In a real app, you would fetch from an API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockArticles: Article[] = [
          {
            id: '1',
            title: 'Understanding Your Menstrual Cycle',
            summary: 'Learn about the four phases of your menstrual cycle and what happens in your body during each phase.',
            content: 'Your menstrual cycle is divided into four phases: menstruation, the follicular phase, ovulation, and the luteal phase. Each phase is characterized by different hormonal changes and physical symptoms...',
            category: 'Education',
            imageUrl: 'https://images.pexels.com/photos/3952080/pexels-photo-3952080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            readTime: 5,
          },
          {
            id: '2',
            title: 'Nutrition Tips for Your Period',
            summary: 'What to eat (and what to avoid) during different phases of your cycle for less discomfort.',
            content: 'During your period, focus on iron-rich foods like leafy greens, legumes, and lean meats to replenish iron lost through bleeding. Omega-3 fatty acids found in fish, flaxseeds, and walnuts can help reduce inflammation and period pain...',
            category: 'Nutrition',
            imageUrl: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            readTime: 4,
          },
          {
            id: '3',
            title: 'Exercise and Your Cycle',
            summary: 'How to adapt your workout routine to each phase of your menstrual cycle.',
            content: 'Your energy levels and physical capabilities change throughout your cycle due to hormonal fluctuations. During your period, gentler exercises like yoga or walking may feel better, while high-intensity workouts might be more suitable during the follicular phase when energy levels rise...',
            category: 'Fitness',
            imageUrl: 'https://images.pexels.com/photos/2294354/pexels-photo-2294354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            readTime: 6,
          },
          {
            id: '4',
            title: 'Managing PMS Symptoms Naturally',
            summary: 'Natural remedies and lifestyle changes to help reduce premenstrual syndrome symptoms.',
            content: 'Premenstrual syndrome (PMS) affects many women in the days leading up to their period. Symptoms can include mood swings, breast tenderness, food cravings, fatigue, irritability, and depression. While medication can help, many women find relief through natural approaches...',
            category: 'Wellness',
            imageUrl: 'https://images.pexels.com/photos/3621344/pexels-photo-3621344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            readTime: 7,
          },
        ];
        
        setArticles(mockArticles);
      } catch (err) {
        setError('Failed to load articles');
        console.error('Article fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticles();
  }, []);

  return { articles, isLoading, error };
}

export function useSymptoms() {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchSymptoms = async () => {
      setIsLoading(true);
      
      try {
        // In a real app, you would fetch from an API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockSymptoms: Symptom[] = [
          { id: '1', name: 'Cramps', icon: 'activity', category: 'physical' },
          { id: '2', name: 'Headache', icon: 'brain', category: 'physical' },
          { id: '3', name: 'Bloating', icon: 'heart', category: 'physical' },
          { id: '4', name: 'Tender Breasts', icon: 'thermometer', category: 'physical' },
          { id: '5', name: 'Fatigue', icon: 'battery', category: 'physical' },
          { id: '6', name: 'Acne', icon: 'pill', category: 'physical' },
          { id: '7', name: 'Cravings', icon: 'cookie', category: 'physical' },
          { id: '8', name: 'Insomnia', icon: 'moon', category: 'physical' },
          { id: '9', name: 'Mood Swings', icon: 'wind', category: 'emotional' },
          { id: '10', name: 'Irritability', icon: 'flame', category: 'emotional' },
          { id: '11', name: 'Anxiety', icon: 'landmark', category: 'emotional' },
          { id: '12', name: 'Depression', icon: 'cloud-rain', category: 'emotional' },
        ];
        
        setSymptoms(mockSymptoms);
      } catch (error) {
        console.error('Error fetching symptoms:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSymptoms();
  }, []);
  
  return { symptoms, isLoading };
}

export function useMoods() {
  const [moods, setMoods] = useState<Mood[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchMoods = async () => {
      setIsLoading(true);
      
      try {
        // In a real app, you would fetch from an API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockMoods: Mood[] = [
          { id: '1', name: 'Happy', icon: 'smile' },
          { id: '2', name: 'Sad', icon: 'frown' },
          { id: '3', name: 'Anxious', icon: 'alert-triangle' },
          { id: '4', name: 'Calm', icon: 'leaf' },
          { id: '5', name: 'Irritable', icon: 'zap' },
          { id: '6', name: 'Energetic', icon: 'battery-charging' },
          { id: '7', name: 'Tired', icon: 'battery-low' },
          { id: '8', name: 'Content', icon: 'sun' },
        ];
        
        setMoods(mockMoods);
      } catch (error) {
        console.error('Error fetching moods:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMoods();
  }, []);
  
  return { moods, isLoading };
}