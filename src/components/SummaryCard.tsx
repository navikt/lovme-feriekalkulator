import { Travel } from "@/models/Travel";
import {
  CheckmarkCircleFillIcon,
  ExternalLinkIcon,
  SunIcon,
  XMarkOctagonFillIcon,
} from "@navikt/aksel-icons";
import { ExpansionCard, Label, Link } from "@navikt/ds-react";
import { getYearlySummaries } from "@/utilities/summaryEngine";
import { useEffect, useState } from "react";
import { eachYearOfInterval } from "date-fns";

const SummaryCard = ({
  savedTravels,
  redTravels,
}: {
  savedTravels: Array<Travel>;
  redTravels: Array<Travel>;
}) => {
  const yearlySummary = getYearlySummaries(savedTravels);

  const sunIconClass = `w-16 h-16 p-1 top-0 rounded-full ${
    redTravels.length > 0 ? "bg-red-300" : "bg-green-200"
  }`;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(savedTravels.length > 0 ? true : false);
  }, [savedTravels]);

  return (
    <div className="subtle-card">
      <ExpansionCard
        open={open}
        onClick={() => setOpen((x) => !x)}
        aria-label="Kort med oppsummering"
      >
        <ExpansionCard.Header>
          <div className="with-icon">
            <div className="icon">
              <SunIcon aria-hidden className={sunIconClass} />
            </div>
            <div>
              <ExpansionCard.Title>
                Oppsummering av feriedager
              </ExpansionCard.Title>
              <ExpansionCard.Description>
                Trykk for å se oppsummering
              </ExpansionCard.Description>
            </div>
          </div>
        </ExpansionCard.Header>

        <ExpansionCard.Content className="overflow-auto max-h-[27.8rem]">
          <p>Dette er en oppsummering av feriedagene dine:</p>
          <div className="leading-[0.5rem]">
            <br />
          </div>
          {yearlySummary.map((summary) => (
            <div key={summary.year}>
              <div className="flex justify-between font-bold">
                <h3>{summary.year}</h3>

                <p>
                  {redTravels.some((t) =>
                    eachYearOfInterval({
                      start: t.startDate,
                      end: t.endDate,
                    }).some((y) => y.getFullYear() == summary.year)
                  ) ? (
                    <Label className="text-red-500">
                      {" "}
                      <XMarkOctagonFillIcon
                        fontSize={25}
                        title="a11y-title"
                      />{" "}
                    </Label>
                  ) : (
                    <Label className="text-green-500">
                      {" "}
                      <CheckmarkCircleFillIcon
                        fontSize={25}
                        title="a11y-title"
                      />
                    </Label>
                  )}
                </p>
              </div>

              <p>Dager i utlandet: {summary.totalDaysAbroad}</p>
              <p>Dager i Norge: {summary.totalDaysInNorway}</p>
              <div className="leading-4">
                <br />
              </div>
            </div>
          ))}
          <div className="">
            <Link href="https://www.nav.no/no/person/flere-tema/arbeid-og-opphold-i-norge/relatert-informasjon/medlemskap-i-folketrygden">
              Mer informasjon om medlemskap i folketrygden (nav.no)
              <ExternalLinkIcon />
            </Link>
          </div>
        </ExpansionCard.Content>
      </ExpansionCard>

      <style>{`
        .with-icon {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .icon {
          font-size: 3rem;
          flex-shrink: 0;
          display: grid;
          place-content: center;
        }
      `}</style>
    </div>
  );
};

export default SummaryCard;
