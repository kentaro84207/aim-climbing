import React from 'react';
import { Link } from 'react-router-dom';
import { Problem } from 'services/models/problem';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const ProblemList: React.FC<{ problem: Problem }> = ({ problem }) => {
  const { name, id } = problem;

  return (
    <>
      <ListItem button component={Link} to={`/problem/edit/${id}`}>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText primary={name} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
};

export default ProblemList;
