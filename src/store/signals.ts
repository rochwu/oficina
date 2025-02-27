import { createSignal } from 'solid-js';

import type { DayType } from '../types';

/**
 * These are signals cuz I didn't want to store user or dayType, I wanted them to reset
 *
 * I def didn't want to persist user in case they log out
 */

export const [user, setUser] = createSignal('');

export const [dayType, setDayType] = createSignal<DayType>('wfo');

export const [gridIndex, setGridIndex] = createSignal(NaN);
