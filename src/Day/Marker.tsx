import {Component, JSX, JSXElement} from 'solid-js';
import {styled} from 'solid-styled-components';
import {DayType} from '../types';
import {vars} from '../css';
import {todayDataAttribute} from '../constants';

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
  [`&[${todayDataAttribute}]`]: {
    ...vars.today,
  },
});

export const getStyle = (type?: DayType): JSX.CSSProperties | undefined => {
  // No marks on date
  if (!type) {
    return;
  }

  return {
    'background-color': vars[type].backgroundColor,
    color: vars[type].color,
  };
};

export const Marker: Component<Props> = (props) => {
  return (
    <Container style={getStyle(props.type)} {...props}>
      {props.children}
    </Container>
  );
};
