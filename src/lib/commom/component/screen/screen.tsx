import React, { ReactElement } from "react";
import { Header } from "../header/header";
import { Animation, Container, Wrapper } from "./screen.styles";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../redux/types";

interface Props {
  children: ReactElement;
  showHeader?: boolean;
}

export const Screen = ({
  children,
  showHeader = true,
}: Props): ReactElement => {
  const user = useSelector((state: ReduxState) => state.user.currentUser);

  return (
    <Container>
      <Wrapper>
        {showHeader && (
          <Animation>
            <Header name={user?.name.split(" ")[0] ?? undefined} />
          </Animation>
        )}
        {children}
      </Wrapper>
    </Container>
  );
};
