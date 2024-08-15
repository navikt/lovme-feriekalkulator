import {
  ParasolBeachIcon,
  AirplaneIcon,
  ExclamationmarkTriangleIcon,
  XMarkOctagonIcon,
} from "@navikt/aksel-icons";
import { Timeline } from "@navikt/ds-react";
import { setYear, subDays, differenceInCalendarDays } from "date-fns";
import { Travel } from "../models/Travel";

export const VisualTimeline = ({
  data,
  redTravels,
}: {
  data: Array<Travel>;
  redTravels: Array<Travel>;
}) => {
  const range = (from: number, to: number) =>
    new Array(to - from + 1).fill(from).map((n, i) => n + i);

  const years: number[] = Array.from(
    new Set(
      data.flatMap((travel) =>
        range(travel.startDate.getFullYear(), travel.endDate.getFullYear())
      )
    )
  ).sort((a, b) => a - b);

  const hasMultiplePeriods = data.length > 1;
  const hasWarningPeriod = data.some((travel) => {
    const days = differenceInCalendarDays(travel.endDate, travel.startDate) + 1;
    return days >= 181 && days <= 185;
  });

  return data.length === 0 || years.length === 0 ? null : (
    <Timeline
      startDate={subDays(new Date(0), 1)}
      endDate={setYear(new Date(0), 1971)}
      axisLabelTemplates={{ day: "DD", month: "MMM", year: "YY" }}
    >
      {years.map((year: number) => {
        return (
          <Timeline.Row
            key={year}
            label={year.toString()}
            icon={<ParasolBeachIcon />}
          >
            {data
              .filter(
                (travel) =>
                  travel.startDate.getFullYear() === year ||
                  travel.endDate.getFullYear() === year ||
                  (travel.startDate.getFullYear() < year &&
                    travel.endDate.getFullYear() > year)
              )
              .map((travel: Travel, i) => {
                const status =
                  hasMultiplePeriods && hasWarningPeriod
                    ? "warning"
                    : redTravels.includes(travel)
                    ? "danger"
                    : "success";

                return (
                  <Timeline.Period
                    key={i}
                    start={
                      travel.startDate.getFullYear() === year
                        ? setYear(travel.startDate, 1970)
                        : setYear(travel.startDate, 1969)
                    }
                    end={
                      travel.endDate.getFullYear() === year
                        ? setYear(travel.endDate, 1970)
                        : setYear(travel.endDate, 1971)
                    }
                    status={status}
                    icon={
                      status === "danger" ? (
                        <XMarkOctagonIcon title="Danger" />
                      ) : status === "warning" ? (
                        <ExclamationmarkTriangleIcon title="Warning" />
                      ) : (
                        <AirplaneIcon title="Travel" />
                      )
                    }
                  >
                    {travel.country ?? null}
                  </Timeline.Period>
                );
              })}
          </Timeline.Row>
        );
      })}
    </Timeline>
  );
};
