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
    <div className=" flex flex-wrap items-start gap-4 p-7 ">
      <title>Feriekalkulator</title>

      <DateChooser
        savedTravels={savedTravels}
        setSavedTravels={setSavedTravels}
      />

      <JourneyTable
        savedTravels={savedTravels}
        setSavedTravels={setSavedTravels}
      />

      <SummaryCard savedTravels={savedTravels} redTravels={redTravels} />
      <div className="w-full">
        <VisualTimeline
          data={savedTravels}
          redTravels={redTravels}
        ></VisualTimeline>
      </div>
    </div>
  );
}
