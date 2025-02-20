// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace Swipe {
  type Touch = 'pressed' | 'released';
  type Direction = 'up' | 'right' | 'down' | 'left';
  type Action = Touch | Direction;
  type Handler = (action: Action) => void;
}
