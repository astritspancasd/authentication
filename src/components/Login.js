import { Box, TextField, Button } from "@material-ui/core";
import React from "react";
import { Cached as CachedIcon } from "@material-ui/icons";
import styled from "styled-components";
import { useAuthContext } from "../context/auth";

const LoginWrapper = styled(Box)({
  display: "flex",
});

const InstanceInput = styled(TextField)({
  width: "400px",
});

export const Login = () => {
  const { instance, username, password, login, loading, handleChange } =
    useAuthContext();

  return (
    <LoginWrapper>
      <Box p={1}>
        <InstanceInput
          variant="outlined"
          label="Instance"
          size="small"
          type="text"
          name="instance"
          value={instance}
          onChange={handleChange}
          disabled={loading}
          fullWidth
        />
      </Box>
      <Box p={1}>
        <TextField
          variant="outlined"
          label="Username"
          size="small"
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          disabled={loading}
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
          disabled={loading}
          fullWidth
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
    </LoginWrapper>
  );
};
