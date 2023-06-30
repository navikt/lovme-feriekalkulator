import { Table } from "@navikt/ds-react";
import { format } from "date-fns";
import { useState } from "react";

interface Journey {
  name: string;
  fnr: string;
  start: string;
}

type SortState = {
  orderBy: keyof Journey;
  direction: "ascending" | "descending";
};

const JourneyTable: React.FC = () => {
  const [sort, setSort] = useState<SortState | undefined>(undefined);

  const handleSort = (sortKey: keyof Journey) => {
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

      return {
        orderBy: sortKey,
        direction: "ascending",
      };
    });
  };

  let sortData: Journey[] = data;

  sortData = sortData.slice().sort((a, b) => {
    if (sort) {
      const comparator = (a: Journey, b: Journey, orderBy: keyof Journey) => {
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
        onSortChange={(sortKey) => handleSort(sortKey as keyof Journey)}
      >
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader sortKey="name" sortable>
              Navn
            </Table.ColumnHeader>
            <Table.HeaderCell scope="col">Fødseslnr.</Table.HeaderCell>
            <Table.ColumnHeader sortKey="start" sortable>
              Start
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortData.map(({ name, fnr, start }, i) => {
            return (
              <Table.Row key={i + fnr}>
                <Table.HeaderCell scope="row">{name}</Table.HeaderCell>
                <Table.DataCell>{fnr}</Table.DataCell>
                <Table.DataCell>
                  {format(new Date(start), "dd.MM.yyyy")}
                </Table.DataCell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
};

const data: Journey[] = [
  {
    name: "Jakobsen, Markus",
    fnr: "22106248460",
    start: "2016-08-18T09:41:26.131Z",
  },
  {
    name: "Andersen, Ingrid",
    fnr: "11037638557",
    start: "2018-08-01T10:26:12.176Z",
  },
  {
    name: "Evensen, Jonas",
    fnr: "18106248460",
    start: "2010-07-17T11:13:26.116Z",
  },
];

export default JourneyTable;
