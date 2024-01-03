import { Box, CircularProgress, Typography } from '@mui/material';
import { lazy, Suspense } from 'react';

import './App.css';

const LandingPage = lazy(()=> import('./components/LandingPage'));


function App() {
  return (
    <div className="App">
      <header className="Header">
        <Typography variant='h5' sx={{ fontWeight: '700', fontSize: 'calc(1vw + 20px)' }}>
          Todos
        </Typography>
      </header>
      <Suspense callback={<Box><CircularProgress /></Box>}>
        <LandingPage />
      </Suspense>
    </div>
  );
}

export default App;
