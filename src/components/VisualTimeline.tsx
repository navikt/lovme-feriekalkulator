import { ParasolBeachIcon, PencilIcon } from "@navikt/aksel-icons";
import { Timeline } from "@navikt/ds-react";
import { Reise } from "../models/Reise";

export const VisualTimeline = ({ data }: { data: Array<Reise> }) => {
  console.log(data);
    return (
     data.length === 0   
    ? null :<Timeline>
      <Timeline.Row label="År" icon={<ParasolBeachIcon />}>
        {data.map((travel: Reise, i) => {
          return (
            <Timeline.Period
              key={i}
              start={travel.fraDato}
              end={travel.tilDato}
              status={"success"}
              icon={<PencilIcon aria-hidden />}
            >
              {" "}
              {travel.formål ?? null}
            </Timeline.Period>
          );
        })}
      </Timeline.Row>
    </Timeline>
  );
};
