import { CircularProgress } from "@mui/material";
import React, { ReactElement } from "react";
import { Container } from "./loading.styles";

interface Props {
  loading: boolean | undefined;
}

export const Loading = ({ loading }: Props): ReactElement => {
  if (!loading) {
    return <></>;
  }

  return (
    <>
      <Container>
        <CircularProgress color="inherit" />
      </Container>
    </>
  );
};
