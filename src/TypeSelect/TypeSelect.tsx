import { onMount } from 'solid-js';
import { styled } from 'solid-styled-components';

import { vars } from '../css';
import { dayType, setDayType } from '../store';
import type { DayType } from '../types';
import type { SelectProps } from './Select';
import { Select } from './Select';
import { tutorial } from '../tutorial';

const Container = styled.div({
  position: 'absolute',
  top: '0',
  width: '100%',
  padding: vars.gap,
  boxSizing: 'border-box',
});

export const TypeSelect = () => {
  let ref!: HTMLDivElement;
  let timeout: number = 0;

  const openChange: SelectProps['onOpenChange'] = (isOpen) => {
    // If user clears it stop tutorial
    if (isOpen === false && timeout) {
      clearTimeout(timeout);
    }
  };

  onMount(() => {
    if (tutorial.needed()) {
      const button = ref.querySelector('button');

      if (!button) {
        return;
      }

      const click = () => {
        button.dispatchEvent(
          new PointerEvent('pointerdown', { cancelable: true, bubbles: true }),
        );
      };

      click();

      timeout = window.setTimeout(() => {
        click();
      }, tutorial.selectShownMs);
    }
  });

  const options: { label: string; value: DayType }[] = [
    { value: 'wfo', label: 'WFO' },
    { value: 'pto', label: 'PTO' },
    { value: 'sick', label: 'Sick' },
    { value: 'holiday', label: 'Holiday' },
  ];

  const change: SelectProps['onChange'] = (option) => {
    const next = option?.value;

    if (next) {
      setDayType(next as DayType);
    }
  };

  const value = () => options.find((option) => option.value === dayType())!;

  return (
    <Container ref={ref}>
      <Select
        value={value()}
        options={options}
        onChange={change}
        onOpenChange={openChange}
      />
    </Container>
  );
};
