import { Travel } from "@/models/Travel";
import {
  addYears,
  differenceInCalendarDays,
  eachYearOfInterval,
  setYear,
} from "date-fns";

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
  travels.forEach((travel) => {
    if (
      differenceInCalendarDays(travel.endDate, travel.startDate) >=
      MAX_TRAVEL_LENGTH
    ) {
      redTravels.push(travel);
    }
  });
}

function consecutiveYearRule(
  travels: Array<Travel>,
  redTravels: Array<Travel>
) {
  let years = Array.from(
    new Set(travels.map((t) => t.startDate.getFullYear()).sort())
  );

  years.forEach((year, index) => {
    if (index < years.length - 1) {
      let nextYear = years[index + 1];
      let totalDaysAbroadCurrentYear = totalDaysAbroadYear(travels, year);
      let totalDaysAbroadNextYear = totalDaysAbroadYear(travels, nextYear);

      if (
        totalDaysAbroadCurrentYear > MAX_TRAVEL_LENGTH_CONSECUTIVE &&
        totalDaysAbroadNextYear > MAX_TRAVEL_LENGTH_CONSECUTIVE
      ) {
        travels.forEach((travel) => {
          if (
            travel.startDate.getFullYear() === year ||
            travel.startDate.getFullYear() === nextYear
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

  for (const travel of travels.filter((t) =>
    eachYearOfInterval({ start: t.startDate, end: t.endDate }).some(
      (t) => t.getFullYear() == year
    )
  )) {
    if (
      travel.startDate.getFullYear() == year &&
      travel.endDate.getFullYear() == year
    ) {
      totalDaysAbroad += travel.duration;
    } else if (
      travel.endDate.getFullYear() != year &&
      travel.startDate.getFullYear() == year
    ) {
      totalDaysAbroad +=
        differenceInCalendarDays(new Date(year, 11, 31), travel.startDate) + 1;
    } else if (
      travel.endDate.getFullYear() == year &&
      travel.startDate.getFullYear() != year
    ) {
      totalDaysAbroad += differenceInCalendarDays(
        travel.endDate,
        new Date(year, 0, 1)
      );
    } else {
      totalDaysAbroad = 365;
    }
  }
  return totalDaysAbroad;
}

export function totalDaysInNorway(travels: Array<Travel>, year: number) {
  let totalDaysInNorway = 0;

  const travelsThisYear = travels.filter(
    (t) => t.startDate.getFullYear() == year || t.endDate.getFullYear() == year
  );

  let lastTravelEndDate = travels.findLast(
    (t) => t.startDate.getFullYear() < year
  )?.endDate;

  lastTravelEndDate == undefined ? (lastTravelEndDate = new Date(0)) : null;

  let firstTravelAfterThisYear = travels.find(
    (t) => t.startDate.getFullYear() > year
  )?.startDate;
  console.log(
    differenceInCalendarDays(new Date(2023, 0, 31), new Date(2023, 0, 1))
  );
  for (let i = 0; i < travelsThisYear.length + 2; i++) {
    let period = differenceInCalendarDays(
      travelsThisYear[i]?.startDate
        ? travelsThisYear[i]?.startDate
        : firstTravelAfterThisYear ?? new Date(year + 10, 0, 1),
      lastTravelEndDate
    );
    if (period > MIN_TIME_IN_NORWAY) {
      if (lastTravelEndDate < setYear(new Date(0), year)) {
        totalDaysInNorway += differenceInCalendarDays(
          travelsThisYear[i]?.startDate ?? new Date(year + 1, 0, 1),
          new Date(year, 0, 1)
        );
      } else {
        totalDaysInNorway += differenceInCalendarDays(
          travelsThisYear[i]?.startDate ?? new Date(year + 1, 0, 1),
          lastTravelEndDate.getFullYear() == year
            ? lastTravelEndDate
            : new Date(year + 1, 0, 1)
        );
      }
    }
    lastTravelEndDate = travelsThisYear[i]?.endDate ?? new Date(year + 1, 0, 1);
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
