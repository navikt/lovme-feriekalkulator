import { Travel } from "@/models/Travel";
import {
  CheckmarkCircleFillIcon,
  ExternalLinkIcon,
  SunIcon,
  XMarkOctagonFillIcon,
  ExclamationmarkTriangleFillIcon,
} from "@navikt/aksel-icons";
import { ExpansionCard, Label, Link, LinkPanel, Alert } from "@navikt/ds-react";
import { getYearlySummaries } from "@/utilities/summaryEngine";
import { differenceInCalendarDays, eachYearOfInterval } from "date-fns";

export const SummaryCard = ({
  savedTravels,
  redTravels,
}: {
  savedTravels: Array<Travel>;
  redTravels: Array<Travel>;
}) => {
  const yearlySummary = getYearlySummaries(savedTravels);

  const isSingleLongTravel =
    savedTravels.length === 1 &&
    differenceInCalendarDays(
      savedTravels[0].endDate,
      savedTravels[0].startDate
    ) +
      1 >=
      181;

  const hasWarning = yearlySummary.some(
    (summary) =>
      !isSingleLongTravel &&
      summary.totalDaysAbroad >= 180 &&
      summary.totalDaysAbroad <= 185
  );

  const sunIconClass = `w-16 h-16 p-1 top-0 rounded-full ${
    hasWarning
      ? "bg-orange-200"
      : redTravels.length > 0
      ? "bg-red-300"
      : "bg-green-200"
  }`;

  return (
    <div className="subtle-card">
      {savedTravels.length > 0 ? (
        <ExpansionCard open={true} aria-label="Kort med oppsummering">
          <ExpansionCard.Header>
            <div className="with-icon">
              <div className="icon">
                <SunIcon aria-hidden className={sunIconClass} />
              </div>
              <div>
                <ExpansionCard.Title>
                  Oppsummering av opphold i utlandet
                </ExpansionCard.Title>
              </div>
            </div>
          </ExpansionCard.Header>

          <ExpansionCard.Content className="overflow-auto max-h-[27.8rem]">
            <p>Oppsummering:</p>
            {yearlySummary.map((summary) => {
              const showWarning =
                !isSingleLongTravel &&
                summary.totalDaysAbroad >= 180 &&
                summary.totalDaysAbroad <= 185;

              return (
                <div key={summary.year}>
                  <div className="flex justify-between font-bold">
                    <h3>{summary.year}</h3>
                    <p>
                      {showWarning ? (
                        <Label className="text-orange-600">
                          <ExclamationmarkTriangleFillIcon
                            fontSize={25}
                            title="Advarsel"
                          />
                        </Label>
                      ) : redTravels.some((t) =>
                          eachYearOfInterval({
                            start: t.startDate,
                            end: t.endDate,
                          }).some((y) => y.getFullYear() === summary.year)
                        ) ? (
                        <Label className="text-red-500">
                          <XMarkOctagonFillIcon
                            fontSize={25}
                            title="Advarsel"
                          />
                        </Label>
                      ) : (
                        <Label className="text-green-500">
                          <CheckmarkCircleFillIcon
                            fontSize={25}
                            title="Alt er godt"
                          />
                        </Label>
                      )}
                    </p>
                  </div>

                  <p>Dager i utlandet: {summary.totalDaysAbroad}</p>
                  {showWarning ? (
                    <Alert variant="warning">
                      Advarsel: {summary.totalDaysAbroad} dager i utlandet i{" "}
                      {summary.year}. Nærmere kontroll nødvendig.
                    </Alert>
                  ) : null}

                  <p>Dager i Norge: {summary.totalDaysInNorway}</p>
                </div>
              );
            })}
            <div className="">
              <Link href="https://www.nav.no/no/person/flere-tema/arbeid-og-opphold-i-norge/relatert-informasjon/medlemskap-i-folketrygden">
                Mer informasjon om medlemskap i folketrygden (nav.no)
                <ExternalLinkIcon />
              </Link>
            </div>
          </ExpansionCard.Content>
        </ExpansionCard>
      ) : (
        <LinkPanel
          href="https://www.nav.no/no/person/flere-tema/arbeid-og-opphold-i-norge/relatert-informasjon/medlemskap-i-folketrygden"
          className="rounded-lg"
        >
          <LinkPanel.Title>Medlemskap i folketrygden</LinkPanel.Title>
          <LinkPanel.Description>
            Finn mer informasjon om reglene for medlemskap i folketrygden ved
            opphold i utlandet på nav.no
          </LinkPanel.Description>
        </LinkPanel>
      )}

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
