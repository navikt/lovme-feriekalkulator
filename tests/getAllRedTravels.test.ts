import { parseISO, toDate } from "date-fns";
import { Travel } from "../src/models/Travel";
import { getAllRedTravels } from "../src/utilities/ruleEngine";

test("getAllRedTravels", () => {
  expect(getAllRedTravels(data)).toStrictEqual(correctResult);
});

const correctResult: Array<Travel> = [
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

const data: Array<Travel> = [
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
