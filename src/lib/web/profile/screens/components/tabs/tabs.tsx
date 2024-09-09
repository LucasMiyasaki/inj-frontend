import React, { ReactElement, useEffect, useState } from "react";
import {
  Logout,
  TabContainer,
  TabLabel,
  TabWrapper,
  Wrapper,
} from "./tabs.styles";

interface Props {
  activeTab: number;
  handleTabClick: (value: number) => void;
  logout: () => Promise<void>;
  isAdmin: boolean;
  next: boolean;
  handleNext: () => void;
}

interface TabProps {
  label: string;
  currentValue: number;
  previousValue: number;
  isSelected: boolean;
  onClick: () => void;
}

const Tab = ({
  label,
  currentValue,
  previousValue,
  isSelected,
  onClick,
}: TabProps): ReactElement => {
  return (
    <TabWrapper
      isSelected={isSelected}
      direction={currentValue > previousValue}
      onClick={onClick}
    >
      <TabLabel isSelected={isSelected}>{label}</TabLabel>
    </TabWrapper>
  );
};

export const Tabs = ({
  activeTab,
  handleTabClick,
  logout,
  isAdmin,
  next,
  handleNext,
}: Props): ReactElement => {
  const [previousValue, setPreviousValue] = useState(1);

  useEffect(() => {
    setPreviousValue(activeTab);
  }, [activeTab]);

  return (
    <Wrapper>
      <TabContainer>
        {!next ? (
          <>
            <Tab
              label="Dados pessoais"
              currentValue={1}
              previousValue={previousValue}
              isSelected={activeTab === 1}
              onClick={() => handleTabClick(1)}
            />
            <Tab
              label="Reuniões"
              currentValue={2}
              previousValue={previousValue}
              isSelected={activeTab === 2}
              onClick={() => handleTabClick(2)}
            />
            <Tab
              label={isAdmin ? "Eventos" : "Inscrições"}
              currentValue={3}
              previousValue={previousValue}
              isSelected={activeTab === 3}
              onClick={() => handleTabClick(3)}
            />

            {isAdmin && (
              <Tab
                label="Usuários"
                currentValue={4}
                previousValue={previousValue}
                isSelected={activeTab === 4}
                onClick={() => handleTabClick(4)}
              />
            )}

            {isAdmin && (
              <Tab
                label="Livros"
                currentValue={5}
                previousValue={previousValue}
                isSelected={activeTab === 5}
                onClick={() => handleTabClick(5)}
              />
            )}
            {!isAdmin && (
              <Tab
                label="Dependentes"
                currentValue={6}
                previousValue={previousValue}
                isSelected={activeTab === 6}
                onClick={() => handleTabClick(6)}
              />
            )}
            {isAdmin && (
              <div
                onClick={() => {
                  handleNext();
                }}
                style={{
                  cursor: "pointer",
                  padding: "0 16px 24px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  fill="#f6ab67"
                  className="bi bi-caret-right-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
              </div>
            )}
          </>
        ) : (
          <>
            {isAdmin && (
              <div
                onClick={() => {
                  handleNext();
                }}
                style={{
                  cursor: "pointer",
                  padding: "0 16px 24px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  fill="#f6ab67"
                  className="bi bi-caret-left-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                </svg>
              </div>
            )}

            {isAdmin && (
              <Tab
                label="Avisos"
                currentValue={1}
                previousValue={previousValue}
                isSelected={activeTab === 1}
                onClick={() => handleTabClick(1)}
              />
            )}

            {isAdmin && (
              <Tab
                label="Despesas"
                currentValue={2}
                previousValue={previousValue}
                isSelected={activeTab === 2}
                onClick={() => handleTabClick(2)}
              />
            )}

            {isAdmin && (
              <Tab
                label="Receita"
                currentValue={3}
                previousValue={previousValue}
                isSelected={activeTab === 3}
                onClick={() => handleTabClick(3)}
              />
            )}

            {isAdmin && (
              <Tab
                label="Relatório"
                currentValue={4}
                previousValue={previousValue}
                isSelected={activeTab === 4}
                onClick={() => handleTabClick(4)}
              />
            )}
          </>
        )}
      </TabContainer>
      <Logout onClick={logout} />
    </Wrapper>
  );
};
