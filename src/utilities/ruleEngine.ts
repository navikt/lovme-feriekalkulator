import { Travel } from "@/models/Travel";
import { addYears, differenceInCalendarDays } from "date-fns";

const MAX_TRAVEL_LENGTH = 365;
const MAX_TRAVEL_LENGTH_CONSECUTIVE = 365 / 2;
const MIN_TIME_IN_NORWAY = 7 * 5;

export function getAllRedTravels(travels: Array<Travel>) {
  let redTravels: Array<Travel> = [];

  travels.sort((a, b) => a.startDate.valueOf() - b.startDate.valueOf());
  maxLengthRule(travels, redTravels);
  consecutiveYearRule(travels, redTravels);
  registrationRule(travels, redTravels);
  return redTravels;
}

function maxLengthRule(travels: Array<Travel>, redTravels: Array<Travel>) {
  travels.map((travel) =>
    travel.duration > MAX_TRAVEL_LENGTH ? redTravels.push(travel) : null
  );
}

function consecutiveYearRule(
  travels: Array<Travel>,
  redTravels: Array<Travel>
) {
  let years = [
    ...new Set(travels.map((t) => t.startDate.getFullYear()).sort()),
  ];

  years.forEach((year, index) => {
    if (index < years.length - 1) {
      let nextYear = years[index + 1];
      if (
        totalDaysAbroadYear(travels, year) > MAX_TRAVEL_LENGTH_CONSECUTIVE &&
        totalDaysAbroadYear(travels, nextYear) > MAX_TRAVEL_LENGTH_CONSECUTIVE
      ) {
        travels.forEach((travel) => {
          let travelYear = travel.startDate.getFullYear();
          if (
            (travelYear === year || travelYear === nextYear) &&
            !redTravels.includes(travel)
          ) {
            redTravels.push(travel);
          }
        });
      }
    }
  });
}

export function totalDaysAbroadYear(travels: Array<Travel>, year: number) {
  let totalDaysAbroad = 0;
  travels.forEach((travel) => {
    if (
      travel.startDate.getFullYear() <= year &&
      travel.endDate.getFullYear() >= year
    ) {
      const startDate =
        travel.startDate.getFullYear() < year
          ? new Date(year, 0, 1)
          : travel.startDate;
      const endDate =
        travel.endDate.getFullYear() > year
          ? new Date(year + 1, 0, 1)
          : travel.endDate;
      totalDaysAbroad += differenceInCalendarDays(endDate, startDate);
    }
  });
  return totalDaysAbroad;
}

export function totalDaysInNorway(travels: Array<Travel>, year: number) {
  let totalDaysInNorway = 0;

  const travelsThisYear = travels.filter(
    (t) =>
      t.startDate.getFullYear() === year || t.endDate.getFullYear() === year
  );

  for (const travel of travelsThisYear) {
    let periodStart =
      travel.startDate.getFullYear() === year
        ? travel.startDate
        : new Date(year, 0, 1);
    let periodEnd =
      travel.endDate.getFullYear() === year
        ? travel.endDate
        : new Date(year + 1, 0, 1);

    let period = differenceInCalendarDays(periodEnd, periodStart);

    if (period > MIN_TIME_IN_NORWAY) {
      totalDaysInNorway += period;
    }
  }

  return totalDaysInNorway;
}

function registrationRule(travels: Array<Travel>, redTravels: Array<Travel>) {
  let notRedTravels = travels
    .filter((t) => !redTravels.includes(t))
    .sort((a, b) => a.startDate.valueOf() - b.startDate.valueOf());

  for (const redTravel of redTravels.sort(
    (a, b) => a.endDate.valueOf() - b.endDate.valueOf()
  )) {
    let greenDate = addYears(redTravel.endDate, 1);
    while (
      notRedTravels.some(
        (t) => t.startDate < greenDate && redTravel.endDate < t.startDate
      )
    ) {
      const newRedTravel = notRedTravels.find(
        (t) => t.startDate < greenDate && t.startDate > redTravel.endDate
      );
      newRedTravel
        ? ((greenDate = addYears(newRedTravel.endDate, 1)),
          redTravels.push(newRedTravel))
        : null;
      notRedTravels = notRedTravels.filter((t) => t !== newRedTravel);
    }
  }
}
