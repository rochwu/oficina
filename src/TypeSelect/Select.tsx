import {Component, JSXElement} from 'solid-js';

import {Select as Base, SelectRootProps} from '@kobalte/core/select';

import {vars} from '../css';
import './select.css';

export type SelectOption = {
  label: JSXElement;
  value: string;
};

export type SelectProps = {
  value: SelectOption;
  options: SelectOption[];
  onChange: (option: SelectOption | null) => void;
} & Pick<SelectRootProps<SelectOption>, 'placeholder'>;

export const Select: Component<SelectProps> = (props) => {
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
            {props.item.rawValue.label}
          </Base.ItemLabel>
          {/* <Component.ItemIndicator class="select__item-indicator">
              x
            </Component.ItemIndicator> */}
        </Base.Item>
      )}
    >
      <Base.Trigger
        class="select__trigger"
        style={{'background-color': vars.select.backgroundColor}}
      >
        <Base.Value<SelectOption> class="select__value">
          {(state) => state.selectedOption().label}
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
