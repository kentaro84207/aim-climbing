import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Problem } from 'services/models/problem';
import deleteProblem from 'services/delete-problem';
import { FirebaseContext } from 'contexts';
import grades from 'common/grades';
import paths from 'paths';
import { format } from 'date-fns';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const ProblemList: React.FC<{ problem: Problem }> = ({ problem }) => {
  const { db } = useContext(FirebaseContext);
  const { grade, setterName, id, createdAt } = problem;
  const history = useHistory();
  const createDate = createdAt ? format(createdAt.toDate(), 'yyyy/MM/dd') : '';

  const handleDeleteProblem = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const confirmText = '課題を削除しますか？';
    if (window.confirm(confirmText) && db && id) deleteProblem(db, id);
    history.replace(paths.home);
  };

  return (
    <>
      <ListItem button component={Link} to={`/problem/edit/${id}`}>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText primary={`${createDate} ${grades[grade]} (${setterName})`} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={handleDeleteProblem}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
};

export default ProblemList;
