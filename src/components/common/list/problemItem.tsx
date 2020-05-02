import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Problem } from 'services/models/problem';
import deleteProblem from 'services/delete-problem';
import { FirebaseContext } from 'contexts';
import paths from 'paths';
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
  const { name, id } = problem;
  const history = useHistory();

  const handleDeleteProblem = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const confirmText = `${name}を削除しますか？`;
    if (window.confirm(confirmText) && db && id) deleteProblem(db, id);
    history.replace(paths.home);
  };

  return (
    <>
      <ListItem button component={Link} to={`/problem/edit/${id}`}>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText primary={name} />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={handleDeleteProblem}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
};

export default ProblemList;
