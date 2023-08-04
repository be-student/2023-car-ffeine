import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getLocalStorage } from '@utils/storage';

import { modalActions } from '@stores/modalStore';
import { serverStore } from '@stores/serverStore';

import { DEFAULT_TOKEN, SERVERS } from '@constants';
import { LOCAL_KEY_TOKEN } from '@constants/storageKeys';

const fetchReportCharger = async (stationId: number) => {
  const token = getLocalStorage<number>(LOCAL_KEY_TOKEN, DEFAULT_TOKEN);
  const mode = serverStore.getState();
  return fetch(`${SERVERS[mode]}/stations/${stationId}/reports`, {
    method: 'POST',
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    },
  });
};
export const useUpdateStationChargerReport = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: fetchReportCharger,
    onSuccess: () => {
      alert('신고가 완료됐습니다.');
      modalActions.closeModal();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['isStationChargerReported'] });
    },
  });

  const updateStationChargerReport = (stationId: number) => {
    mutate(stationId);
  };

  return { updateStationChargerReport };
};