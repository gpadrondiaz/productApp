import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TableSortLabel,
  Paper
} from "@material-ui/core";
import SearchBar from "material-ui-search-bar";


function ProductTable({data, sortBy, sortOrder, onSortBy, onSearch, onCancelSearch, searched}) {
 
  return (
    <React.Fragment>
      <Paper>
      <SearchBar
          value={searched}
          onChange={(searchVal) => onSearch(searchVal)}
          onCancelSearch={() => onCancelSearch()}
        />
        <Table  stickyHeader size='medium'>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                    active={sortBy === "name"}
                    direction={sortOrder}
                    onClick={() => onSortBy("name")}
                >
                    Name
                </TableSortLabel>
               </TableCell>
              <TableCell>
                <TableSortLabel
                    active={sortBy === "code"}
                    direction={sortOrder}
                    onClick={() => onSortBy("code")}
                >
                    Code
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                    active={sortBy === "availability"}
                    direction={sortOrder}
                    onClick={() => onSortBy("availability")}
                >
                    Availability
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                    active={sortBy === "needing_repair"}
                    direction={sortOrder}
                    onClick={() => onSortBy("needing_repair")}
                >
                    Need to repair
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                    active={sortBy === "durability"}
                    direction={sortOrder}
                    onClick={() => onSortBy("durability")}
                >
                    Durability
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                    active={sortBy === "mileage"}
                    direction={sortOrder}
                    onClick={() => onSortBy("mileage")}
                >
                    Mileage
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {data.map((item, indx) => {
              return (
                <TableRow key={indx} data-testid={`product-row-test-id-${indx}`}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.code}</TableCell>
                  <TableCell>{item.availability.toString()}</TableCell>
                  <TableCell>{item.needing_repair.toString()}</TableCell>
                  <TableCell>{item.durability}/{item.max_durability}</TableCell>
                  <TableCell>{item.mileage}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter />
        </Table>
      </Paper>
    </React.Fragment>
  );
}

export default ProductTable;
