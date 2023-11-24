import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FlexBetween from "../../component/FlexBetween";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import { useNavigate } from "react-router-dom";

function Form({ showAlert }) {
  const [isLogin, setIsLogin] = useState(true);
  const [fileName, setFileName] = useState("");
  const theme = useTheme();
  const { palette } = theme;
  const inputFileRef = useRef();
  const formRef = useRef();
  const dispatcher = useDispatch();
  const navigate = useNavigate();

  const openFileSelection = () => {
    inputFileRef.current.click();
  };

  const isDesktop = useMediaQuery("(min-width: 1000px)");

  const handleSelectedFile = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    setFileName(file.name);
  };

  const loginUser = async (formData) => {
    try {
      fetch(`${import.meta.env.VITE_API_URI}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      })
        .then(async (resp) => {
          const data = await resp.json();
          if (resp.status === 200) {
            dispatcher(setLogin({ ...data }));
            navigate("/home");
          }
          throw Error(data.error);
        })
        .catch((error) => {
          showAlert(`Login failed: ${error.message}`);
        });
    } catch (error) {
      showAlert(`Login failed: ${error.message}`);
    }
  };

  const registerUser = async (formData) => {
    try {
      formData.append("picturePath", fileName);
      fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: formData,
      })
        .then(async (resp) => {
          const data = await resp.json();
          if (resp.status !== 201) {
            throw Error(data.error);
          }
          formRef.current.reset();
          setIsLogin(!isLogin);
        })
        .catch((error) => {
          showAlert(`Registeration failed: ${error.message}`);
        });
    } catch (error) {
      console.log("Registeration Failed: ", error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (isLogin) {
      loginUser(formData);
    } else {
      registerUser(formData);
    }
  };
  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <Box
        display="grid"
        sx={{
          gridTemplateColumns: "repeat(4, minmax(0,1fr))",
          columnGap: "0.5rem",
          // minWidth: "600px",
          "& > div": { gridColumn: isDesktop ? undefined : "span 4" },
        }}
      >
        {/* Registeration Form */}
        {!isLogin && (
          <>
            <TextField
              sx={{
                gridColumn: "2 span",
              }}
              margin="normal"
              label="First Name"
              size="small"
              name="firstName"
              required
            />
            <TextField
              sx={{
                gridColumn: "2 span",
              }}
              margin="normal"
              label="Last Name"
              size="small"
              required
              name="lastName"
            />
            <TextField
              sx={{
                gridColumn: "4 span",
              }}
              required
              margin="normal"
              label="Location"
              size="small"
              name="location"
            />

            <Box
              gridColumn="span 4"
              p="1rem"
              border={`1px solid ${palette.neutral.medium}`}
            >
              {/* <input type='file' /> */}
              <Box
                border={`2px dashed ${palette.primary.main}`}
                p="0.5rem"
                sx={{
                  "&:hover": { cursor: "pointer" },
                  ">p": { margin: 0 },
                  '>input[type="file"]': { display: "none" },
                }}
              >
                <input
                  name="picture"
                  onChange={handleSelectedFile}
                  ref={inputFileRef}
                  type="file"
                ></input>
                <FlexBetween>
                  <p>{fileName || "Add picture here"}</p>
                  <IconButton onClick={openFileSelection}>
                    <EditOutlinedIcon />
                  </IconButton>
                </FlexBetween>
              </Box>
            </Box>
            <TextField
              sx={{
                gridColumn: "4 span",
              }}
              margin="normal"
              label="Occupation"
              size="small"
              name="occupation"
            />
          </>
        )}
        {/* Login Form */}
        {
          <>
            <TextField
              sx={{
                gridColumn: "4 span",
              }}
              margin="normal"
              label="Email"
              size="small"
              type="email"
              name="email"
              required
              fullWidth
            />
            <TextField
              sx={{
                gridColumn: "4 span",
              }}
              margin="normal"
              label="Password"
              size="small"
              type="password"
              name="password"
              required
              fullWidth
            />
          </>
        }
      </Box>

      <Box>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: palette.primary.main,
            color: palette.background.alt,
            "&:hover": { color: palette.primary.main },
            fontSize: "14px",
            padding: "8px",
          }}
        >
          {isLogin ? "Login" : "Register"}
        </Button>
        <Typography
          variant="h5"
          sx={{
            mt: "5px",
            textDecoration: "underline",
            color: palette.primary.main,
            "&:hover": {
              cursor: "pointer",
              color: palette.primary.light,
            },
          }}
          onClick={() => {
            formRef.current.reset();
            setIsLogin(!isLogin);
          }}
        >
          {!isLogin
            ? "Already have an account? Login here"
            : "Don't have an account? Sign Up here."}
        </Typography>
      </Box>
    </form>
  );
}

export default Form;
