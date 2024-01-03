import React from 'react'
import { Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

// Local component imports
import EditTodo from './EditTodo';

// Api related imports
import { DeleteTodo } from '../services/apiservices';

export default function EachTodo({ todo, setDialog, handleClose, todos, setTodos }) {
    const { id, title, completed } = todo;
    const [inFocus, setFocus] = React.useState(false);

    const IconButton = ({ theme, Icon, action }) => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 1,
                    bgcolor: `${theme}30`,
                    borderRadius: 1,
                    cursor: 'pointer',
                    ':hover': {
                        transform: 'scale(1.1)'
                    }
                }}
                onClick={action}
            >
                <Icon sx={{ color: theme, fontSize: '20px' }} />
            </Box>
        )
    }

    const hovered = () => {
        setFocus(true);
    }
    const unhovered = () => {
        setFocus(false);
    }
    const editAction = (e) => {
        unhovered()
        setDialog({
            open: true,
            title: "Edit Todo",
            content: <EditTodo todos={todos} setTodos={setTodos} id={id} handleClose={handleClose} />
        });
    }
    const setLoading = (val, id) => {
        setDialog((prev) => {
            if (!prev.buttons) {
                return prev;
            }
            return {
                ...prev,
                buttons: prev.buttons.map((el) => {
                    if(id !== el.id) return el;
                    return {
                        ...el,
                        loading: val
                    }
                })
            }
        })
    }
    const deleteAction = () => {
        unhovered();
        setDialog({
            open: true,
            title: "Delete Todo",
            content: "You cannot undo once deleted, Are You sure You want to delete this todo?",
            buttons: [
                { id: 1, title: 'Cancel', loading: false, variant: "contained", cb: handleClose },
                {
                    id: 2, title: 'Delete', loading: false, variant: "outlined", cb: () => {
                        setLoading(true, 2);
                        DeleteTodo(id)
                            .then((res) => {
                                // Added below part to filter out deleted todo from main list as this delete operation doens't really delete over server it just simulates delete operation
                                setTodos((prev) => {
                                    return prev.filter((el) => el.id !== id);
                                });
                            })
                            .finally(() => {
                                setLoading(false, 2);
                                handleClose();
                            })
                    }
                },
            ]
        });
    }
    return (
        <>
            <Box
                sx={{
                    p: 2,
                    m: 1,
                    boxShadow: '0px 1px 4px #80808054',
                    borderRadius: '4px',
                    display: 'flex',
                    position: 'relative',
                    borderLeft: completed ? '3px solid #4CAF50' : '3px solid #ffc107'
                }}
                onMouseOver={hovered}
                onMouseOut={unhovered}
            >
                <Box title={title} className="txt-container" sx={{ maxWidth: '75%' }}>
                    {
                        Boolean(completed) ? <strike>{title}</strike> : title
                    }
                </Box>
                {
                    inFocus && <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            right: '0px',
                            transform: 'translateY(-50%)',
                            height: '100%',
                            width: '23%',
                            pr: '3%',
                            zIndex: 999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            gap: '6px'
                        }}
                    >
                        <IconButton title="Edit" theme='#ffc107' Icon={Edit} action={editAction} />
                        <IconButton title="Delete" theme='#f44336' Icon={Delete} action={deleteAction} />
                    </Box>
                }
            </Box>
        </>
    )
}
