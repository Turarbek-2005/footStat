export interface IMenuItem {
  name: string;
  url: string;
  icon: string;
}

export const MENU_DATA: IMenuItem[] = [
  {
    name: "Matches",
    url: "/matches",
    icon: "mdi-soccer-field",
  },
  {
    name: "Competitions",
    url: "/competitions",
    icon: "mdi-trophy-outline",
  },
  {
    name: "Teams",
    url: "/teams/competitions",
    icon: "mdi-account-group",
  },
];
export interface ProfileMenuItem {
  name: string;
  url: string;
  icon: string;
}

export const PROFILE_MENU_DATA: ProfileMenuItem[] = [
  {
    name: "Profile",
    url: "/profile",
    icon: "mdi-account-details",
  },
  {
    name: "Settings",
    url: "/settings",
    icon: "mdi-cog",
  },
  {
    name: "logout",
    url: "/login",
    icon: "mdi-logout",
  },
];
