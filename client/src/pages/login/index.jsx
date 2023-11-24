import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Snackbar
} from "@mui/material";
import React, { useState } from "react";
import Form from "./Form";

function Login() {
  const [state, setState] = useState({
    open: false,
    message: '',
  });
  const theme = useTheme();
  const isDesktop = useMediaQuery("(min-width:1000px)");

  const { message, open } = state;

  const  showAlert = (message) => {
    console.log('showalert called', message);
    setState({ open: true, message});
  }
  return (
    <Box>
      <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        open={open}
        // onClose={handleClose}
        message={message}
        key={'login alert'}
      />
      <Box
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography color="primary" fontWeight="bold" fontSize={"32px"}>
          LanetSocial
        </Typography>
      </Box>
      {/* <hr /> */}

      <Box
        m={"1rem auto"}
        p="1.5rem"
        width={isDesktop ? "30%" : "93%"}
        display="flex"
        flexDirection="column"
        borderRadius={"1.5rem"}
        backgroundColor={theme.palette.background.alt}
        alignItems="center"
        justifyContent="center"
      >
        <Typography fontWeight={"bold"} variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to LanetSocial, social media for lanetians
        </Typography>

        {/* Login/Registeration From */}
        <Form showAlert={showAlert} />
      </Box>
    </Box>
  );
}

export default Login;
