import React from "react";
import { useAuthContext } from "../context/auth";
import { Box } from "@material-ui/core";
import { theme } from "../theme";
import styled from "styled-components";

const StyledContainer = styled(Box)({
  wordBreak: "break-all",
  padding: theme.spacing(2),
  fontSize: "12px",
});

export const DecodedToken = () => {
  const { decoded } = useAuthContext();
  
  return (
    <StyledContainer>
      {decoded && (
        <pre
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(decoded, null, 2),
          }}
        />
      )}
    </StyledContainer>
  );
};
