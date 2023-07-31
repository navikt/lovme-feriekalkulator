import DateChooser from "@/components/DateChooser";
import { VisualTimeline } from "@/components/VisualTimeline";
import { useEffect, useState } from "react";
import JourneyTable from "@/components/JourneyTable";
import { Travel } from "@/models/Travel";
import SummaryCard from "@/components/SummaryCard";
import { setDefaultOptions } from "date-fns";
import { nb } from "date-fns/locale";
import { getAllRedTravels } from "@/utilities/ruleEngine";
setDefaultOptions({ locale: nb });

export default function Home() {
  const [savedTravels, setSavedTravels] = useState<Array<Travel>>([]);
  const [redTravels, setRedTravels] = useState<Array<Travel>>([]);

  useEffect(() => {
    getAllRedTravels(savedTravels, setRedTravels);
  }, [savedTravels]);


  return (
    <div>
      <div className="p-7 py-12 bg-white rounded-xl ">
        <div className="w-full max-w-[1900px] grid grid-cols-12 m-auto gap-4">
          <div className="lg:mx-auto w-full col-span-12 lg:col-span-3">
            <DateChooser
              savedTravels={savedTravels}
              setSavedTravels={setSavedTravels}
            />
          </div>

          <div className="justify-self-stretch rounded-lg max-h-[36rem] col-span-12 lg:col-span-6 max-w-[60rem] overflow-auto">
            <JourneyTable
              savedTravels={savedTravels}
              setSavedTravels={setSavedTravels}
            />
          </div>

          <div className="justify-self-start w-full col-span-12 lg:col-span-3 md:max-w-[500px]">
            <SummaryCard savedTravels={savedTravels} />
          </div>
        </div>
      </div>

      <SummaryCard savedTravels={savedTravels} redTravels={redTravels} />
      <div className="w-3/4 mx-auto p-5">
        <VisualTimeline
          data={savedTravels}
          redTravels={redTravels}
        ></VisualTimeline>

      </div>
    </div>
  );
}
