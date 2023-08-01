import { Travel } from "@/models/Travel";
import { addYears, differenceInDays, eachYearOfInterval } from "date-fns";

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
  for (const year of new Set(
    travels.map((t) => t.startDate.getFullYear()).sort()
  )) {
    if (totalDaysInNorway(travels, year) < MAX_TRAVEL_LENGTH_CONSECUTIVE) {
      if (
        totalDaysInNorway(travels, year + 1) < MAX_TRAVEL_LENGTH_CONSECUTIVE
      ) {
        travels.map((t) =>
          (!redTravels.includes(t) && t.startDate.getFullYear() == year) ||
          t.endDate.getFullYear() == year
            ? redTravels.push(t)
            : null
        );
        travels.map((t) =>
          !redTravels.includes(t) && t.startDate.getFullYear() == year + 1
            ? redTravels.push(t)
            : null
        );
      }
    }
  }
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
      totalDaysAbroad += differenceInDays(
        new Date(year, 11, 31),
        travel.startDate
      );
    } else if (
      travel.endDate.getFullYear() == year &&
      travel.startDate.getFullYear() != year
    ) {
      totalDaysAbroad += differenceInDays(
        travel.endDate,
        new Date(year - 1, 11, 31)
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
  let lastTravelEndDate =
    travels.findLast((t) => t.startDate.getFullYear() == year - 1)?.endDate ??
    new Date(year - 1, 11, 31);

  for (let i = 0; i < travelsThisYear.length; i++) {
    let period = differenceInDays(
      travelsThisYear[i].startDate,
      lastTravelEndDate
    );
    if (period > MIN_TIME_IN_NORWAY) {
      if (lastTravelEndDate.getFullYear() == year) {
        totalDaysInNorway += period;
      } else if (lastTravelEndDate.getFullYear() < year) {
        totalDaysInNorway += differenceInDays(
          travelsThisYear[i].startDate,
          new Date(year - 1, 11, 31)
        );
      }
    }
    if (travelsThisYear.length < 2 && lastTravelEndDate.getFullYear() == year) {
      if (
        differenceInDays(new Date(year, 11, 31), lastTravelEndDate) >
        MIN_TIME_IN_NORWAY
      )
        totalDaysInNorway += differenceInDays(
          new Date(year, 11, 31),
          lastTravelEndDate
        );
    }
    lastTravelEndDate = travelsThisYear[i].endDate;
  }

  if (travelsThisYear.length == 0) {
    if (lastTravelEndDate.getFullYear() < year) {
      lastTravelEndDate = new Date(year - 1, 11, 31);
    }
    if (
      differenceInDays(new Date(year, 11, 31), lastTravelEndDate) >
      MIN_TIME_IN_NORWAY
    )
      totalDaysInNorway += differenceInDays(
        new Date(year, 11, 31),
        lastTravelEndDate
      );
  }
  if (lastTravelEndDate < new Date(year, 11, 31)) {
    if (
      differenceInDays(new Date(year, 11, 31), lastTravelEndDate) >
      MIN_TIME_IN_NORWAY
    ) {
      totalDaysInNorway += differenceInDays(
        new Date(year, 11, 31),
        lastTravelEndDate
      );
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
      const newRedTravel = notRedTravels.find((t) => t.startDate < greenDate);
      newRedTravel
        ? ((greenDate = addYears(newRedTravel.endDate, 1)),
          redTravels.push(newRedTravel))
        : null;
      notRedTravels = notRedTravels.filter((t) => t !== newRedTravel);
    }
  }
}
