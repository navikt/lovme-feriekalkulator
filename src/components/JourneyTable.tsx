import { Table } from "@navikt/ds-react";
import { format } from "date-fns";
import { useState } from "react";
import { Reise } from "../models/Reise";

type SortState = {
  orderBy: keyof Reise;
  direction: "ascending" | "descending";
};

const JourneyTable = ({ data }: { data: Reise[] }) => {
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

  return (
    <>
      <Table
        sort={sort}
        onSortChange={(sortKey) => handleSort(sortKey as keyof Reise)}
      >
        <Table.Header>
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
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortData.map(
            ({ land, fraDato, tilDato, varighet, EØS, formål }, i) => {
              return (
                <Table.Row key={i}>
                  <Table.HeaderCell scope="row">{land}</Table.HeaderCell>
                  <Table.DataCell>
                    {format(new Date(fraDato), "dd.MM.yyyy")}
                  </Table.DataCell>
                  <Table.DataCell>
                    {format(new Date(tilDato), "dd.MM.yyyy")}
                  </Table.DataCell>
                  <Table.DataCell>{varighet} dager</Table.DataCell>
                  <Table.DataCell>{EØS ? "Ja" : "Nei"}</Table.DataCell>
                  <Table.DataCell>{formål}</Table.DataCell>
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
