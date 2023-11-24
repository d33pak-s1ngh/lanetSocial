import React, { useState } from "react";
import {
  InputBase,
  Box,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "./FlexBetween";
import { Typography, useTheme } from "@mui/material";
import {
  DarkMode,
  LightMode,
  Notifications,
  Message,
  Help,
  Search,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../state";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery("(min-width:1000px)");
  const user = useSelector((state) => state.user);
  const mode = useSelector((state) => state.mode);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);

  const fullName = `${user?.firstName} ${user?.lastName}`;
  console.log(theme.palette);

  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const handleModeChange = () => {
    dispatch(setMode());
  };
  return (
    <div>
      <FlexBetween padding={2} backgroundColor={alt}>
        <FlexBetween gap={3}>
          <Typography sx={{ cursor: "pointer"}} onClick={ () => navigate('/home')} fontWeight={"bold"} color={"primary"} variant="h2">
            LanetSocial
          </Typography>
          {isDesktop && (
            <FlexBetween backgroundColor={neutralLight} borderRadius={"5px"}>
              <InputBase
                placeholder="search"
                sx={{
                  padding: "0px 5px",
                }}
              ></InputBase>
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>
          )}
        </FlexBetween>
        {isDesktop ? (
          <FlexBetween display={"flex"} gap={2}>
            <IconButton onClick={handleModeChange}>
              {mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <IconButton>
              <Notifications />
            </IconButton>
            <IconButton>
              <Message />
            </IconButton>
            <FormControl variant="standard" value={fullName}>
              <Select
                labelId="user-select-label"
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                 <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        ) : (
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Menu />
          </IconButton>
        )}

        {/* Mobile Nav */}
        {!isDesktop && isMobileMenuToggled && (
          <Box
            position="fixed"
            right="0"
            bottom="0"
            height="100%"
            zIndex="10"
            maxWidth="500px"
            minWidth="300px"
            backgroundColor={background}
          >
            {/* CLOSE ICON */}
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <Close />
              </IconButton>
            </Box>
            {/* MENU ITEMS */}
            <FlexBetween
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="3rem"
            >
              <IconButton
                onClick={() => dispatch(setMode())}
                sx={{ fontSize: "25px" }}
              >
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: dark, fontSize: "25px" }} />
                )}
              </IconButton>
              <Message sx={{ fontSize: "25px" }} />
              <Notifications sx={{ fontSize: "25px" }} />
              <Help sx={{ fontSize: "25px" }} />
              <FormControl variant="standard" value={fullName}>
                <Select
                  value={fullName}
                  sx={{
                    backgroundColor: neutralLight,
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralLight,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={fullName}>
                    <Typography>{fullName}</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => dispatch(setLogout())}>
                    Log Out
                  </MenuItem>
                </Select>
              </FormControl>
            </FlexBetween>
          </Box>
        )}
      </FlexBetween>
    </div>
  );
};

export default Navbar;
