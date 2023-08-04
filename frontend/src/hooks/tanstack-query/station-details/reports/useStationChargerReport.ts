import { useQuery } from '@tanstack/react-query';

import { getLocalStorage } from '@utils/storage';

import { serverStore } from '@stores/serverStore';

import { DEFAULT_TOKEN, SERVERS } from '@constants';
import { LOCAL_KEY_TOKEN } from '@constants/storageKeys';

const fetchStationChargerReport = (token: number, stationId: number) => {
  const mode = serverStore.getState();

  return fetch(`${SERVERS[mode]}/stations/${stationId}/reports/me`, {
    method: 'GET',
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    },
  }).then(async (response) => {
    const data = await response.json();
    return data.isReported;
  });
};

export const useStationChargerReport = (stationId: number) => {
  const token = getLocalStorage<number>(LOCAL_KEY_TOKEN, DEFAULT_TOKEN);

  return useQuery({
    queryKey: ['isStationChargerReported', stationId],
    queryFn: () => fetchStationChargerReport(token, stationId),
  });
};