export default defineEventHandler(async (event: any) => {
  const competitionId = getQuery(event).competitionId || "PL";

  const response = await $fetch(
    `https://api.football-data.org/v4/${competitionId}`,
    {
      headers: {
        "X-Auth-Token": "4739e40fd1314fa0ad68f51c124b15a0",
      },
    }
  );
  return response;
});
