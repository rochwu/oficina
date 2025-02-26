import './select.css';

import type { SelectRootProps } from '@kobalte/core/select';
import { Select as Base } from '@kobalte/core/select';
import type { JSXElement } from 'solid-js';
import { styled } from 'solid-styled-components';

import { vars } from '../css';
import type { DayType } from '../types';

export type SelectOption = {
  label: JSXElement;
  value: string;
};

export type SelectProps = {
  value: SelectOption;
  options: SelectOption[];
  onChange: (option: SelectOption | null) => void;
} & Pick<SelectRootProps<SelectOption>, 'placeholder'>;

const Hint = styled.div({
  position: 'absolute',
  borderRadius: '50%',
  height: vars.hint.size,
  width: vars.hint.size,
  top: `0`,
  right: `0`,
  transform: 'translateX(100%)',
});

const Selected = styled.span({
  display: 'inline-flex',
  position: 'relative',
});

export const Select = (props: SelectProps) => {
  return (
    <Base
      style={{
        'font-size': vars.select.fontSize,
      }}
      // defaultValue={props.defaultValue}
      value={props.value}
      onChange={props.onChange}
      options={props.options}
      optionValue="value"
      // optionTextValue="label"
      placeholder={props.placeholder}
      itemComponent={(props) => (
        <Base.Item item={props.item} class="select__item">
          <Base.ItemLabel class="select__itemlabel">
            <Selected>
              {props.item.rawValue.label}
              <Hint
                style={{
                  'background-color':
                    vars[props.item.rawValue.value as DayType].backgroundColor,
                }}
              />
            </Selected>
          </Base.ItemLabel>
          {/* <Component.ItemIndicator class="select__item-indicator">
              x
            </Component.ItemIndicator> */}
        </Base.Item>
      )}
    >
      <Base.Trigger
        class="select__trigger"
        style={{ 'background-color': vars.select.backgroundColor }}
      >
        <Base.Value<SelectOption> class="select__value">
          {(state) => {
            const { label, value } = state.selectedOption();

            return (
              <Selected>
                {label}
                <Hint
                  style={{
                    'background-color': vars[value as DayType].backgroundColor,
                  }}
                />
              </Selected>
            );
          }}
        </Base.Value>
        {/* <Component.Icon class="select__icon">x</Component.Icon> */}
      </Base.Trigger>
      <Base.Portal>
        <Base.Content
          style={{
            'font-size': vars.select.fontSize,
            'background-color': vars.select.backgroundColor,
          }}
          class="select__content"
        >
          <Base.Listbox
            class="select__listbox"
            style={{
              gap: vars.gap,
            }}
          />
        </Base.Content>
      </Base.Portal>
    </Base>
  );
};
