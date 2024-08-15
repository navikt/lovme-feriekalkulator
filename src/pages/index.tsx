import { TravelForm } from "@/components/TravelForm";
import { VisualTimeline } from "@/components/VisualTimeline";
import { useEffect, useState } from "react";
import JourneyTable from "@/components/JourneyTable";
import { Travel } from "@/models/Travel";
import { SummaryCard } from "@/components/SummaryCard";
import { setDefaultOptions } from "date-fns";
import { nb } from "date-fns/locale";
import { getAllRedTravels } from "@/utilities/ruleEngine";
setDefaultOptions({ locale: nb });

export default function Home() {
  const [savedTravels, setSavedTravels] = useState<Array<Travel>>([]);
  const [redTravels, setRedTravels] = useState<Array<Travel>>([]);

  useEffect(() => {
    setRedTravels(getAllRedTravels(savedTravels));
  }, [savedTravels]);

  return (
    <div>
      <title>TellMe</title>
      <div className="p-7 py-12 bg-white ">
        <div className="w-full max-w-[1900px] grid grid-cols-12 m-auto gap-4">
          <div className="lg:mx-auto w-full col-span-12 lg:col-span-3">
            <TravelForm
              savedTravels={savedTravels}
              setSavedTravels={setSavedTravels}
            />
          </div>

          <div className="border border-gray-400 justify-self-stretch rounded-lg max-h-[36.4rem] col-span-12 lg:col-span-6 max-w-[60rem] overflow-auto">
            <JourneyTable
              savedTravels={savedTravels}
              setSavedTravels={setSavedTravels}
            />
          </div>

          <div className="justify-self-start w-full col-span-12 lg:col-span-3 md:max-w-[500px]">
            <SummaryCard savedTravels={savedTravels} redTravels={redTravels} />
          </div>
        </div>
      </div>

      <div className="w-3/4 mx-auto p-5">
        <VisualTimeline data={savedTravels} redTravels={redTravels} />
      </div>
    </div>
  );
}
