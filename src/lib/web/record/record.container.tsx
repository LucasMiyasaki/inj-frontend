import React, { ReactElement, useState } from "react";
import { Income } from "../income/types/types";
import { Expenditure, ExpenditureType } from "../expenditure/types/types";
import { Record } from "./record";
import ApplicationExpenditureService from "../expenditure/services/application-expenditure-service";
import ApplicationIncomeService from "../income/services/application-income-service";
import Client from "../../commom/client/client";
import { Value } from "react-date-picker/dist/cjs/shared/types";
import { format } from "date-fns";
import { isNil } from "lodash";
import ApplicationExpenditureTypeService from "../expenditure/services/application-expenditureType-service";
import { useDispatch } from "react-redux";
import { setLoading } from "../../commom/redux/application-slice";
import { toast } from "react-toastify";

export const RecordScreen = (): ReactElement => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [incomeList, setIncomeList] = useState<Income[]>([]);
  const [expenditureList, setExpenditureList] = useState<Expenditure[]>([]);

  const [expenditureTypeList, setExpenditureTypeList] = useState<
    ExpenditureType[]
  >([]);

  const handleStartDate = (date: Value): void => {
    if (date instanceof Date) setStartDate(date);
  };

  const handleEndDate = (date: Value): void => {
    if (date instanceof Date) setEndDate(date);
  };

  const handleValidation = async (): Promise<void> => {
    dispatch(setLoading(true));

    if (!isNil(startDate) && !isNil(endDate)) {
      if (startDate > endDate)
        toast.error("A data final deve ser posterior à data de início");
      else {
        const applicationExpenditureService =
          new ApplicationExpenditureService();
        const applicationIncomeService = new ApplicationIncomeService();
        const applicationExpenditureTypeService =
          new ApplicationExpenditureTypeService();
        const client = new Client();

        const start: string = format(startDate, "yyyy/MM/dd");
        const end: string = format(endDate, "yyyy/MM/dd");

        const incomeRecord = await applicationIncomeService.getByRange(
          client,
          start,
          end,
        );
        const expenditureRecord =
          await applicationExpenditureService.getByRange(client, start, end);

        const expenditureData =
          await applicationExpenditureTypeService.getAllTypes(client);

        if (expenditureData != null) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setExpenditureTypeList(expenditureData);
        }

        if (expenditureRecord != null) setExpenditureList(expenditureRecord);

        if (incomeRecord != null) setIncomeList(incomeRecord);
      }
    }

    dispatch(setLoading(false));
  };

  return (
    <Record
      incomeList={incomeList}
      expenditureList={expenditureList}
      startDate={startDate}
      endDate={endDate}
      handleStartDate={handleStartDate}
      handleEndDate={handleEndDate}
      handleValidation={handleValidation}
      typeList={expenditureTypeList}
    />
  );
};
