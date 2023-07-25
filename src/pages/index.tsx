import DateChooser from "@/components/DateChooser";
import { VisualTimeline } from "@/components/VisualTimeline";
import { useState } from "react";
import JourneyTable from "@/components/JourneyTable";
import { Travel } from "@/models/Travel";
import SummaryCard from "@/components/SummaryCard";
import { setDefaultOptions } from "date-fns";
import { nb } from "date-fns/locale";
import { Panel } from "@navikt/ds-react";
setDefaultOptions({ locale: nb });

export default function Home() {
  const [savedTravels, setSavedTravels] = useState<Array<Travel>>([]);
  return (
    <div className="">
      <Panel className="flex flex-wrap justify-center gap-4 p-7 py-12 bg-white rounded-xl">
        <div className="flex space-x-4 max-h-[30rem] items-stretch">
          <DateChooser
            savedTravels={savedTravels}
            setSavedTravels={setSavedTravels}
          />

          <div className="  rounded-lg overflow-auto w-[80rem]">
            <JourneyTable
              savedTravels={savedTravels}
              setSavedTravels={setSavedTravels}
            />
          </div>
          <div className="flex">
            <SummaryCard savedTravels={savedTravels} />
          </div>
        </div>
      </Panel>

      <div className="w-full p-5">
        <VisualTimeline data={savedTravels}></VisualTimeline>
      </div>
    </div>
  );
}
