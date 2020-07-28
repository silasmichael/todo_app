import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {List,ListItem,ListItemText,ListItemAvatar,Avatar, IconButton, ListItemSecondaryAction} from '@material-ui/core';
import AssignmentIndRoundedIcon from '@material-ui/icons/AssignmentIndRounded';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import DeleteIcon from '@material-ui/icons/Delete';
import db from './firebase'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
}));

function Todo(props) {
    const classes = useStyles();
    var id = String(props.id);
    if(props.icon==='personal'){
        var av=<AssignmentIndRoundedIcon/>
    }else if (props.icon==='work') {
        var av=<WorkIcon/>
    } else {
        var av=<BeachAccessIcon/>
    }
    return (
        <List className={classes.root}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        {av}
                    </Avatar>
                </ListItemAvatar>
                {console.log(props.task)}
                <ListItemText primary={props.task} secondary= {props.when} />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick = {event=> {db.collection('todos').doc(id).delete()}}>
                      <DeleteIcon  />
                    </IconButton>
                  </ListItemSecondaryAction>
            </ListItem>
        </List>
    )
}

export default Todo
