import { Travel } from "@/models/Travel";
import { ExternalLinkIcon, SunIcon } from "@navikt/aksel-icons";
import { ExpansionCard, Label, Link } from "@navikt/ds-react";
import { differenceInCalendarDays } from "date-fns";

interface SummaryData {
  totalDays: number;
  totalDaysOverLimit: number;
}

const SummaryCard = ({ savedTravels }: { savedTravels: Travel[] }) => {
  
    const getSummaryByYear = () => {
    const summary: { [year: number]: SummaryData } = {};

    for (const travel of savedTravels) {
      const year = travel.startDate.getFullYear();
      const days = Math.abs(
        differenceInCalendarDays(travel.startDate, travel.endDate)
      );
      let daysOverLimit = 0;

      if (travel.duration > 0) {
        // Check for consecutive travel exceeding 12 months
        if (days > 365 && travel.duration > 365) {
          daysOverLimit = days - 365;
        }

        // Check for more than 6 months of travel within 2 calendar years
        const nextYear = year + 1;
        if (days > 183 && travel.duration > 183 && summary[nextYear]) {
          daysOverLimit = days - 183;
        }
      }

      if (!summary[year]) {
        summary[year] = {
          totalDays: days,
          totalDaysOverLimit: daysOverLimit,
        };
      } else {
        summary[year].totalDays += days;
        summary[year].totalDaysOverLimit += daysOverLimit;
      }
    }

    return summary;
  };

  const summaryByYear = getSummaryByYear();

  // Calculate total days over the limit
  let totalDaysOverLimit = 0;
  Object.values(summaryByYear).forEach((data) => {
    totalDaysOverLimit += data.totalDaysOverLimit;
  });

  // Conditionally apply the background color class for the SunIcon
  const sunIconClass = `w-16 h-16 p-1 top-0 rounded-full ${
    totalDaysOverLimit > 0 ? "bg-red-300" : "bg-green-200"
  }`;



  return (
    <div className="subtle-card">
      <ExpansionCard aria-label="Demo med custom-styling">
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
                Perioder som har eventuelt gått over grensen er markert med rødt
              </ExpansionCard.Description>
            </div>
          </div>
        </ExpansionCard.Header>
        <ExpansionCard.Content>
          Dette er en oppsummering av feriedagene dine
          {Object.entries(summaryByYear).map(([year, data]) => (
            <div key={year}>
                <div className="flex justify-between font-bold">
              <h3>{year}</h3>
                <p>
                    {data.totalDaysOverLimit > 0 && (
                    <Label variant="error">Over grensen</Label>
                    )}
                </p>
                </div>
             
              <p>Totalt antall dager: {data.totalDays}</p>
              <p>
                Totalt antall dager over grensen: {data.totalDaysOverLimit}
              </p>
            </div>
          ))}
            <div className="top-8">
            <Link href="https://www.nav.no/no/person/flere-tema/arbeid-og-opphold-i-norge/relatert-informasjon/medlemskap-i-folketrygden" >
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
