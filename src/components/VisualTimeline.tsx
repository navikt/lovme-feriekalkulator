import { ParasolBeachIcon, PencilIcon } from "@navikt/aksel-icons";
import { Timeline } from "@navikt/ds-react";
import { setYear, subDays } from "date-fns";
import { Reise } from "../models/Reise";

export const VisualTimeline = ({ data }: { data: Array<Reise> }) => {
  const range = (from: number, to: number) =>
    new Array(to - from + 1).fill(from).map((n, i) => n + i);

  const years: number[] = Array.from(
    new Set(
      data.flatMap((travel) =>
        range(travel.fraDato.getFullYear(), travel.tilDato.getFullYear())
      )
    )
  ).sort((a, b) => a - b);

  return data.length === 0 || years.length === 0 ? null : (
    <Timeline
      startDate={new Date(0)}
      endDate={subDays(setYear(new Date(0), 1971), 1)}
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
                  travel.fraDato.getFullYear() === year ||
                  travel.tilDato.getFullYear() === year ||
                  (travel.fraDato.getFullYear() < year &&
                    travel.tilDato.getFullYear() > year)
              )
              .map((travel: Reise, i) => {
                return (
                  <Timeline.Period
                    key={i}
                    start={
                      travel.fraDato.getFullYear() === year
                        ? setYear(travel.fraDato, 1970)
                        : setYear(travel.fraDato, 1969)
                    }
                    end={
                      travel.tilDato.getFullYear() === year
                        ? setYear(travel.tilDato, 1970)
                        : setYear(travel.tilDato, 1971)
                    }
                    status={"success"}
                    icon={<PencilIcon aria-hidden />}
                  >
                    {travel.land ?? null}
                  </Timeline.Period>
                );
              })}
          </Timeline.Row>
        );
      })}
    </Timeline>
  );
};
