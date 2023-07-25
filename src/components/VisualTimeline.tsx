import { ParasolBeachIcon, PencilIcon } from "@navikt/aksel-icons";
import { Timeline } from "@navikt/ds-react";
import { setYear, subDays } from "date-fns";
import { Travel } from "../models/Travel";
import { checkForLimitsV3, summaryAndCheckLimits } from "@/utilities/dataCalculations";
import { checkTravelPeriods } from "@/utilities/dataCalculations";

export const VisualTimeline = ({ data }: { data: Array<Travel> }) => {
  const range = (from: number, to: number) =>
    new Array(to - from + 1).fill(from).map((n, i) => n + i);

  const years: number[] = Array.from(
    new Set(
      data.flatMap((travel) =>
        range(travel.startDate.getFullYear(), travel.endDate.getFullYear())
      )
    )
  ).sort((a, b) => a - b);

  const {summary, travelsOverLimit} = summaryAndCheckLimits(data);

  return data.length === 0 || years.length === 0 ? null : (
    <Timeline
      startDate={new Date(0)}
      endDate={subDays(setYear(new Date(0), 1971), 1)}
    >
      {years.map((year: number) => {
        const yearSummary = summary[year] || { totalDaysOverLimit: 0};

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
                const isOverLimit = travelsOverLimit.includes(travel);
                const isPeriodOverLimit = yearSummary.totalDaysOverLimit > 0;
                const isTravelOverLimit = isOverLimit || isPeriodOverLimit;

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
                    status={isTravelOverLimit ? "danger" : "success"}
                    icon={<PencilIcon aria-hidden />}
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
