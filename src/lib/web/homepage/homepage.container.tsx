import { isNil, noop } from "lodash";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Client from "../../commom/client/client";
import { setLoading } from "../../commom/redux/application-slice";
import { ReduxState } from "../../redux/types";
import ApplicationEventService from "../../services/application-events-service";
import { Event } from "../profile/types";
import { HomePage } from "./homepage";
import { Book } from "../../services/types/book-types";
import ApplicationBooksService from "../../services/application-books-service";
import ApplicationDependentsService from "../../services/application-dependents-service";
import { Dependent } from "../../services/types/dependent-types";

export const HomePageScreen = (): ReactElement => {
  const dispatch = useDispatch();

  const eventService = new ApplicationEventService();
  const booksService = new ApplicationBooksService();
  const dependentsService = new ApplicationDependentsService();
  const client = new Client();

  const user = useSelector((state: ReduxState) => state.user.currentUser);

  const [events, setEvents] = useState<Event[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [dependents, setDependents] = useState<Dependent[]>([]);

  const getBooks = async (): Promise<void> => {
    dispatch(setLoading(true));
    await booksService
      .getBooks(client)
      .then(async (data) => {
        dispatch(setLoading(false));
        setBooks(data);
      })
      .catch(() => {
        dispatch(setLoading(false));
      });
  };

  const getEvents = async (): Promise<void> => {
    dispatch(setLoading(true));
    await eventService
      .getEvents(client)
      .then((data) => {
        // @ts-expect-error
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setEvents(data.data);
        dispatch(setLoading(false));
      })
      .catch(() => {
        dispatch(setLoading(false));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const getDependents = async (): Promise<void> => {
    dispatch(setLoading(true));

    try {
      const dependents = await dependentsService.getAllDependents(client);
      console.log(dependents);

      setDependents(dependents);
    } catch (error) {}

    dispatch(setLoading(false));
  };

  useEffect(() => {
    getEvents().catch(noop);
    getBooks().catch(noop);
    getDependents().catch(noop);
  }, []);

  return <HomePage events={events} books={books} dependents={dependents} />;
};
