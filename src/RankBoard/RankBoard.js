import { useEffect, useState, useMemo } from "react";
import propTypes from "prop-types";
import { styled } from "@mui/material/styles";

import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import CloseIcon from "@mui/icons-material/Close";

import { useLiveQuery } from "dexie-react-hooks";

import { db } from "../db";
import styles from "./RankBoard.module.css";
import { getElementByPropsVal, getModifiedDate } from "../utils";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: "0 0 4px 4px",
  backgroundColor: "antiquewhite !important",
}));

const STableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#023c2c",
    color: theme.palette.common.white,
    fontWeight: 800,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const Outlet = ({ level, setLevel, onClose, children }) => {
  const selectedNavItem = `${styles.navItem} ${styles.navItemSelected}`;
  const normalNavItem = styles.navItem;

  return (
    <div className={styles.root}>
      <div className={styles.closeBtn} onClick={() => onClose()}>
        <CloseIcon />
      </div>
      <div className={styles.header}>
        <Typography variant="h3">Ranking</Typography>
      </div>
      <div className={styles.nav}>
        <div
          className={level === "easy" ? selectedNavItem : normalNavItem}
          onClick={() => setLevel("easy")}
        >
          Easy
        </div>
        <div
          className={level === "med" ? selectedNavItem : normalNavItem}
          onClick={() => setLevel("med")}
        >
          Medium
        </div>
        <div
          className={level === "hard" ? selectedNavItem : normalNavItem}
          onClick={() => setLevel("hard")}
        >
          Hard
        </div>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
};

Outlet.propTypes = {
  level: propTypes.string.isRequired,
  setLevel: propTypes.func.isRequired,
  children: propTypes.node.isRequired,
  onClose: propTypes.func.isRequired,
};

function RankBoard({ onClose }) {
  const [list, setList] = useState([]);
  const [level, setLevel] = useState("easy");
  const [page, setPage] = useState(0);

  const allItems = useLiveQuery(() => db.result.toArray(), []);

  const easyItems = useMemo(
    () => getElementByPropsVal(allItems, "level", "easy", "date"),
    [allItems]
  );
  const medItems = useMemo(
    () => getElementByPropsVal(allItems, "level", "med", "date"),
    [allItems]
  );
  const hardItems = useMemo(
    () => getElementByPropsVal(allItems, "level", "hard", "date"),
    [allItems]
  );

  useEffect(() => {
    switch (level) {
      case "med":
        setList(medItems);
        break;
      case "hard":
        setList(hardItems);
        break;
      case "easy":
      default:
        setList(easyItems);
        break;
    }
  }, [level, easyItems, medItems, hardItems]);

  if (!allItems) {
    return (
      <>
        <Outlet level={level} setLevel={setLevel} onClose={onClose}>
          There is no result yet!
        </Outlet>
      </>
    );
  }

  const rowsPerPage = 5;
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - list.length) : 0;
  const listToDisplay = list?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Outlet level={level} setLevel={setLevel} onClose={onClose}>
      <TableContainer component={StyledPaper}>
        <Table
          className={styles.table}
          sx={{ width: "100%" }}
          aria-label="result table"
        >
          <TableHead className={styles.tableHead}>
            <TableRow>
              <STableCell align="center">Game</STableCell>
              <STableCell align="center">Result&nbsp;(seconds)</STableCell>
              <STableCell align="center">Date</STableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listToDisplay?.map((item, index) => {
              const { date, result } = item;
              const dateInDateFm = new Date(date);
              const dateTrim = dateInDateFm
                .toDateString()
                .replaceAll(/\s/g, "");
              const formatDate = getModifiedDate(date);
              return (
                <TableRow
                  className={styles.listItem}
                  key={`${result}_${index}_${dateTrim}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <STableCell align="center" className={styles.index}>
                    {index + 1}
                  </STableCell>
                  <STableCell align="center" className={styles.resultCell}>
                    {result.toFixed(1)}
                  </STableCell>
                  <STableCell align="center" className={styles.dateCell}>
                    {formatDate}
                  </STableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={3}
                count={list.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                labelRowsPerPage=""
                rowsPerPageOptions={[]}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Outlet>
  );
}

export default RankBoard;
RankBoard.defaultProps = {
  open: false,
};
RankBoard.propTypes = {
  open: propTypes.bool,
  onClose: propTypes.func.isRequired,
};
