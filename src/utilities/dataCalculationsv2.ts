import { Travel } from "@/models/Travel";
import { addDays, addYears, differenceInCalendarDays } from "date-fns";
import { da, is } from "date-fns/locale";

interface SummaryData {
  totalDays: number;
  totalDaysOverLimit: number;
}

interface TotalDaysAbroadAndTravel {
  totalDaysAbroad: number;
  travel: Travel | undefined;
}

const MAX_TRAVEL_LENGTH = 365;
const MAX_TRAVEL_LENGTH_CONSECUTIVE = 183;

export function dataCalculationsv2(savedTravels: Travel[]) {
  const startYears = savedTravels.map((t) => t.startDate.getFullYear()).sort();
  let isMember = true;
  let firstDateOfStayInNorway = new Date();

  for (const year of startYears) {
    if (isMember) {
      let totalDaysAbroadResult = totalDaysAbroad(savedTravels, year);

      if (totalDaysAbroadResult.totalDaysAbroad > MAX_TRAVEL_LENGTH) {
        isMember = false;
        firstDateOfStayInNorway = addDays(
          totalDaysAbroadResult.travel?.endDate ?? new Date(),
          1
        );
      } else if (
        totalDaysAbroadResult.totalDaysAbroad > MAX_TRAVEL_LENGTH_CONSECUTIVE
      ) {
        let nextYearsDaysAbroad = totalDaysAbroad(savedTravels, year + 1);

        if (
          nextYearsDaysAbroad.totalDaysAbroad > MAX_TRAVEL_LENGTH_CONSECUTIVE
        ) {
          isMember = false;
          firstDateOfStayInNorway = addDays(
            totalDaysAbroadResult.travel?.endDate ?? new Date(),
            1
          );
        }
      }
    } else {
      const travelsToCheck = savedTravels.filter(
        (t) =>
          t.startDate < addYears(firstDateOfStayInNorway, 1) &&
          t.startDate > firstDateOfStayInNorway
      );

      if (travelsToCheck.length === 0) {
        isMember = true;
        firstDateOfStayInNorway = new Date();
      } else {
        for (const travel of travelsToCheck) {
          if (travel.startDate < addYears(firstDateOfStayInNorway, 1)) {
            firstDateOfStayInNorway = addDays(travel.endDate, 1);
            break;
          }
        }
      }
    }
  }
}

function totalDaysAbroad(
  savedTravels: Travel[],
  year: number
): TotalDaysAbroadAndTravel {
  let totalDaysAbroad = 0;
  for (const travel of savedTravels) {
    if (travel.duration > 365) {
      totalDaysAbroad = travel.duration;
      return { totalDaysAbroad, travel };
    } else if (
      travel.startDate.getFullYear() == year &&
      travel.endDate.getFullYear() == year
    ) {
      totalDaysAbroad += Math.abs(
        differenceInCalendarDays(travel.startDate, travel.endDate)
      );
    } else if (travel.startDate.getFullYear() == year) {
      totalDaysAbroad += Math.abs(
        differenceInCalendarDays(travel.startDate, new Date(year, 11, 31))
      );
    } else if (travel.endDate.getFullYear() == year) {
      totalDaysAbroad += Math.abs(
        differenceInCalendarDays(new Date(year, 0, 1), travel.endDate)
      );
    }
  }

  return { totalDaysAbroad, travel: undefined };
}
