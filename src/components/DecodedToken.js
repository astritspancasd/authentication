import React from "react";
import { useAuthContext } from "../providers";
import { Box } from "@material-ui/core";
import { theme } from "../ui";
import { formatJson } from "../utils";
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
            __html: formatJson(decoded)
          }}
        />
      )}
    </StyledContainer>
  );
};
