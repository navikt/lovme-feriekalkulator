import { Travel } from "@/models/Travel";
import { addYears, differenceInDays } from "date-fns";
import { Dispatch, SetStateAction } from "react";

const MAX_TRAVEL_LENGTH = 365;
const MAX_TRAVEL_LENGTH_CONSECUTIVE = 365 / 2;
const MIN_TIME_IN_NORWAY = 7 * 5;

export function getAllRedTravels(
  travels: Array<Travel>,
  setRedTravels: Dispatch<SetStateAction<Array<Travel>>>
) {
  let redTravels: Array<Travel> = [];
  console.log(redTravels);
  travels.sort((a, b) => a.startDate.valueOf() - b.startDate.valueOf());
  maxLengthRule(travels, redTravels);
  consecutiveYearRule(travels, redTravels);
  registrationRule(travels, redTravels);
  // return redTravels
  setRedTravels(redTravels);
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
    // console.log("year " + year + " " + totalDaysInNorway(travels, year))
    // console.log(totalDaysInNorway(travels, year) < MAX_TRAVEL_LENGTH_CONSECUTIVE)
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
    // console.log("year: " + year + " " + redTravels.map(t => t.country))
  }
}

function totalDaysAbroadYear(travels: Array<Travel>, year: number) {
  let totalDaysAbroad = 0;
  for (const travel of travels.filter(
    (t) => t.startDate.getFullYear() == year || t.endDate.getFullYear() == year
  )) {
    if (travel.startDate.getFullYear() != year) {
      totalDaysAbroad += differenceInDays(new Date(year, 0, 1), travel.endDate);
    } else if (travel.endDate.getFullYear() != year) {
      totalDaysAbroad += differenceInDays(
        travel.startDate,
        new Date(year, 11, 31)
      );
    } else {
      totalDaysAbroad += travel.duration;
    }
  }
  return totalDaysAbroad;
}

function totalDaysInNorway(travels: Array<Travel>, year: number) {
  let totalDaysInNorway = 0;
  const travelsThisYear = travels.filter(
    (t) => t.startDate.getFullYear() == year
  );
  let lastTravelEndDate =
    travels.findLast((t) => t.startDate.getFullYear() == year - 1)?.endDate ??
    new Date(year - 1, 11, 31);

  for (let i = 0; i < travelsThisYear.length; i++) {
    let period = differenceInDays(
      travelsThisYear[i].startDate,
      lastTravelEndDate
    );
    // console.log(period + " number:"+ i)
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
    lastTravelEndDate = travelsThisYear[i].endDate;
    if (travelsThisYear.length < 2) {
      totalDaysInNorway += differenceInDays(
        new Date(year, 11, 31),
        lastTravelEndDate
      );
    }
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
    // console.log("travelsThisYear tom: " + differenceInDays(new Date(year, 11, 31), lastTravelEndDate))
  }
  // console.log(totalDaysInNorway + " year: " + year);
  return totalDaysInNorway;
}

function registrationRule(travels: Array<Travel>, redTravels: Array<Travel>) {
  let notRedTravels = travels
    .filter((t) => !redTravels.includes(t))
    .sort((a, b) => a.startDate.valueOf() - b.startDate.valueOf());
  console.log("Before: " + notRedTravels.map(t => t.country));
  for (const redTravel of redTravels.sort(
    (a, b) => a.endDate.valueOf() - b.endDate.valueOf()
  )) {
    let greenDate = addYears(redTravel.endDate, 1);
    while (notRedTravels.some((t) => t.startDate < greenDate && redTravel.endDate < t.startDate)) {
      const newRedTravel = notRedTravels.find((t) => t.startDate < greenDate);
      newRedTravel
        ? ((greenDate = addYears(newRedTravel.endDate, 1)),
          redTravels.push(newRedTravel))
        : null;
      notRedTravels = notRedTravels.filter((t) => t !== newRedTravel);
    }
  }
  console.log("after: " + notRedTravels.map(t => t.country));
}
