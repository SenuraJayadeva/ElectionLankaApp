import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columns = [
  { id: "ID", label: "පක්ෂ අංකය", minWidth: 170 },
  { id: "PartyName", label: "පක්ෂය", minWidth: 100 },
  {
    id: "PartyLogo",
    label: "පක්ෂ ලාංචනය",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(ID, PartyName, PartyLogo) {
  return { ID, PartyName, PartyLogo };
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function PartyTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [parties, setParties] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    const config = {
      headers: {
        "api-key": "0d9e15c7-3189-4402-8e3f-e5073ff00281",
      },
    };

    axios
      .get("https://janawarama.helakuru.lk/api/election/parties", config)
      .then(({ data }) => {
        console.log(data);
        console.log(data.data.length);

        if (data.data.length > 0) {
          setParties(data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const rows = parties.map((currentparty) => {
    return createData(
      currentparty.PARTY_ID,
      currentparty.PARTY_NAME,
      currentparty.PARTY_LOGO
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="container">
      <br />
      <br />
      <Paper
        className={classes.root}
        style={{
          padding: "30px",
          background: "linear-gradient(45deg, #ededed 30%, #fcfcfc 90%)",
          borderRadius: "20px",
          boxShadow: "10px 5px 10px rgba(110, 107, 107, 0.548)",
        }}
      >
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {/* {column.format && typeof value === "number"
                            ? column.format(value)
                            : value} */}

                            {column.id === "PartyLogo" ? (
                              <img
                                src={value}
                                alt="partylogo"
                                style={{ width: "45px" }}
                              />
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
