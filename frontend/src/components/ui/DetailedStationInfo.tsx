import { styled } from 'styled-components';

import { useSelectedStation } from '@hooks/useSelectedStation';

const DetailedStationInfo = () => {
  const { data: station, isLoading, isError } = useSelectedStation();

  if (isLoading || isError) return <></>;

  const {
    stationName,
    companyName,
    contact,
    chargers,
    isParkingFree,
    operatingTime,
    address,
    detailLocation,
    isPrivate,
    stationState,
    privateReason,
  } = station;

  return (
    <Container>
      <h2>{stationName}</h2>
      <p>{companyName}</p>
      <p>{address}</p>
      {detailLocation && <p>{detailLocation}</p>}
      {operatingTime && <p>{operatingTime}</p>}
      {stationState && <p>{stationState}</p>}
      {contact && <p>{contact}</p>}
      {privateReason && <p>{privateReason}</p>}
      <div>
        {isPrivate && <p>이용 제한</p>}
        {isParkingFree && <p>주차무료</p>}
      </div>
      {chargers.map((data, index) => {
        const { type, price, capacity, latestUpdateTime, state, method } = data;

        return (
          <ChargerContainer key={index}>
            <li>{type}</li>
            <li>가격: {price}</li>
            <li>{capacity >= 50 ? '급속' : '완속'}</li>
            {latestUpdateTime && <li>{String(latestUpdateTime)}</li>}
            <li>충전기 상태: {state}</li>
            {method && <li>{method}</li>}
          </ChargerContainer>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 80px;
  left: 180px;
  z-index: 999;
  padding: 10px;
  background-color: white;
  box-shadow: 1px 1px 2px gray;
`;

const ChargerContainer = styled.ul`
  border: 1px solid #000;
`;

export default DetailedStationInfo;