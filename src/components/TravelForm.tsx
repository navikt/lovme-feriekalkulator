import { Button, Heading, Panel } from "@navikt/ds-react";
import { differenceInCalendarDays } from "date-fns";
import ConfettiExplosion from "react-confetti-explosion";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Travel } from "../models/Travel";
import { CustomDatePicker } from "./CustomDatePicker";
import { Purpose } from "./Purpose";
import { CountryChooser } from "./CountryChooser";
import { ParasolBeachIcon } from "@navikt/aksel-icons";
import { DeleteModal } from "./editAndDelete/DeleteModal";
import { errorHandler } from "@/utilities/errorHandler";

export const TravelForm = ({
  savedTravels,
  setSavedTravels,
}: {
  savedTravels: Array<Travel>;
  setSavedTravels: Dispatch<SetStateAction<Array<Travel>>>;
}) => {
  const [country, setCountry] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [EEA, setEEA] = useState<boolean>(false);
  const [purpose, setPurpose] = useState("Ferie");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [isExplodingConfetti, setIsExplodingConfetti] = useState(false);
  const datePickerRef = useRef<any>();

  useEffect(() => {
    const dataString = sessionStorage.getItem("savedTravels");
    const savedTravels: Array<Travel> = dataString
      ? JSON.parse(dataString)
      : [];
    setSavedTravels(
      savedTravels.map((travel) => ({
        ...travel,
        endDate: new Date(travel.endDate),
        startDate: new Date(travel.startDate),
      }))
    );
  }, [setSavedTravels]);

  useEffect(() => {
    if (startDate) {
      setStartDateError(false);
    }
    if (endDate) {
      setEndDateError(false);
    }
    if (country) {
      setCountryError(false);
    }
  }, [startDate, endDate, country]);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const hasError = errorHandler(
      startDate,
      endDate,
      country,
      setStartDateError,
      setEndDateError,
      setCountryError
    );

    if (hasError) {
      return;
    }

    let newTravel: Travel = {
      id: Date.now(),
      country: country,
      startDate: startDate!,
      endDate: endDate!,
      EEA: EEA,
      purpose: purpose,
      duration: differenceInCalendarDays(endDate!, startDate!),
    };

    const copy = [...savedTravels];
    copy.push(newTravel);
    setSavedTravels(copy);
    sessionStorage.setItem("savedTravels", JSON.stringify(copy));

    resetInputFields();
  };

  const resetInputFields = () => {
    setCountry("");
    setStartDate(undefined);
    setEndDate(undefined);
    setEEA(false);
    setPurpose("Ferie");
    if (datePickerRef.current && datePickerRef.current.reset) {
      datePickerRef.current.reset();
    }
  };

  const handleDeleteAll = () => {
    setSavedTravels([]);
    sessionStorage.clear();
  };

  const handleConfettiExplosion = () => {
    setIsExplodingConfetti(true);
    setTimeout(() => {
      setIsExplodingConfetti(false);
    }, 3000);
  };

  return (
    <div>
      <Panel className="relative rounded-lg h-full border-gray-400">
        <div
          id="icon-container"
          className="before:absolute before:-top-[2rem] before:rounded-full before:bg-orange-200 before:h-16 before:w-16 my-0 mx-auto text-center flex items-center justify-center"
        >
          <ParasolBeachIcon
            onClick={() => handleConfettiExplosion()}
            className="align-middle text-[3rem] absolute -top-[1.5rem]"
            aria-hidden
          />
          {isExplodingConfetti ? <ConfettiExplosion /> : null}
        </div>
        <div id="form-container" className="mt-4">
          <Heading level="1" size="xlarge">
            TellMe
          </Heading>
          <Heading className="mb-8" level="2" size="xsmall" textColor="subtle">
            Oppholdskalkulator
          </Heading>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div>
              <CountryChooser
                chosenCountry={country}
                setCountry={setCountry}
                setEEA={setEEA}
                countryError={countryError}
              />
            </div>
            <CustomDatePicker
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              ref={datePickerRef}
              savedTravels={savedTravels}
              selectedDates={undefined}
              startDateError={startDateError}
              endDateError={endDateError}
            />
            <Purpose purpose={purpose} setPurpose={setPurpose} />
            <div className="gap-5 flex flex-row justify-between">
              <Button className="basis-2/5" variant="primary" type="submit">
                Legg til
              </Button>
              {savedTravels.length > 0 ? (
                <Button
                  className="basis-2/5"
                  variant="danger"
                  onClick={() => setOpenDeleteModal(true)}
                  type="button"
                >
                  Slett tabelldata
                </Button>
              ) : null}
            </div>
          </form>
        </div>
      </Panel>
      {openDeleteModal ? (
        <DeleteModal
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          deleteFunction={() => handleDeleteAll()}
          modalText="Er du sikker på at du vil starte på nytt?"
          description="(Du mister all data i tabellen)"
          yesButton="Slett tabelldata"
          noButton="Avbryt"
        />
      ) : null}
    </div>
  );
};
