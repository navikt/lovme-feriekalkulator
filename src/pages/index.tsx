import DateChooser from "@/components/DateChooser";
import { VisualTimeline } from "@/components/VisualTimeline";
import { useState } from "react";
import JourneyTable from "@/components/JourneyTable";
import { Travel } from "@/models/Travel";

export default function Home() {
  const [savedTravels, setSavedTravels] = useState<Array<Travel>>([]);
  return (
    <div className=" flex flex-wrap items-start gap-[var(--a-spacing-4)] mt-[var(--a-spacing-7)] ">
      <title>Feriekalkulator</title>

      <DateChooser
        savedTravels={savedTravels}
        setSavedTravels={setSavedTravels}
      />

   
        <JourneyTable
          savedTravels={savedTravels}
          setSavedTravels={setSavedTravels}
        />

      <div className="w-full">
        <VisualTimeline data={savedTravels}></VisualTimeline>
      </div>
    </div>
  );
}
