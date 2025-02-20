import {JSX} from 'solid-js';
import {vars} from '../css';
import {DayType} from '../types';

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
