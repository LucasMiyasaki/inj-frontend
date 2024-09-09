import React, { ReactElement, useEffect, useState } from "react";
import { Advertise } from "../types/types";
import ApplicationAdvertiseService from "../services/application-advertise-service";
import Client from "../../../commom/client/client";
import { Container } from "./advertise.styles";
import { Swiper, SwiperSlide } from "swiper/react";

export const AdvertiseBanner = (): ReactElement => {
  const [advertises, setAdvertises] = useState<Advertise[]>([]);

  useEffect(() => {
    const fetchAdvertises = async (): Promise<void> => {
      try {
        const applicationAdvertiseService = new ApplicationAdvertiseService();
        const client = new Client();

        //@ts-expect-error
        const advertisesData: Advertise[] = await applicationAdvertiseService.getAllAdvertises(client);

        if (advertisesData != null) {
          const filteredAdvertises = advertisesData.filter(advertise => advertise.show);
          setAdvertises(filteredAdvertises);
        }
      } catch (error) {
        console.error("Error fetching advertises:", error);
      }
    };

    void fetchAdvertises();
  }, []);

  return (
    <Container>
      <Swiper
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        autoplay
      >
        {advertises.map((item) => (
          <SwiperSlide key={item.id}>
            <a href={"./advertise/" + item.id}>
              <img
                src={"http://localhost:3344/images/advertise/" + item.url}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "412px",
                  objectFit: "cover",
                  borderRadius: "15px",
                }}
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};
