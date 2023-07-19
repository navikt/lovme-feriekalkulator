import { Inter } from "next/font/google";
import DateChooser from "@/components/DateChooser";
import { VisualTimeline } from "@/components/VisualTimeline";
import { useState } from "react";
import JourneyTable from "@/components/JourneyTable";
import { Travel } from "@/models/Travel";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [savedTravels, setSavedTravels] = useState<Array<Travel>>([]);
  return (
    <div className="bg-gray-100 flex flex-wrap items-start gap-[var(--a-spacing-4)] mt-[var(--a-spacing-7)] ">
        
        <DateChooser
          savedTravels={savedTravels}
          setSavedTravels={setSavedTravels}
        />

      <div className="overflow-auto max-h-[648px]">
        <JourneyTable
          savedTravels={savedTravels}
          setSavedTravels={setSavedTravels}
        />
      </div>

      <div className="w-full">
        <VisualTimeline data={savedTravels}></VisualTimeline>
      </div>
    </div>
  );
}
