import { Travel } from "@/models/Travel";
import { ExternalLinkIcon, SunIcon } from "@navikt/aksel-icons";
import { ExpansionCard, Label, Link } from "@navikt/ds-react";
import { summaryAndCheckLimits } from "@/utilities/dataCalculations";


const SummaryCard = ({ savedTravels }: { savedTravels: Travel[] }) => {

  const {summary, totalDaysOverLimit} = summaryAndCheckLimits(savedTravels);

  const sunIconClass = `w-16 h-16 p-1 top-0 rounded-full ${
    totalDaysOverLimit > 0 ? "bg-red-300" : "bg-green-200"
  }`;

  return (
    <div className="subtle-card">
      <ExpansionCard aria-label="Kort med oppsummering">
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
                Perioder som har eventuelt gått over grensen er markert med rødt
              </ExpansionCard.Description>
            </div>
          </div>
        </ExpansionCard.Header>
        <ExpansionCard.Content>
          <p className="">Dette er en oppsummering av feriedagene dine:</p>
          {Object.entries(summary).map(([year, data]) => (
            <div key={year}>
              <div className="flex justify-between font-bold underline">
                <h3>{year}</h3>
                <p>
                  {data.totalDaysOverLimit > 0 && <Label>Over grensen</Label>}
                </p>
              </div>

              <p>Totalt antall dager utenfor Norge: {data.totalDays}</p>
              <p className="flex content-end text-border-danger">Totalt antall dager over grensen: {data.totalDaysOverLimit}</p>
            </div>
          ))}
          <div className="">
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
