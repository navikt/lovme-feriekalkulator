import DateChooser from "@/components/DateChooser";
import { VisualTimeline } from "@/components/VisualTimeline";
import { useEffect, useState } from "react";
import JourneyTable from "@/components/JourneyTable";
import { Travel } from "@/models/Travel";
import SummaryCard from "@/components/SummaryCard";
import { setDefaultOptions } from "date-fns";
import { nb } from "date-fns/locale";
import { dataCalculationsv2 } from "@/utilities/dataCalculationsv2";
setDefaultOptions({ locale: nb });

export default function Home() {
  const [savedTravels, setSavedTravels] = useState<Array<Travel>>([]);
  const [summary, setSummary] = useState<Array<Summary>>();

  useEffect(() => {
    dataCalculationsv2(savedTravels);
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

      <SummaryCard savedTravels={savedTravels} />
      <div className="w-full">
        <VisualTimeline data={savedTravels}></VisualTimeline>
      </div>
    </div>
  );
}
