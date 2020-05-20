import React from 'react';
import { User } from 'services/models/user';
import Circular from 'components/common/atoms/Circular';
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
});

const ResultTable: React.FC<UsersProps> = ({ users, loading }) => {
  const classes = useStyles();

  if (loading) return <Circular />;

  const createData = (order: number, name: string, score: number) => ({
    order,
    name,
    score,
  });

  const sortedUsers = users
    .filter(user => user.score > 0)
    .sort((a, b) => Number(b.score) - Number(a.score));

  const rows = sortedUsers.map((user: User, i: number) => {
    const order = i + 1;
    const name = user.displayName;
    const { score } = user;

    return createData(order, name, score);
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
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResultTable;
