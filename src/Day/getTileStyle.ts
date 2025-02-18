import {JSX} from 'solid-js';
import {vars} from '../css';
import {store} from '../store/store';
import {Ymd} from '../types';

export const getTileStyle = ({
  year,
  month,
  day,
}: Ymd): JSX.CSSProperties | undefined => {
  const type = store.calendar[year]?.[month]?.[day]?.type;

  switch (type) {
    case 'wfo': {
      return {
        'background-color': vars.wfo.backgroundColor,
        color: vars.wfo.color,
      };
    }
    default:
      return undefined;
  }
};
