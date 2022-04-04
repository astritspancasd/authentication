import React, { useState } from "react";
import { Box, FormControlLabel, Switch, Typography } from "@material-ui/core";
import { useAuthContext } from "../context/auth";
import { Alert } from "@material-ui/lab";
import { theme } from "../theme";
import styled from "styled-components";
import SnackbarUtils from "../ui/SnackbarUtils";

const StyledContainer = styled(Box)({
  wordBreak: "break-all",
  padding: theme.spacing(2),
  fontSize: "12px",
});

export const CopyInput = () => {
  const [withBearer, setWithBearer] = useState(true);
  
  const { token, autoRefetching } = useAuthContext();

  const handleChange = () => setWithBearer((prevState) => !prevState);

  const handleCopyInputValue = () => {
    navigator.clipboard.writeText(withBearer ? `Bearer ${token}` : token);
    SnackbarUtils.success("Copied");
  };

  return (
    <StyledContainer>
      {!autoRefetching && (
        <Box pt={2} pb={2}>
          <Alert severity="warning">
            Token might be invalid because auto refetching is turned off!
          </Alert>
        </Box>
      )}
      <Box pb={2}>
        <FormControlLabel
          control={
            <Switch
              checked={withBearer}
              onChange={handleChange}
              name="withBearer"
              color="primary"
            />
          }
          label="Copy with bearer"
        />
      </Box>
      <Box pb={2}>
        <Typography variant="body2">Click to copy</Typography>
      </Box>
      <Box />
      <Box onClick={handleCopyInputValue}>
        {withBearer && "Bearer"}
        {token}
      </Box>
    </StyledContainer>
  );
};
