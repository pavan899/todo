import React from 'react';
import {
  Box,
  Grid,
  Button,
  CircularProgress,
  Snackbar
} from '@mui/material';
import { Add } from '@mui/icons-material';

// Local component imports
import EachTodo from './EachTodo';
import DialogContainer from './DialogContainer';
import EditTodo from './EditTodo';

// Api related imports
import { ListTodos } from '../services/apiservices';

const initialDialog = {
  open: false,
  title: null,
  content: null,
  buttons: null
};

export default function LandingPage() {
  const [todos, setTodos] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [dialogStatus, setDialogStatus] = React.useState(initialDialog);
  const [snackBar, setSnackBar] = React.useState({
    open: false,
    message: ''
  })

  const handleClose = () => {
    setDialogStatus(initialDialog);
  };

  const closeSnackbar = () => {
    setSnackBar({
      open: false,
      message: ''
    })
  }

  React.useEffect(() => {
    setLoading(true);
    ListTodos()
      .then((data) => {
        setTodos(data);
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  const addNewTodo = (e) => {
    setDialogStatus({
      open: true,
      title: "Create New Todo",
      content: <EditTodo todos={todos} setTodos={setTodos} handleClose={handleClose} setSnackBar={setSnackBar} />
    });
  }

  return (
    <>
      <DialogContainer
        open={dialogStatus.open}
        handleClose={handleClose}
        title={dialogStatus.title}
        content={dialogStatus.content}
        buttons={dialogStatus.buttons}
      />
      <Grid
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            minWidth: '350px',
            width: '30%',
            backgroundColor: 'white',
            height: '80%',
            borderRadius: 2,
            position: 'relative'
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              position: 'relative',
              overflow: 'auto'
            }}
          >
            <Box sx={{ m: 3, height: '100%' }}>
              {
                todos && !loading ? todos.map((todo) => {
                  return <EachTodo key={todo.id} todo={todo} setDialog={setDialogStatus} handleClose={handleClose} setSnackBar={setSnackBar} todos={todos} setTodos={setTodos} />
                }) : (loading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '95%' }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '95%' }}>
                    Error Loading Data!
                  </Box>
                ))
              }
            </Box>
          </Box>
          <Box sx={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translate(-50%, 50%)'
          }}
          >
            <Button
              variant='contained'
              sx={{
                borderRadius: '100px',
                textTransform: 'none',
                backgroundColor: '#319aed'
              }}
              startIcon={<Add />}
              onClick={addNewTodo}
              disabled={loading}
            >
              Add New Todo
            </Button>
          </Box>
        </Box>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal:'cemter' }}
        open={snackBar.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        message={snackBar.message}
      />
    </>
  )
}
