import {styled} from 'solid-styled-components';
import {vars} from '../css';
import {dayType, setDayType} from '../store';
import {RawDayType} from '../types';
import {Select, SelectProps} from './Select';

const Container = styled.div({
  position: 'absolute',
  top: '0',
  width: '100%',
  padding: vars.gap,
  boxSizing: 'border-box',
});

export const TypeSelect = () => {
  const options: {label: string; value: RawDayType}[] = [
    {value: 'wfo', label: 'WFO'},
    {value: 'pto', label: 'PTO'},
    {value: 'sick', label: 'Sick'},
    {value: 'holiday', label: 'Holiday'},
  ];

  const change: SelectProps['onChange'] = (option) => {
    const next = option?.value;

    if (next) {
      setDayType(next as RawDayType);
    }
  };

  const value = () => options.find((option) => option.value === dayType())!;

  return (
    <Container>
      <Select value={value()} options={options} onChange={change} />
    </Container>
  );
};
