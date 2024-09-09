import { isNil } from "lodash";
import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { Button } from "../button/button";
import { HeaderOption, headerOptions } from "./constants";
import {
  Container,
  LeftWrapper,
  Link,
  Name,
  NameWrapper,
  Text,
  Wrapper,
} from "./header.styles";

interface Props {
  name?: string;
}

export const Header = ({ name = undefined }: Props): ReactElement => {
  const navigate = useNavigate();

  return (
    <Container>
      <Wrapper>
        <LeftWrapper>
          <img width={72} src={logo} />
          {headerOptions.map((item: HeaderOption, index: number) => (
            <Link key={index} href="/">
              <Text>{item.label}</Text>
            </Link>
          ))}
        </LeftWrapper>
        {isNil(name) ? (
          <Button
            onPress={() => {
              navigate("/login");
            }}
            label="Login"
            backgroundColor="#f6ab67"
            pressedBackgroundColor="#f9c799"
          />
        ) : (
          <NameWrapper onClick={() => { navigate("/profile"); }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                fillRule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
              />
            </svg>
            <Name>{name}</Name>
          </NameWrapper>
        )}
      </Wrapper>
    </Container>
  );
};
