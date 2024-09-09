import { ComponentType } from "react";
import { HomePageScreen } from "../web/homepage/homepage.container";
import { LoginScreen } from "../web/login/screens/login.container";
import { OnboardingScreen } from "../web/onboarding/screens/onboarding.container";
import { AdvertaiseDetailsScreen } from "../web/advertise/screens/components/advertise-details/advertise-details.container";
import { ProfileScreen } from "../web/profile/screens/profile.container";

declare interface ScreenType {
  route: string;
  screen: ComponentType;
}

export const entryScreens: ScreenType[] = [
  {
    route: "/",
    screen: HomePageScreen,
  },
  {
    route: "/login",
    screen: LoginScreen,
  },
  {
    route: "/onboarding",
    screen: OnboardingScreen,
  },
  {
    route: "/advertise/:id",
    screen: AdvertaiseDetailsScreen
  },
  {
    route: "/profile",
    screen: ProfileScreen,
  },
];
