import { Travel } from "@/models/Travel";
import { addDays, differenceInCalendarDays, setYear } from "date-fns";

interface SummaryData {
    totalDays: number;
    totalDaysOverLimit: number;
  }

  interface SummaryResult {
    summary: { [year: number]: SummaryData };
    travelsOverLimit: Travel[];
    totalDaysOverLimit: number;
  }

  export function summaryAndCheckLimits(savedTravels: Travel[]): SummaryResult {
    
    const summary: { [year: number]: SummaryData } = {};
    const travelsOverLimit: Travel[] = [];

    for (const travel of savedTravels) {
      const year = travel.startDate.getFullYear();
      const startAndEndDateDifference = Math.abs(
        differenceInCalendarDays(travel.startDate, travel.endDate)
      );
      let daysOverLimit = 0;

      if (travel.duration > 0) {
        // Check for consecutive travel exceeding 12 months
        if (startAndEndDateDifference > 365 && travel.duration > 365) {
          daysOverLimit = startAndEndDateDifference - 365;
        }

        // Check for more than 6 months of travel within 2 calendar years
        const nextYear = year + 1;
        const nextYearTravel = savedTravels.find(
            (t) => 
            t.startDate.getFullYear() === nextYear && t.endDate.getFullYear());

        if (startAndEndDateDifference > 183 && travel.duration > 183 && nextYearTravel) {
          const nextYearDays = Math.abs(
            differenceInCalendarDays(nextYearTravel.startDate, nextYearTravel.endDate));
            if(nextYearDays + startAndEndDateDifference > 365) {
                daysOverLimit = startAndEndDateDifference - (365 - nextYearDays);
            }
        }
      }

      if (daysOverLimit > 0) {
        travelsOverLimit.push(travel);
      }

      if (!summary[year]) {
        summary[year] = {
          totalDays: startAndEndDateDifference,
          totalDaysOverLimit: daysOverLimit,
        };
      } else {
        summary[year].totalDays += startAndEndDateDifference;
        summary[year].totalDaysOverLimit += daysOverLimit;
      }

    }

    let totalDaysOverLimit = 0;
    Object.values(summary).forEach((data) => {
        totalDaysOverLimit += data.totalDaysOverLimit;
    });

    return {summary, totalDaysOverLimit, travelsOverLimit};
  }

  // VERSION 1 - DOES NOT WORK FOR ALL CASES
  /* export function checkTravelPeriods(savedTravels: Travel[]): SummaryResult {
    const summary: { [year: number]: SummaryData } = {};
    const travelsOverLimit: Travel[] = [];
  
    for (const travel of savedTravels) {
      const year = travel.startDate.getFullYear();
      const days = Math.abs(differenceInCalendarDays(travel.startDate, travel.endDate));
      let daysOverLimit = 0;
  
      if (travel.duration > 0) {
        // Check for consecutive travel exceeding 12 months
        if (days > 365 && travel.duration > 365) {
          daysOverLimit = days - 365;
        }
  
        // Check for more than 6 months of travel within 2 calendar years
        const yearTravels = savedTravels.filter(
          (t) =>
            t.startDate.getFullYear() === year ||
            (t.endDate.getFullYear() === year && t.startDate.getFullYear() !== year)
        );
  
        const totalDaysInYear = yearTravels.reduce(
          (total, t) => total + Math.abs(differenceInCalendarDays(t.startDate, t.endDate)),
          0
        );
  
        if (totalDaysInYear > 183) {
          daysOverLimit = totalDaysInYear - 183;
        }
      }
  
      if (daysOverLimit > 0) {
        travelsOverLimit.push(travel);
      }
  
      if (!summary[year]) {
        summary[year] = {
          totalDays: days,
          totalDaysOverLimit: daysOverLimit,
        };
      } else {
        summary[year].totalDays += days;
        summary[year].totalDaysOverLimit += daysOverLimit;
      }
    }
  
    let totalDaysOverLimit = 0;
    Object.values(summary).forEach((data) => {
      totalDaysOverLimit += data.totalDaysOverLimit;
    });
  
    return { summary, travelsOverLimit, totalDaysOverLimit };
  } */

  

  
  