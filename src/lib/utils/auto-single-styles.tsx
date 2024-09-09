import React, { ReactElement } from "react";

const Text = ({ children }: { children: React.ReactNode }): ReactElement => {
  return <span>{children}</span>;
};

const Bold = ({ children }: { children: React.ReactNode }): ReactElement => {
  return <strong>{children}</strong>;
};

export const autoSingleStyle = (
  text: string,
  separator = "*",
  Regular = Text,
  Stylized = Bold,
): ReactElement => {
  const pieces: ReactElement[] = [];
  let isRegular = true;

  text.split(separator).forEach((piece, index) => {
    if (isRegular) {
      pieces.push(<Regular key={index}>{piece}</Regular>);
    } else {
      pieces.push(<Stylized key={index}>{piece}</Stylized>);
    }
    isRegular = !isRegular;
  });

  const combinedText = pieces
    .map((element) => {
      return typeof element === "string" ? element : element.props.children;
    })
    .join(" ");

  return <>{combinedText}</>;
};
