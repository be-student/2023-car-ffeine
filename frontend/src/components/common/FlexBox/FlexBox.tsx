import type { CSSProp } from 'styled-components';
import styled from 'styled-components';

import type { HTMLAttributes, ReactNode } from 'react';

import { borderRadius } from '@style';

import type { AxisType, BorderRadiusDirectionType } from 'types/style';

export const FLEX_BOX_ITEM_POSITION = {
  start: 'start',
  center: 'center',
  end: 'end',
  between: 'space-between',
} as const;

export interface FlexBoxProps extends HTMLAttributes<HTMLDivElement> {
  tag?: string;
  width?: string | number;
  height?: string | number;
  justifyContent?: keyof typeof FLEX_BOX_ITEM_POSITION;
  alignItems?: keyof typeof FLEX_BOX_ITEM_POSITION;
  noRadius?: BorderRadiusDirectionType;
  outlined?: boolean;
  background?: string;
  direction?: AxisType;
  nowrap?: boolean;
  gap?: number;
  rowGap?: number;
  columnGap?: number;
  css?: CSSProp;
  children: ReactNode;
}

const FlexBox = ({ children, tag, ...props }: FlexBoxProps) => {
  const changeableTag = tag || 'div';

  return (
    <S.FlexBox as={changeableTag} {...props}>
      {children}
    </S.FlexBox>
  );
};

const getSize = (size: string | number) => {
  if (size !== undefined) {
    return typeof size === 'number' ? `${size}rem` : size;
  }
  return 'auto';
};

const getGap = ({ gap, rowGap, columnGap }: Pick<FlexBoxProps, 'gap' | 'rowGap' | 'columnGap'>) => {
  if (gap !== undefined) {
    return `${gap * 0.4}rem`;
  }

  const row = rowGap !== undefined ? rowGap * 0.4 : 0.4;
  const column = columnGap !== undefined ? columnGap * 0.4 : 0.4;

  return `${row}rem ${column}rem`;
};

const S = {
  FlexBox: styled.div<FlexBoxProps>`
    width: ${({ width }) => getSize(width)};
    height: ${({ height }) => getSize(height)};
    flex-wrap: ${({ nowrap }) => (nowrap ? 'nowrap' : 'wrap')};
    flex-direction: ${({ direction }) => (direction ? direction : 'row')};
    justify-content: ${({ justifyContent }) => FLEX_BOX_ITEM_POSITION[justifyContent] || 'start'};
    align-content: ${({ alignItems }) => FLEX_BOX_ITEM_POSITION[alignItems] || 'start'};
    gap: ${({ gap, rowGap, columnGap }) => getGap({ gap, rowGap, columnGap })};
    background: ${({ background }) => background || '#fff'};
    border: ${({ outlined }) => (outlined ? '0.15rem solid #000' : 'none')};

    display: flex;
    border-radius: 1rem;
    font-size: 1.5rem;

    ${({ noRadius }) => noRadius && borderRadius(noRadius)};

    ${({ css }) => css};
  `,
};

export default FlexBox;