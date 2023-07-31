import { TotalDaysAbroadAndTravel } from "@/models/TotalDaysAbroadAndTravel";
import { Travel } from "@/models/Travel";
import { addDays, addYears, differenceInCalendarDays } from "date-fns";

const MAX_TRAVEL_LENGTH = 365;
const MAX_TRAVEL_LENGTH_CONSECUTIVE = 183;

export function membershipRemainsValid(travels: Travel[]) {
  let tooLongDurations = travels.filter(travel => travel.duration >= 365)
  let output: Array<Travel> = /* liste av perioder som skal markeres rødt, men i bolker, så en liste av lister */ [] ;
if (tooLongDurations.length > 0) {
    output.push(...tooLongDurations)
  }
  const sortedTravels = travels.sort(travel => travel.startDate.getFullYear())
  let previousYear = sortedTravels[0].startDate.getFullYear()
  for (const year of sortedTravels.slice(1)) {
    // Send alle perioder innenfor "PreviousYEar" og inneværende år til en boolsk funksjon per "regel"
    // Lagre så output av disse funksjone som må ha samme input og output / funksjonstype i output variabelen til denne funksjon
  }
}

function beenOutsideOfNorwayWithTooManyDistinctTravels() {
  
}

export function dataCalculationsv2(savedTravels: Travel[]) {
  const startYears = savedTravels.map((t) => t.startDate.getFullYear()).sort();
  //var RedIndexes: number = [];
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
      //redInde
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
