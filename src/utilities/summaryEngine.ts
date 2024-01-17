import { Travel } from "@/models/Travel";
import { totalDaysAbroadYear, totalDaysInNorway } from "./ruleEngine";
import { differenceInDays, isLeapYear } from "date-fns";
import { YearlySummary } from "@/models/YearlySummary";

export function getYearlySummaries(
  travels: Array<Travel>
): Array<YearlySummary> {
  const years = getAllYears(travels);
  const summarys: Array<YearlySummary> = [];

  for (const year of years) {
    let yearlySummary: YearlySummary = {
      year: year,
      totalDaysAbroad: totalDaysAbroadYear(travels, year),
      totalDaysInNorway: totalDaysInNorway(travels, year),
      totalDaysInEEA: totalDaysInEEA(travels, year),
      totalDaysOutsideEEA:
        totalDaysAbroadYear(travels, year) - totalDaysInEEA(travels, year),
    };
    summarys.push(yearlySummary);
  }
  return summarys;
}

function totalDaysInEEA(travels: Array<Travel>, year: number): number {
  let totalDaysInEEA = 0;
  const yearStart = new Date(year, 0, 1);
  const yearEnd = isLeapYear(yearStart)
    ? new Date(year + 1, 0, 1)
    : new Date(year, 11, 31);

  for (const travel of travels.filter(
    (t) =>
      (t.startDate.getFullYear() === year ||
        t.endDate.getFullYear() === year) &&
      t.EEA
  )) {
    if (travel.startDate.getFullYear() !== year) {
      totalDaysInEEA += differenceInDays(travel.endDate, yearStart);
    } else if (travel.endDate.getFullYear() !== year) {
      totalDaysInEEA += differenceInDays(yearEnd, travel.startDate);
    } else {
      totalDaysInEEA += differenceInDays(travel.endDate, travel.startDate);
    }
  }
  return totalDaysInEEA;
}

function getAllYears(travels: Array<Travel>): Set<number> {
  const years: Array<number> = [];

  for (const travel of travels) {
    for (
      let year = travel.startDate.getFullYear();
      year <= travel.endDate.getFullYear();
      year++
    ) {
      years.push(year);
    }
  }
  return new Set(years);
}
