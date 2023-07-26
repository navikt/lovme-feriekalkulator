import DateChooser from "@/components/DateChooser";
import { VisualTimeline } from "@/components/VisualTimeline";
import { useState } from "react";
import JourneyTable from "@/components/JourneyTable";
import { Travel } from "@/models/Travel";
import SummaryCard from "@/components/SummaryCard";
import { setDefaultOptions } from "date-fns";
import { nb } from "date-fns/locale";
setDefaultOptions({ locale: nb });

export default function Home() {
  const [savedTravels, setSavedTravels] = useState<Array<Travel>>([]);

  return (
    <div>
      <div className="p-7 py-12 bg-white rounded-xl ">
        <div className="flex w-fit m-auto flex-wrap gap-4">
          <div>
            <DateChooser
              savedTravels={savedTravels}
              setSavedTravels={setSavedTravels}
            />
          </div>

          <div className="justify-self-stretch rounded-lg max-h-[30rem] overflow-auto">
            <JourneyTable
              savedTravels={savedTravels}
              setSavedTravels={setSavedTravels}
            />
          </div>

          <div className="justify-self-start">
            <SummaryCard savedTravels={savedTravels} />
          </div>
        </div>
      </div>

      <div className="w-3/4 mx-auto p-5">
        <VisualTimeline data={savedTravels}></VisualTimeline>
      </div>
    </div>
  );
}
