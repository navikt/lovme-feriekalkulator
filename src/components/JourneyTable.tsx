import { Table } from "@navikt/ds-react";
import { differenceInCalendarDays, format, formatDuration } from "date-fns";
import { Dispatch, SetStateAction, useState } from "react";
import { Reise } from "../models/Reise";
import { RedigerSlettDropdown } from "./RedigerSletteDropdown";
import "./JourneyTable.css";

type SortState = {
  orderBy: keyof Reise;
  direction: "ascending" | "descending";
};

const JourneyTable = ({
  data,
  setTableData,
}: {
  data: Reise[];
  setTableData: Dispatch<SetStateAction<Array<Reise>>>;
}) => {
  const [sort, setSort] = useState<SortState>();

  const handleSort = (sortKey: keyof Reise) => {
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

  let sortData: Reise[] = data;

  sortData = sortData.slice().sort((a, b) => {
    if (sort === undefined) {
      return 1;
    } else if (sort) {
      const comparator = (a: Reise, b: Reise, orderBy: keyof Reise) => {
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
        onSortChange={(sortKey) => handleSort(sortKey as keyof Reise)}
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
          {sortData.map(({ id, land, fraDato, tilDato, EØS, formål }, i) => {
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
                  {formatDuration({
                    days: differenceInCalendarDays(tilDato, fraDato),
                  })}
                </Table.DataCell>
                <Table.DataCell>{EØS ? "Ja" : "Nei"}</Table.DataCell>
                <Table.DataCell>{formål}</Table.DataCell>
                <Table.DataCell>
                  <RedigerSlettDropdown
                    id={id}
                    deleteFunction={handleDeleteReise}
                  />
                </Table.DataCell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
};

export default JourneyTable;
