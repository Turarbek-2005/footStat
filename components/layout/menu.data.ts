export interface IMenuItem {
  name: string;
  url: string;
}

export const MENU_DATA: IMenuItem[] = [
  {
    name: "Matches",
    url: "/matches",
  },
  {
    name: "Competitions",
    url: "/competitions",
  },
  {
    name: "Teams",
    url: "/teams",
  },
];
