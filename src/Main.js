import React from "react";
import { Box, Card, Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { Login } from "./components/Login";
import styled from "styled-components";
import { theme } from "./theme";
import { CopyInput } from "./components/CopyInput";
import { DecodedToken } from "./components/DecodedToken";
import { useAuthContext } from "./context/auth";

const Container = styled(Grid)({
  
});

const Wrapper = styled(Card)({
  padding: theme.spacing(1),
  margin: theme.spacing(1),
});

const ComponentWrapper = ({ children }) => {
  return (
    <Box p={1}>
      <Wrapper>{children}</Wrapper>
    </Box>
  );
};

export const Main = () => {
  const { loading } = useAuthContext();

  return (
    <Container container>
      <Grid item container xs={12}>
        <Grid xs={12} item>
          <ComponentWrapper>
            {loading ? <Skeleton animation="wave" height={50}/> : <Login />}
          </ComponentWrapper>
        </Grid>
        <Grid xs={6} item>
          <ComponentWrapper>
            {loading ? <Skeleton animation="wave" height={100}/> : <CopyInput />}
          </ComponentWrapper>
        </Grid>
        <Grid xs={6} item>
          <ComponentWrapper>
            {loading ? <Skeleton animation="wave" height={300}/> : <DecodedToken />}
          </ComponentWrapper>
        </Grid>
      </Grid>
    </Container>
  );
};
