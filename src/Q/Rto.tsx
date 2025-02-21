import {Component, createMemo} from 'solid-js';
import {styled} from 'solid-styled-components';
import {ByTypes} from './types';
import {vars} from '../css';
import {Ym} from '../types';
import {getWeekdays, getWeekdaysRemaining} from '../date';
import {today} from '../constants';

type Props = {
  types: ByTypes;
  yms: Ym[];
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  position: 'absolute',
  bottom: 0,
  right: 0,
  padding: vars.gap,
});

const Value = styled.div({});

export const Rto: Component<Props> = (props) => {
  const weekdays = props.yms.reduce((days, ym) => {
    return days + getWeekdays(ym);
  }, 0);

  const half = Math.ceil(weekdays / 2);

  const rto = createMemo(() => {
    const {wfo, pto, holiday} = props.types;
    const total = half - holiday - pto;

    return {
      wfo,
      required: total,
      possible: getWeekdaysRemaining({from: today, to: props.yms.at(-1)!}),
      missing: Math.max(total - wfo, 0),
    };

    // return `${wfo} / ${total} // ${getWeekdaysRemaining({from: today, to: props.yms.at(-1)!})}`;
  });

  return (
    <Container>
      <Value>{`${rto().wfo} / ${rto().required}`}</Value>
      <Value>{`${rto().missing} / ${rto().possible}`}</Value>
    </Container>
  );
};
