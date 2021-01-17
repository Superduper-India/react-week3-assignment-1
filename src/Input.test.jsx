import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const titleLabel = '할 일';
  const placeholder = '할 일을 입력해 주세요';
  const buttonText = '추가';

  const userEnterValue = '뭐라도 하자!';

  const handleClick = jest.fn();
  const handleChange = jest.fn();

  const init = (value = '') => render((
    <Input
      value={value}
      onClick={handleClick}
      onChange={handleChange}
    />
  ));

  test('shows label text', () => {
    const { container } = init();
    expect(container).toHaveTextContent(titleLabel);
  });

  context('without input value', () => {
    it('shows input placeholder', () => {
      const { getByPlaceholderText } = init();
      const input = getByPlaceholderText(placeholder);
      expect(input.value).toBe('');
    });

    it('click add button', () => {
      const { getByText } = init();

      expect(handleClick).not.toBeCalled();

      fireEvent.click(getByText(buttonText));

      expect(handleClick).toBeCalledTimes(1);
    });
  });

  context('shows input value', () => {
    it('shows entered value', () => {
      const { getByDisplayValue } = init(userEnterValue);
      getByDisplayValue(userEnterValue);
    });

    it('change to entered value', () => {
      const { getByPlaceholderText } = init();

      expect(handleChange).not.toBeCalled();

      fireEvent.change(
        getByPlaceholderText(placeholder),
        { target: { value: userEnterValue } },
      );

      expect(handleChange).toBeCalledTimes(1);
    });

    it('click add button', () => {
      const { getByText } = init(userEnterValue);

      expect(handleClick).not.toBeCalled();

      fireEvent.click(getByText(buttonText));

      expect(handleClick).toBeCalledTimes(1);
    });
  });
});