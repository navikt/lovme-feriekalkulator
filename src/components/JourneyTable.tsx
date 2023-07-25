import { Table } from "@navikt/ds-react";
import { format, formatDuration } from "date-fns";
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
    const updatedData = savedTravels.filter((travel) => travel.id !== id); // Filter out the row with the specified ID
    setSavedTravels(updatedData);
    sessionStorage.setItem("savedTravels", JSON.stringify(updatedData)); // Update the state
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

  return (
    <div className="relative">
      <Table
        zebraStripes
        className=""
        sort={sort}
        onSortChange={(sortKey) => handleSort(sortKey as keyof Travel)}
      >
        <Table.Header className="sticky top-0 z-10 bg-gray-100">
          <Table.Row>
            <Table.ColumnHeader sortKey="country" sortable>
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
            <Table.ColumnHeader>Action</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <>
          <Table.Body>
            {sortData.map(
              (
                { id, country, startDate, endDate, EEA, purpose, duration },
                i
              ) => {
                return (
                  <Table.Row key={i}>
                    <Table.HeaderCell scope="row">{country}</Table.HeaderCell>
                    <Table.DataCell>
                      {format(new Date(startDate), "dd.MM.yyyy")}
                    </Table.DataCell>
                    <Table.DataCell>
                      {format(new Date(endDate), "dd.MM.yyyy")}
                    </Table.DataCell>
                    <Table.DataCell>
                      {formatDuration({ days: duration })}
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
