import DateChooser from "@/components/DateChooser";
import { VisualTimeline } from "@/components/VisualTimeline";
import { useState } from "react";
import JourneyTable from "@/components/JourneyTable";
import { Travel } from "@/models/Travel";
import SummaryCard from "@/components/SummaryCard";
import { setDefaultOptions } from "date-fns";
import { nb } from "date-fns/locale";
import { GuidePanel, Panel } from "@navikt/ds-react";
setDefaultOptions({ locale: nb });

export default function Home() {
  const [savedTravels, setSavedTravels] = useState<Array<Travel>>([]);
  return (
    <div>
      <div className="flex flex-wrap  gap-4 p-7 py-12">
        <div className="flex space-x-4 max-h-[30rem] items-stretch">
          <DateChooser
            savedTravels={savedTravels}
            setSavedTravels={setSavedTravels}
          />

          <div className="bg-transparent rounded-lg overflow-auto w-[50rem]">
            {savedTravels.length > 0 ? (
              <JourneyTable
                savedTravels={savedTravels}
                setSavedTravels={setSavedTravels}
              />
            ) : (
              <div className="bg-white"></div>
            )}
          </div>
        </div>

        <div className="w-full">
          <VisualTimeline data={savedTravels}></VisualTimeline>
        </div>
      </div>

      <div className="flex flex-col w-1/4">
        <SummaryCard savedTravels={savedTravels} />
      </div>
    </div>
  );
}
