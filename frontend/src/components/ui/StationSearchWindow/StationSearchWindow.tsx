import { XMarkIcon } from '@heroicons/react/24/outline';
import { css, styled } from 'styled-components';

import { useExternalState } from '@utils/external-state';

import { stationSearchWindowOpenStore } from '@stores/navItemsOpenStore';

import Button from '@common/Button';
import Text from '@common/Text';

import { windowTriggeredLnb } from '@style';

import SearchResult from './SearchResult';
import StationSearchBar from './StationSearchBar';

const StationSearch = () => {
  const [isOpen, setIsOpen] = useExternalState(stationSearchWindowOpenStore);

  if (!isOpen) return <></>;

  return (
    <S.Container>
      <S.Section>
        <Button css={closeButton} onClick={() => setIsOpen(false)} aria-label="검색창 닫기">
          <XMarkIcon width="3.2rem" stroke="#58595c" strokeWidth={1.5} />
        </Button>
        <StationSearchBar shadow borderColor="#767676" />
        <Text tag="h2" fontSize={1.7} weight="bold" css={labelText}>
          충전소 검색 결과
        </Text>
      </S.Section>

      <SearchResult />
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    width: 34rem;
    height: 100%;
    min-height: 100vh;
    background: #fcfcfc;
    outline: 0.15rem solid #e1e4eb;
    padding: 2rem 2.4rem 5.2rem;

    ${windowTriggeredLnb}
  `,

  Section: styled.section`
    width: 100%;
    position: sticky;
    top: 0;
    background: #fcfcfc;
  `,
};

const closeButton = css`
  display: block;
  margin: -0.4rem -0.8rem 2.8rem auto;
  background: #fcfcfc;
`;

const labelText = css`
  padding: 4.8rem 0 2.2rem;
`;

export default StationSearch;