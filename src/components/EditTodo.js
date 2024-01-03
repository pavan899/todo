import React from 'react'
import {Box, FormGroup, TextField, DialogActions, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// Api related imports
import { UpdateTodo, CreateTodo } from '../services/apiservices';


export default function EditTodo({ todos, id, handleClose, setTodos }) {
    const currentTodo = id ? todos.filter((el) => el.id === id)[0] : {
        title: '',
        completed: false,
        userId: 1,
        currId: Math.max(...todos.map((el) => el.id))
    };
    const { title, completed, userId, currId } = currentTodo;

    const [todoTitle, setTodoTitle] = React.useState(title);
    const [value, setValue] = React.useState(completed?"completed":"incomplete");
    const [loading, setLoading] = React.useState(false);
    const [uid, setUid] = React.useState(userId);

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const saveUpdatedTodo = async () => {
        var data;
        setLoading(true);
        const newData = {
            ...currentTodo,
            title: todoTitle,
            completed: value === "completed" ? true : false,
            id: id || currId + 1
        }
        if (id) {
            data = UpdateTodo(newData)
                .then(() => {
                    handleClose();
                    setTodos((prev) => {
                        return prev.map((el) => {
                            if (el.id !== id) return el;
                            return newData;
                        })
                    })
                })
        } else {
            data = CreateTodo(newData)
                .then((res) => {
                    handleClose();
                    setTodos((prev) => {
                        return [newData, ...prev];
                    })
                })
        }
        data.finally(() => {
            setLoading(false);
        });
    }
    return (
        <>
            <Box>
                <FormGroup sx={{ m: 2, display: 'flex', gap: 2 }}>
                    <TextField size="small" type='number' value={uid} label="User Id" onChange={(e) => setUid(e.target.value)} disabled={Boolean(id)} />
                    <TextField size="small" autoFocus value={todoTitle} label="Title" onChange={(e) => setTodoTitle(e.target.value)} />
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={value}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="completed" control={<Radio />} label="Completed" />
                            <FormControlLabel value="incomplete" control={<Radio />} label="Yet to complete" />
                        </RadioGroup>
                    </FormControl>
                </FormGroup>
            </Box>
            <DialogActions>
                <LoadingButton onClick={handleClose} variant="contained" sx={{ textTransform: 'none' }}>cancel</LoadingButton>
                <LoadingButton loading={loading} onClick={saveUpdatedTodo} variant="outlined" sx={{ textTransform: 'none' }}>Save</LoadingButton>
            </DialogActions>
        </>
    )
}
