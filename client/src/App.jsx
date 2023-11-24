import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {  ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from "@mui/material/styles";
import { useSelector } from 'react-redux';
import Login from './pages/login';
import Home from './pages/home';
import Profile from './pages/profile';
import { themeSettings } from './theme';
import { useMemo } from 'react';

function App() {
  const mode = useSelector((state) => state.mode);
  const state = useSelector((state) => state);
  console.log('state:',state);
  const isAuth = Boolean(useSelector((state) => state.token));
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
        <CssBaseline />
          <Routes>
            <Route path='/' element={ isAuth ? <Navigate to='/home'/> : <Login />} />
            <Route path='/home' element={ isAuth ? <Home /> : <Navigate to='/'/> } />
            <Route path='/profile/:userId' element={ isAuth ? <Profile /> : <Navigate to='/'/>} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App
