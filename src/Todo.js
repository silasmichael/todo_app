import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {List,ListItem,ListItemText,ListItemAvatar,Avatar, IconButton, ListItemSecondaryAction, FormControl, InputLabel, Input, Select, MenuItem, TextField, Button, NativeSelect} from '@material-ui/core';
import AssignmentIndRoundedIcon from '@material-ui/icons/AssignmentIndRounded';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import db from './firebase';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import PropTypes from 'prop-types';
import UpdateIcon from '@material-ui/icons/Update';
import CancelIcon from '@material-ui/icons/Cancel';
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        display:'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
      updatebtn:{
        display:'flex',
        justifyContent:'space-between'
      }
}));
const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
      from: { opacity: 0 },
      to: { opacity: open ? 1 : 0 },
      onStart: () => {
        if (open && onEnter) {
          onEnter();
        }
      },
      onRest: () => {
        if (!open && onExited) {
          onExited();
        }
      },
    });
  
    return (
      <animated.div ref={ref} style={style} {...other}>
        {children}
      </animated.div>
    );
  });
  
  Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool.isRequired,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
  };
  


function Todo(props) {
    const [open, setOpen] = useState(false);
    // const [icon, setIcon] = useState()
    const [input, setInput] = useState(props.task);
    const [tnow, setTnow] = useState(props.when)
    const [category, setCategory] = useState(props.category);
    const classes = useStyles();
    const updateTodo = () =>{
        db.collection('todos').doc(props.id).set({
            category:category,
            deadline:tnow,
            todo:input
        },{merge:true})
        setOpen(false)
    }
    if(props.icon==='personal'){
        var av=<AssignmentIndRoundedIcon/>
        // setIcon(<AssignmentIndRoundedIcon/>)
    }else if (props.icon==='work') {
        var av=<WorkIcon/>
        // setIcon(<WorkIcon/>)
    } else {
        var av=<BeachAccessIcon/>
        // setIcon(<BeachAccessIcon/>)
    }
    return (
        <List className={classes.root}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        {/* {icon} */}
                        {av}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={props.task} secondary= {props.when} />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick = {event=> {db.collection('todos').doc(props.id).delete()}}>
                      <DeleteIcon  />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick = {event=> {setOpen(true)}}>
                      <EditIcon  />
                    </IconButton>
                  </ListItemSecondaryAction>
                  <Modal
                        aria-labelledby="spring-modal-title"
                        aria-describedby="spring-modal-description"
                        className={classes.modal}
                        open={open}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                        timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                        <div className={classes.paper}>
                            <FormControl className={classes.formControl}>
                              {/* <InputLabel>✅ Write a Todo </InputLabel> */}
                              <TextField value={input} label= '✅ Write a Todo' placeholder={props.task}
                                onChange = {event => setInput(event.target.value)} />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                              <InputLabel id="demo-simple-select-label">👓Category</InputLabel>
                              <NativeSelect
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                placeholder={props.category}
                                defaultValue={props.category}
                                value={category}
                                onChange={event => setCategory(event.target.value)}
                              >
                                <option value='work'>Work</option>
                                <option value='personal'>Personal</option>
                                <option value='fun'>Fun</option>
                              </NativeSelect>
                            </FormControl >
                            <TextField
                              id="datetime-local"
                              label="When"
                              type="datetime-local"
                              value={tnow}
                              className={classes.formControl}
                              onChange = {event => setTnow(event.target.value)}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                            <div className={classes.updatebtn}>
                            <IconButton edge="end" width='50'  aria-label="delete" onClick = {event=> {setOpen(false)}}>
                              <CancelIcon  />
                              </IconButton>
                            <Button variant="contained" disabled = {!input}
                              className={classes.button} startIcon={<UpdateIcon />} onClick={updateTodo}>Update ToDo</Button>
                            </div>
                            
                        </div>
                        </Fade>
                    </Modal>
            </ListItem>
        </List>
    )
}

export default Todo
