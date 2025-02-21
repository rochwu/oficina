import {Component, JSX, JSXElement} from 'solid-js';
import {styled} from 'solid-styled-components';
import {DayType} from '../types';
import {vars} from '../css';

type Props = {
  type: DayType;
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
  '&[data-today]': {
    fontSize: vars.today.fontSize,
    textDecoration: 'underline',
  },
});

export const getTileStyle = (type: DayType): JSX.CSSProperties | undefined => {
  switch (type) {
    case 'holiday':
    case 'pto':
    case 'wfo': {
      return {
        'background-color': vars[type].backgroundColor,
        color: vars[type].color,
      };
    }
    default:
      return undefined;
  }
};

export const Tile: Component<Props> = (props) => {
  return (
    <Container style={getTileStyle(props.type)} {...props}>
      {props.children}
    </Container>
  );
};
