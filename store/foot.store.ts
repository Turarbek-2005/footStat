interface MatchData {
  area: Object;
  awayTeam: Object;
  competition: Object;
  group: Object | null;
  homeTeam: Object;
  id: number;
  lastUpdated: string;
  matchday: number;
  odds: Object;
  referees: Array<unknown>;
  score: Object;
  season: Object;
  stage: string;
  status: string;
  utcDate: string;
}
const defaultValue: MatchData = {
  area: {},
  awayTeam: {},
  competition: {},
  group: {},
  homeTeam: {},
  id: 0,
  lastUpdated: "",
  matchday: 0,
  odds: {},
  referees: [],
  score: {},
  season: {},
  stage: "",
  status: "",
  utcDate: "",
};
export const useFoot = defineStore("foot", {
  state: () => ({
    products: ref<any>([]),
    match: ref<MatchData>(defaultValue),
    competition: ref<any>(),
    team: ref<any>(),
  }),
  actions: {
    async fetchProducts(competitionId: string) {
      try {
        const { data, error } = await useFetch(
          `/api/football?competitionId=${competitionId}`
        );
        if (error.value) {
          console.error("Ошибка API:", error.value);
          return;
        }
        this.products.value = data.value || [];
      } catch (err) {
        console.error("Ошибка при получении данных:", err);
      }
    },
    setMatch(data: MatchData) {
      this.match = data;
    },
    setCompetiton(data: any) {
      this.competition = data;
    },
    setTeam(data: any) {
      this.team = data;
    },
  },
});
