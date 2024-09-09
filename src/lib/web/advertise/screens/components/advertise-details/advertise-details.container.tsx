import React, { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApplicationAdvertiseService from "../../../services/application-advertise-service";
import Client from "../../../../../commom/client/client";
import { Advertise } from "../../../types/types";
import { AdvertiseDetails } from "./advertise-details";
import { format, parseISO } from "date-fns";

export const AdvertaiseDetailsScreen = (): ReactElement => {
  const [advertise, setAdvertise] = useState<Advertise>({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    file: null,
    show: true,
  });

  const { id } = useParams<{ id: string }>();

  if (id != null) {
    const idInt = parseInt(id, 10);

    useEffect(() => {
      const fetchAdvertise = async (): Promise<void> => {
        try {
          const applicationAdvertiseService = new ApplicationAdvertiseService();
          const client = new Client();

          let advertisesData = {
            id: 0,
            name: "",
            description: "",
            startDate: "",
            endDate: "",
            url: "",
            file: null,
            show: true,
          };

          // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
          const data = await applicationAdvertiseService.getAdvertise(
            client,
            idInt,
          );

          if (data != null) {
            advertisesData = data;

            setAdvertise(advertisesData);

            setAdvertise((prevState) => ({
              ...prevState,
              startDate: formatDate(advertisesData.startDate),
            }));

            setAdvertise((prevState) => ({
              ...prevState,
              endDate: formatDate(advertisesData.endDate),
            }));
          }
        } catch (error) {
          console.error("Error fetching advertises:", error);
        }
      };

      void fetchAdvertise();
    }, []);
  }

  const formatDate = (date: string): string => {
    if (date.length > 0) {
      const dateObject: Date = parseISO(date);
      const newDate = new Date(
        dateObject.valueOf() + dateObject.getTimezoneOffset() * 60 * 1000,
      );
      const formatedDate: string = format(newDate, "dd/MM/yy HH:mm");

      return formatedDate;
    }

    return date;
  };

  return <AdvertiseDetails advertise={advertise} />;
};
