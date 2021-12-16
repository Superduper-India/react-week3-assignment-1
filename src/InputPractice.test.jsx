import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
    const value = '책 읽기';
    const handleChange = jest.fn();
    const handleClick = jest.fn();

    const renderInput = () => render(
        <Input
            value={value}
            onChange={handleChange}
            onClick={handleClick}
        />,
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('when change input', () => {
        it('calls onChange handler', () => {
            // Given
            const { getByLabelText } = renderInput();

            // When
            fireEvent.change(getByLabelText('할 일'), {
                target: { value: '아무것도 안하기' },
            });

            // Then
            expect(handleChange).toBeCalled();
        });
    });

    describe('with same text', () => {
        it('not call onChange handler', () => {
            // Given
            const { getByLabelText } = renderInput();

            // When
            fireEvent.change(getByLabelText('할 일'), {
                target: { value },
            });

            // Then
            expect(handleChange).not.toBeCalled();
        });
    });

    it('renders input', () => {
        const { container, getByLabelText } = renderInput();

        const input = getByLabelText('할 일');

        expect(input.value).toBe(value);
        expect(container).toHaveTextContent('할 일');
        expect(container).toHaveTextContent('추가');
    });

    describe('when click button', () => {
        it('calls onClick handler', () => {
            // Given
            const { getByText } = renderInput();

            // When
            fireEvent.click(getByText('추가'));

            // Then
            expect(handleClick).toBeCalled();
        });
    });
});