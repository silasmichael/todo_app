import React,{useState, useEffect} from 'react';
import './App.css';
import Todo from './Todo';
import {Button,FormControl, InputLabel, Input,TextField, makeStyles, MenuItem, Select} from '@material-ui/core';
import PlaylistAddRoundedIcon from '@material-ui/icons/PlaylistAddRounded';
import firebase from 'firebase';
import db from './firebase';


const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    button: {
      margin: theme.spacing(1),
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
  
    },
  }));

function Main(props) {
    let time = new Date().toLocaleString();
    const classes = useStyles();
    const [input, setInput] = useState('');
    const [todos, setTodos] = useState([])
    const [tnow, setTnow] = useState(time)
    const [category, setCategory] = useState('work');
  
    useEffect(() => {
      // db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot =>{setTodos(snapshot.docs.forEach(function (doc) {
      //   var todo= doc.data().todo;
      //   var category = doc.data().category;
      //   var deadline = doc.data().deadline;
      //   var task ={'todo':todo, 'category':category, 'when':deadline}
      //   return task
      // }))})
      db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot=>{setTodos(snapshot.docs.map(doc=>doc.data()))})
    }, []);
  
  
    const addTodo = (event) => {
      db.collection('todos').add({
        todo:input,
        category:category,
        deadline:tnow,
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
      })
      setInput('');
      setCategory('work');
      setTnow(time);
      // console.log(todos)
    };
    
    return (
      <div className="App">
        <form>
          <div>
            <h1 className = "Task">Welcome Back {props.name}</h1>
            <FormControl className={classes.formControl}>
              <InputLabel>✅ Write a Todo </InputLabel>
              <Input value = {input} onChange = {event => setInput(event.target.value)}/>
            </FormControl>
          <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">👓Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            onChange={event => setCategory(event.target.value)}
          >
            <MenuItem value='work'>Work</MenuItem>
            <MenuItem value='personal'>Personal</MenuItem>
            <MenuItem value='fun'>Fun</MenuItem>
          </Select>
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
          </div>
          <Button variant="contained" disabled = {!input}
           className={classes.button} startIcon={<PlaylistAddRoundedIcon />} onClick={addTodo}>Add ToDo</Button>
        </form>
        <h2 className = "Task">Tasks To Do</h2>
        <ul>
          {
            todos.map(todo => (
              <Todo icon= {todo.category} task={todo.todo} when={todo.deadline} id={todo.ID}/>
            ))
          }
            {/* <Todo icon= '' task={} when=''/> */}
        </ul>
      </div>
      
    );
  }

export default Main