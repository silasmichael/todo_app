import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {List,ListItem,ListItemText,ListItemAvatar,Avatar} from '@material-ui/core';
import AssignmentIndRoundedIcon from '@material-ui/icons/AssignmentIndRounded';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
}));

function Todo(props) {
    const classes = useStyles();
    if(props.icon==='personal'){
        var av=<AssignmentIndRoundedIcon/>
    }else if (props.icon==='workfire') {
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
                <ListItemText primary={props.task} secondary= {props.when} />
            </ListItem>
        </List>
    )
}

export default Todo
