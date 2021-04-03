import './App.css';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
    text: {
        alignItems: 'center',
        margin: "5px 0",
        maxWidth: "80%"
    },
    btn: {
        margin: "5px 0"
    },
    completed: {
        textDecoration: 'line-through'
    }
}));

function App() {
    const classes = useStyles();

    const initialTodo = { id: Math.random(), body: "Hello World!", completed: false }

    const [todos, setTodos] = useState([initialTodo])
    const [enteredTodo, setEnteredTodo] = useState('')

    const addTodo = () => {
        setTodos([{ id: Math.random(), body: enteredTodo, completed: false }, ...todos])
        setEnteredTodo('')
    }

    let updatedTodos
    const completeTodo = (todoId) => {
        updatedTodos = todos.map(todo => {
            if(todo.id === todoId){
                return { ...todo, completed: !todo.completed }
            }
            return todo
        })
        setTodos(updatedTodos)
    }


    const deleteTodo = (todoId) => {
        updatedTodos = todos.filter(todo => todo.id !== todoId)
        setTodos(updatedTodos)
    }

    return (
        <div className="App">
            <h2>Todos List</h2>

            <Container>

                <TextField
                    className={classes.text}
                    id="standard-multiline-static"
                    label="Add Todo"
                    multiline
                    fullWidth
                    value={enteredTodo}
                    onChange={e => setEnteredTodo(e.target.value)}
                    rows={4}
                />
                <br/>
                <Button className={classes.btn} onClick={addTodo} variant="contained" color="primary">
                    Add Todo
                </Button>

                { (!todos || todos.length === 0) && (
                    <h3 style={{ textAlign: "center" }}>No Provided Todo</h3>
                ) }

                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            {todos.map((todo) => (
                                <TableRow key={todo.id}>
                                    <TableCell className={todo.completed ? classes.completed : ""} component="th" scope="row">
                                        {todo.body}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => completeTodo(todo.id)}  aria-label="complete" color="primary">
                                            { todo.completed ? <CheckCircleIcon /> : <CheckCircleOutlineIcon/> }
                                        </IconButton>
                                        <IconButton onClick={() => deleteTodo(todo.id)} aria-label="delete" color="secondary">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    );
}

export default App;
