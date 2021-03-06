import React from 'react';
import { User } from 'services/models/user';
import Circular from 'components/common/atoms/Circular';
import { getYYMM } from 'utils/getDate';
import mouse from 'images/mouse.svg';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

type UsersProps = { users: User[]; loading?: boolean };

const useStyles = makeStyles({
  table: {
    width: '100%',
  },
  mouse: {
    width: '20px',
    position: 'relative',
    top: '6px',
    left: '5px',
  },
});

const ResultTable: React.FC<UsersProps> = ({ users, loading }) => {
  const classes = useStyles();

  if (loading) return <Circular />;

  const createData = (
    order: number,
    name: string,
    score: number,
    isMouse: boolean | undefined,
  ) => ({
    order,
    name,
    score,
    isMouse,
  });

  const sortedUsers = users
    .filter(user => user.scores && user.scores[getYYMM])
    .sort((a, b) => Number(b.scores[getYYMM]) - Number(a.scores[getYYMM]));

  const rows = sortedUsers.map((user: User, i: number) => {
    const order = i + 1;
    const name = user.displayName;
    const { scores, isMouse } = user;
    const score = scores[getYYMM];

    return createData(order, name, score, isMouse);
  });

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>順位</TableCell>
            <TableCell align="right">名前</TableCell>
            <TableCell align="right">スコア</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.order}
              </TableCell>
              <TableCell align="right">
                {row.name}
                {row.isMouse && <img className={classes.mouse} src={mouse} alt="mouse" />}
              </TableCell>
              <TableCell align="right">{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResultTable;
