import React from "react";
import {
  Box,
  TextField,
  Button,
  Switch,
  FormControlLabel,
} from "@material-ui/core";
import { Cached as CachedIcon } from "@material-ui/icons";
import { useAuthContext } from "../context/auth";
import styled from "styled-components";

const StyledContainer = styled(Box)({
  display: "flex",
});

const StyledInstanceInput = styled(TextField)({
  width: "400px",
});

export const Login = () => {
  const {
    instance,
    username,
    password,
    login,
    loading,
    handleChange,
    autoRefetching,
    toggleAutoRefetching,
  } = useAuthContext();

  return (
    <StyledContainer>
      <Box p={1}>
        <StyledInstanceInput
          variant="outlined"
          label="Full login endpoint url"
          size="small"
          type="text"
          name="instance"
          value={instance}
          onChange={handleChange}
          fullWidth
        />
      </Box>
      <Box p={1}>
        <TextField
          variant="outlined"
          label="Username/Email"
          size="small"
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          fullWidth
        />
      </Box>
      <Box p={1}>
        <TextField
          variant="outlined"
          label="Password"
          size="small"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          fullWidth
        />
      </Box>
      <Box pb={2}>
        <FormControlLabel
          control={<Switch name="withBearer" color="primary" />}
          label="Auto refetching"
          checked={autoRefetching}
          onChange={toggleAutoRefetching}
        />
      </Box>
      <Box p={1}>
        <Button
          size="medium"
          variant="contained"
          color="primary"
          startIcon={<CachedIcon />}
          onClick={login}
          disabled={loading}
        >
          Authenticate
        </Button>
      </Box>
    </StyledContainer>
  );
};
