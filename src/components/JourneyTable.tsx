import { Table } from "@navikt/ds-react";
import { format, formatDuration } from "date-fns";
import { Dispatch, SetStateAction, useState } from "react";
import { Travel } from "../models/Travel";
import { EditAndDelete } from "./EditAndDelete";
import "./JourneyTable.css";

type SortState = {
  orderBy: keyof Travel;
  direction: "ascending" | "descending";
};

const JourneyTable = ({
  data,
  setTableData,
}: {
  data: Travel[];
  setTableData: Dispatch<SetStateAction<Array<Travel>>>;
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

  let sortData: Travel[] = data;

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

  const handleDeleteReise = (id: number) => {
    const updatedData = data.filter((reise) => reise.id !== id); // Filter out the row with the specified ID
    setTableData(updatedData);
    sessionStorage.setItem("tableData", JSON.stringify(updatedData)); // Update the state
  };

  return (
    <>
      <Table
        sort={sort}
        onSortChange={(sortKey) => handleSort(sortKey as keyof Travel)}
      >
        <Table.Header className="tableheader">
          <Table.Row>
            <Table.ColumnHeader sortKey="land" sortable>
              Land
            </Table.ColumnHeader>
            <Table.ColumnHeader sortKey="fraDato" sortable>
              Fra (Dato)
            </Table.ColumnHeader>
            <Table.ColumnHeader sortKey="tilDato" sortable>
              Til (Dato)
            </Table.ColumnHeader>
            <Table.ColumnHeader sortKey="varighet" sortable>
              Varighet
            </Table.ColumnHeader>

            <Table.ColumnHeader sortKey="EØS" sortable>
              EØS
            </Table.ColumnHeader>
            <Table.ColumnHeader sortKey="formål" sortable>
              Formål
            </Table.ColumnHeader>
            <Table.ColumnHeader>Action</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortData.map(
            ({ id, country: land, startDate: fraDato, endDate: tilDato, EEA: EØS, purpose: formål, duration: varighet }, i) => {
              return (
                <Table.Row key={i}>
                  <Table.HeaderCell scope="row">{land}</Table.HeaderCell>
                  <Table.DataCell>
                    {format(new Date(fraDato), "dd.MM.yyyy")}
                  </Table.DataCell>
                  <Table.DataCell>
                    {format(new Date(tilDato), "dd.MM.yyyy")}
                  </Table.DataCell>
                  <Table.DataCell>
                    {formatDuration({ days: varighet })}
                  </Table.DataCell>
                  <Table.DataCell>{EØS ? "Ja" : "Nei"}</Table.DataCell>
                  <Table.DataCell>{formål}</Table.DataCell>
                  <Table.DataCell>
                    <EditAndDelete
                      id={id}
                      deleteFunction={handleDeleteReise}
                    />
                  </Table.DataCell>
                </Table.Row>
              );
            }
          )}
        </Table.Body>
      </Table>
    </>
  );
};

export default JourneyTable;
