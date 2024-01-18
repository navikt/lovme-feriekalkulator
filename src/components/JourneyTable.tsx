import { Table } from "@navikt/ds-react";
import {
  differenceInCalendarDays,
  format,
  formatDuration,
  isLeapYear,
} from "date-fns";
import { Dispatch, SetStateAction, useState } from "react";
import { Travel } from "../models/Travel";
import { EditAndDelete } from "./editAndDelete/EditAndDelete";

type SortState = {
  orderBy: keyof Travel;
  direction: "ascending" | "descending";
};

const JourneyTable = ({
  savedTravels,
  setSavedTravels,
}: {
  savedTravels: Travel[];
  setSavedTravels: Dispatch<SetStateAction<Array<Travel>>>;
}) => {
  const [sort, setSort] = useState<SortState>();

  const handleSort = (sortKey: keyof Travel) => {
    setSort((sort) => {
      if (!sort) {
        return {
          orderBy: sortKey,
          direction: "ascending",
        };
      }

      if (sort.orderBy === sortKey && sort.direction === "ascending") {
        return {
          orderBy: sortKey,
          direction: "descending",
        };
      }
      return undefined;
    });
  };

  let sortData: Travel[] = savedTravels;

  sortData = sortData.slice().sort((a, b) => {
    if (sort === undefined) {
      return 1;
    } else if (sort) {
      const comparator = (a: Travel, b: Travel, orderBy: keyof Travel) => {
        if (b[orderBy] < a[orderBy] || b[orderBy] === undefined) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
      };

      return sort.direction === "ascending"
        ? comparator(a, b, sort.orderBy)
        : comparator(b, a, sort.orderBy);
    }
    return 1;
  });

  const handleDeleteTravel = (id: number) => {
    const updatedData = savedTravels.filter((travel) => travel.id !== id);
    setSavedTravels(updatedData);
    sessionStorage.setItem("savedTravels", JSON.stringify(updatedData));
  };

  function handleEditTravel(
    updatedTravel: Travel,
    listToUpdate: Array<Travel>,
    indexToPutTravel: number
  ) {
    const updatedData = [
      ...listToUpdate.slice(0, indexToPutTravel),
      updatedTravel,
      ...listToUpdate.slice(indexToPutTravel),
    ];
    setSavedTravels(updatedData);
    sessionStorage.setItem("savedTravels", JSON.stringify(updatedData));
  }

  const calculateAccurateDuration = (startDate: Date, endDate: Date) => {
    let duration = differenceInCalendarDays(endDate, startDate) + 1;

    if (startDate.getFullYear() !== endDate.getFullYear()) {
      for (
        let year = startDate.getFullYear();
        year <= endDate.getFullYear();
        year++
      ) {
        if (isLeapYear(year)) {
          let feb29 = new Date(year, 1, 29);
          if (startDate <= feb29 && endDate >= feb29) {
            duration += 1;
            break;
          }
        }
      }
    }

    return formatDuration({ days: duration });
  };

  return (
    <div className="relative ">
      <Table
        zebraStripes
        className=""
        sort={sort}
        onSortChange={(sortKey) => handleSort(sortKey as keyof Travel)}
      >
        <Table.Header className="sticky top-0 z-10 bg-gray-50">
          <Table.Row>
            <Table.ColumnHeader className="w-48" sortKey="country" sortable>
              Land
            </Table.ColumnHeader>
            <Table.ColumnHeader sortKey="startDate" sortable>
              Fra (Dato)
            </Table.ColumnHeader>
            <Table.ColumnHeader sortKey="endDate" sortable>
              Til (Dato)
            </Table.ColumnHeader>
            <Table.ColumnHeader sortKey="duration" sortable>
              Varighet
            </Table.ColumnHeader>

            <Table.ColumnHeader sortKey="EEA" sortable>
              EØS
            </Table.ColumnHeader>
            <Table.ColumnHeader sortKey="purpose" sortable>
              Formål
            </Table.ColumnHeader>
            <Table.ColumnHeader></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <>
          <Table.Body>
            {sortData.map(
              ({ id, country, startDate, endDate, EEA, purpose }, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.HeaderCell scope="row">{country}</Table.HeaderCell>
                    <Table.DataCell>
                      {format(new Date(startDate), "dd.MM.yyyy")}
                    </Table.DataCell>
                    <Table.DataCell>
                      {format(new Date(endDate), "dd.MM.yyyy")}
                    </Table.DataCell>
                    <Table.DataCell>
                      {calculateAccurateDuration(
                        new Date(startDate),
                        new Date(endDate)
                      )}
                    </Table.DataCell>
                    <Table.DataCell>{EEA ? "Ja" : "Nei"}</Table.DataCell>
                    <Table.DataCell>{purpose}</Table.DataCell>
                    <Table.DataCell>
                      <EditAndDelete
                        id={id}
                        deleteFunction={handleDeleteTravel}
                        editFunction={handleEditTravel}
                        savedTravels={savedTravels}
                      />
                    </Table.DataCell>
                  </Table.Row>
                );
              }
            )}
          </Table.Body>
        </>
      </Table>
    </div>
  );
};

export default JourneyTable;
