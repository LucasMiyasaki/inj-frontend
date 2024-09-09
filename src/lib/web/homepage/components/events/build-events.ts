import { Event } from "../../../profile/types";
import img2 from "../../../../assets/images/img2.png";
import img3 from "../../../../assets/images/img3.png";
import img4 from "../../../../assets/images/img4.png";
import img5 from "../../../../assets/images/img5.png";

export const buildEvents = (
  events: Event[],
): Array<{
  id: number | undefined;
  name: string | undefined;
  description: string | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
  capacity: string | undefined;
  image: string | undefined;
}> => {
  const arrayEvent = [];
  const imgUrls = [img2, img3, img4, img5];

  return events.map((event: Event, index: number) => {
    const imageIndex = index % imgUrls.length;

    const eventObject = {
      id: event.id,
      name: event.name,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      capacity: event.capacity,
      image: imgUrls[imageIndex],
    };

    arrayEvent.push(eventObject);

    return eventObject;
  });
};
