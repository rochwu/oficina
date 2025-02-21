import {styled} from 'solid-styled-components';
import {setStore, store} from '../store';
import {DayType} from '../types';
import {Select, SelectProps} from './Select';
import {vars} from '../css';

const Container = styled.div({
  position: 'absolute',
  top: '0',
  width: '100%',
  padding: vars.gap,
  boxSizing: 'border-box',
});

export const TypeSelect = () => {
  const options: {label: string; value: DayType}[] = [
    {value: 'wfo', label: 'WFO'},
    {value: 'pto', label: 'PTO'},
    {value: 'holiday', label: 'Holiday'},
  ];

  const change: SelectProps['onChange'] = (option) => {
    const next = option?.value;

    if (next) {
      setStore('type', next as DayType);
    }
  };

  const type = () => options.find((option) => option.value === store.type)!;

  return (
    <Container>
      <Select value={type()} options={options} onChange={change} />
    </Container>
  );
};
