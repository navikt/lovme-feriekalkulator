import { parseISO } from "date-fns";
import { Travel } from "../src/models/Travel";
import { getAllRedTravels } from "../src/utilities/ruleEngine";

test("travel over 12 months should be in redTravels array", () => {
  expect(getAllRedTravels(listContainingOver12MonthTravel)).toEqual(listContainingOver12MonthTravelResult);
});

test("consecutive travels over 6 months should be in redTravels array", () => {
  expect(getAllRedTravels(listContaining6MonthsConsecutiveOverLimit)).toEqual(listContaining6MonthsConsecutiveOverLimit);
});

const listContaining6MonthsConsecutiveOverLimit: Array<Travel> = [
  {
      "id": 1690897873694,
      "country": "Uganda",
      "startDate": parseISO("2023-12-31T23:00:00.000Z"),
      "endDate": parseISO("2024-07-02T22:00:00.000Z"),
      "EEA": false,
      "purpose": "Ferie",
      "duration": 184
  },
  {
      "id": 1690897327485,
      "country": "Thailand",
      "startDate": parseISO("2022-12-31T23:00:00.000Z"),
      "endDate": parseISO("2023-07-02T22:00:00.000Z"),
      "EEA": false,
      "purpose": "Ferie",
      "duration": 183
  }
];



const listContainingOver12MonthTravelResult: Array<Travel> = [
  {
    id: 1690879189677,
    country: "Bonaire, Sint Eustatius og Saba",
    startDate: parseISO("2018-02-16T23:00:00.000Z"),
    endDate: parseISO("2019-03-07T23:00:00.000Z"),
    EEA: false,
    purpose: "Ferie",
    duration: 384,
  },
];

const listContainingOver12MonthTravel: Array<Travel> = [
  {
    id: 1690879189677,
    country: "Bonaire, Sint Eustatius og Saba",
    startDate: parseISO("2018-02-16T23:00:00.000Z"),
    endDate: parseISO("2019-03-07T23:00:00.000Z"),
    EEA: false,
    purpose: "Ferie",
    duration: 384,
  },
  {
    id: 1690879159998,
    country: "Afghanistan",
    startDate: parseISO("2020-08-07T22:00:00.000Z"),
    endDate: parseISO("2020-08-20T22:00:00.000Z"),
    EEA: false,
    purpose: "Ferie",
    duration: 13,
  },
  {
    id: 1690879166975,
    country: "Albania",
    startDate: parseISO("2022-08-11T22:00:00.000Z"),
    endDate: parseISO("2022-08-24T22:00:00.000Z"),
    EEA: false,
    purpose: "Ferie",
    duration: 13,
  },
];
