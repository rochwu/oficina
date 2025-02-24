import type { Component, JSXElement } from 'solid-js';
import type { CSSAttribute } from 'solid-styled-components';
import { styled } from 'solid-styled-components';

import { dayTypes } from '../constants';
import { vars } from '../css';
import type { DayType } from '../types';

type Props = {
  type?: DayType;
  children: JSXElement;
};

const Container = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  borderRadius: '50%',
  width: '100%',
  height: '100%',

  boxSizing: 'border-box',

  fontSize: vars.day.fontSize,

  ...dayTypes.reduce(
    (styles, type) => {
      styles[`&[data-${type}]`] = {
        backgroundColor: vars[type].backgroundColor,
        color: vars[type].color,
      };

      return styles;
    },
    {} as Record<string, CSSAttribute>,
  ),

  [`&[data-today]`]: {
    ...vars.today,
  },
});

const getDataAttribute = (type?: DayType) => {
  return type
    ? {
        [`data-${type}`]: '',
      }
    : {};
};

export const Marker: Component<Props> = (props) => {
  return (
    <Container {...getDataAttribute(props.type)} {...props}>
      {props.children}
    </Container>
  );
};
