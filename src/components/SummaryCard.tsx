import { Travel } from "@/models/Travel";
import { ExternalLinkIcon, SunIcon } from "@navikt/aksel-icons";
import { ExpansionCard, Label, Link } from "@navikt/ds-react";
import { summaryAndCheckLimits } from "@/utilities/dataCalculations";

const SummaryCard = ({ savedTravels }: { savedTravels: Travel[] }) => {
  const { summary, totalDaysOverLimit } = summaryAndCheckLimits(savedTravels);

  // Conditionally apply the background color class for the SunIcon
  const sunIconClass = `w-16 h-16 p-1 top-0 rounded-full ${
    totalDaysOverLimit > 0 ? "bg-red-300" : "bg-green-200"
  }`;

  return (
    <div className="subtle-card">
      <ExpansionCard aria-label="Kort med oppsummering">
        <ExpansionCard.Header>
          <div className="with-icon">
            <div className="icon">
              {/* Use the calculated class for SunIcon */}
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
          Dette er en oppsummering av feriedagene dine
          {Object.entries(summary).map(([year, data]) => (
            <div key={year}>
              <div className="flex justify-between font-bold">
                <h3>{year}</h3>
                <p>
                  {data.totalDaysOverLimit > 0 && <Label>Over grensen</Label>}
                </p>
              </div>

              <p>Totalt antall dager: {data.totalDays}</p>
              <p>Totalt antall dager over grensen: {data.totalDaysOverLimit}</p>
            </div>
          ))}
          <div className="top-8">
            <Link href="https://www.nav.no/no/person/flere-tema/arbeid-og-opphold-i-norge/relatert-informasjon/medlemskap-i-folketrygden">
              Mer informasjon om medlemskap i folketrygden
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
