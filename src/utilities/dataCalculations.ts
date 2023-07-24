import { Travel } from "@/models/Travel";
import { differenceInCalendarDays } from "date-fns";

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

    // Initialize an array to store travels that are over the limit
    const travelsOverLimit: Travel[] = [];

    for (const travel of savedTravels) {
      const year = travel.startDate.getFullYear();
      const days = Math.abs(
        differenceInCalendarDays(travel.startDate, travel.endDate)
      );
      let daysOverLimit = 0;

      if (travel.duration > 0) {
        // Check for consecutive travel exceeding 12 months
        if (days > 365 && travel.duration > 365) {
          daysOverLimit = days - 365;
        }

        // Check for more than 6 months of travel within 2 calendar years
        const nextYear = year + 1;
        if (days > 183 && travel.duration > 183 && summary[nextYear]) {
          daysOverLimit = days - 183;
        }
      }

      if (daysOverLimit > 0) {
        // Add the travel to the travelsOverLimit array
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

    // Calculate total days over the limit
    let totalDaysOverLimit = 0;
    Object.values(summary).forEach((data) => {
        totalDaysOverLimit += data.totalDaysOverLimit;
    });

    return {summary, totalDaysOverLimit, travelsOverLimit};
  }