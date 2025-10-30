
import { useMemo } from 'react';
import type { Expression } from '../types';

export const useDailyExpression = (expressions: Expression[]) => {
  const dailyData = useMemo(() => {
    if (!expressions || expressions.length === 0) {
      return { dailyExpression: null, otherExpressions: [] };
    }

    const getDayOfYear = (date: Date): number => {
      const start = new Date(date.getFullYear(), 0, 0);
      const diff = (date.getTime() - start.getTime()) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
      const oneDay = 1000 * 60 * 60 * 24;
      return Math.floor(diff / oneDay);
    };

    const today = new Date();
    const dayOfYear = getDayOfYear(today);
    const dailyIndex = dayOfYear % expressions.length;
    
    const dailyExpression = expressions[dailyIndex];
    const otherExpressions = [...expressions];
    
    // Move the daily expression to the front of the list for display if needed elsewhere, 
    // but here we just need to return it separately.
    // For the "all expressions" list, it's fine to include the daily one as well.
    
    return { dailyExpression, otherExpressions: expressions };
  }, [expressions]);

  return dailyData;
};
