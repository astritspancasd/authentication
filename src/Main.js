import React from "react";
import { Card, Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { Login } from "./components/Login";
import styled from "styled-components";
import { theme } from "./theme";
import { CopyInput } from "./components/CopyInput";
import { DecodedToken } from "./components/DecodedToken";
import { useAuthContext } from "./context/auth";

const Container = styled(Grid)({});

const StyledComponentContainer = styled(Card)({
  padding: theme.spacing(1),
  margin: theme.spacing(1),
});

export const Main = () => {
  const { loading } = useAuthContext();

  return (
    <Container container>
      <Grid item container xs={12}>
        <Grid xs={12} item>
          <StyledComponentContainer>
            <Login />
          </StyledComponentContainer>
        </Grid>
        <Grid xs={6} item>
          <StyledComponentContainer>
            {loading ? (
              <Skeleton animation="wave" height={100} />
            ) : (
              <CopyInput />
            )}
          </StyledComponentContainer>
        </Grid>
        <Grid xs={6} item>
          <StyledComponentContainer>
            {loading ? (
              <Skeleton animation="wave" height={300} />
            ) : (
              <DecodedToken />
            )}
          </StyledComponentContainer>
        </Grid>
      </Grid>
    </Container>
  );
};
