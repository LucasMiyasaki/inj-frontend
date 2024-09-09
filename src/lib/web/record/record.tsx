import React, { ReactElement, useRef, useState } from "react";
import { Income } from "../income/types/types";
import { Expenditure, ExpenditureType } from "../expenditure/types/types";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import {
  Col,
  Details,
  InputContainer,
  Label,
  Row,
  TabContainer,
  Title,
  Wrapper,
  DatePicker,
} from "./record.styles";
import { Table, Td, Th } from "../../commom/component/table/table.style";
import { format, parseISO } from "date-fns";
import { Button } from "../../commom/component/button/button";
import { Value } from "react-date-picker/dist/cjs/shared/types";

interface Props {
  incomeList: Income[];
  expenditureList: Expenditure[];
  startDate: Date | null;
  endDate: Date | null;
  handleStartDate: (e: Value | null) => void;
  handleEndDate: (e: Value | null) => void;
  handleValidation: () => Promise<void>;
  typeList: ExpenditureType[];
}

export const Record = ({
  incomeList,
  expenditureList,
  startDate,
  endDate,
  handleStartDate,
  handleEndDate,
  handleValidation,
  typeList,
}: Props): ReactElement => {
  const tableRef = useRef<HTMLTableElement | null>(null);
  let totalAmount = 0;
  let count = 0;

  type CombinedData = (Income | Expenditure) & { unifiedDate: string };

  const combined: CombinedData[] = [
    ...incomeList.map((income) => ({ ...income, unifiedDate: income.date })),
    ...expenditureList
      .filter((exp) => exp.payedDate !== null)
      .map((exp) => ({ ...exp, unifiedDate: exp.dueDate })),
  ];

  combined.sort(
    (a, b) =>
      new Date(b.unifiedDate).getTime() - new Date(a.unifiedDate).getTime(),
  );

  combined.forEach((item) => {
    if ("amount" in item && item.amount !== null) {
      totalAmount += Number(item.amount);
      count++;
    }
    if ("value" in item && item.value !== null) {
      totalAmount -= Number(item.value);
      count++;
    }
      
  });

  const formatStringDate = (date: string): string => {
    if (date.length > 0) {
      const dateObject: Date = parseISO(date);
      const newDate = new Date(
        dateObject.valueOf() + dateObject.getTimezoneOffset() * 60 * 1000,
      );
      const formatedDate: string = format(newDate, "dd/MM/yyyy");
      return formatedDate;
    }

    return date;
  };

  const translate = (e: string): string => {
    if (e === "TITHE") return "Dizimo";
    if (e === "DONATION") return "Oferta";
    return "Outro";
  };

  const handlePrint = (): void => {
    const printWindow = window.open("", "PRINT", "height=600,width=800");
    if (printWindow && tableRef.current) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Igreja Nova Jerusalém</title>
            <style>
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                border: 1px solid #ddd;
                padding: 8px;
              }
              th {
                padding-top: 12px;
                padding-bottom: 12px;
                text-align: left;
                background-color: #f2f2f2;
              }
            </style>
          </head>
          <body>
            <h1>Relatório Financeiro</h1>
            <h2>${format(startDate ?? "", "dd/MM/yyyy")} - ${format(endDate ?? "", "dd/MM/yyyy")}</h2>
            ${tableRef.current.outerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  return (
    <Details>
      <TabContainer>
        <Title>Relatório</Title>
        <Row>
          <Col>
            <Wrapper>
              <Label>Data inicial</Label>
              <InputContainer>
                <DatePicker
                  value={startDate}
                  onChange={handleStartDate}
                  format={"dd/MM/y"}
                  clearIcon={""}
                />
              </InputContainer>
            </Wrapper>
          </Col>
          <Col>
            <Wrapper>
              <Label>Data final</Label>
              <InputContainer>
                <DatePicker
                  value={endDate}
                  onChange={handleEndDate}
                  format={"dd/MM/y"}
                  clearIcon={""}
                />
              </InputContainer>
            </Wrapper>
          </Col>
          <Col style={{ marginTop: "30px" }}>
            <Button
              label="Gerar"
              onPress={handleValidation}
              hasFixWidth={true}
              backgroundColor="#f6ab67"
              pressedBackgroundColor="#f9c799"
            />
          </Col>
        </Row>

        <div style={{ textAlign: "right" }}>
          {count > 0 ? (
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              onClick={handlePrint}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-printer"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
                <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1" />
              </svg>
            </button>
          ) : (
            <div style={{ height: "20px" }}></div>
          )}
        </div>
        <div ref={tableRef}>
          <Table style={{ marginTop: "10px" }}>
            <tr>
              <Th>Categoria</Th>
              <Th>Tipo</Th>
              <Th>Parcelas</Th>
              <Th>Juros</Th>
              <Th>Data</Th>
              <Th style={{ textAlign: "right" }}>Valor</Th>
            </tr>
            <tbody>
              {combined.map((item, index) => (
                <tr key={index}>
                  <Td>{"type" in item ? "Receita" : "Despesa"}</Td>
                  <Td>
                    {"type" in item
                      ? translate(item.type)
                      : typeList.find(
                          (type) => type.id === item.expenditureTypeId,
                        )?.name}
                  </Td>
                  <Td>{"parcels" in item ? item.parcels ?? "-" : "-"}</Td>
                  <Td>
                    {"fee" in item ? (item.fee ? item.fee + "%" : "-") : "-"}
                  </Td>
                  <Td>
                    {"date" in item
                      ? formatStringDate(item.date)
                      : formatStringDate(item.payedDate ?? "-")}
                  </Td>
                  <Td style={{ textAlign: "right" }}>
                    {"amount" in item ? (
                      <p style={{ color: "#33B864" }}>
                        {"+ R$" + Number(item.amount).toFixed(2)}
                      </p>
                    ) : (
                      <p style={{ color: "red" }}>
                        {"- R$" + Number(item.value).toFixed(2)}
                      </p>
                    )}
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Table>
            <Td style={{ textAlign: "right" }}>Total </Td>
            <Td style={{ width: "17.2%", textAlign: "right" }}>
              {totalAmount >= 0 ? (
                <p style={{ color: "#33B864" }}>
                  {"+ R$" + Number(totalAmount).toFixed(2)}
                </p>
              ) : (
                <p style={{ color: "red" }}>
                  {"- R$" + Number(Math.abs(totalAmount)).toFixed(2)}
                </p>
              )}
            </Td>
          </Table>
        </div>
      </TabContainer>
    </Details>
  );
};
