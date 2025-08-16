import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Paginator from 'src/components/common/Paginator/Paginator';

describe('Paginator component', () => {
    const onPageChanged = jest.fn();

    beforeEach(() => {
        onPageChanged.mockClear();
    });

    test('renders correct number of pages based on totalItemsCount and pageSize', () => {
        render(
            <Paginator
                totalItemsCount={45}
                pageSize={10}
                currentPage={1}
                onPageChanged={onPageChanged}
                portionSize={5}
            />
        );

        // Должно быть 5 страниц (45/10 = 4.5 → 5)
        // По portionSize=5, страница должна показывать 1..5
        const pageNumbers = screen.getAllByText(/[1-5]/).filter(el => el.classList.contains('pageCount') || el.tagName === 'SPAN');
        expect(pageNumbers.length).toBe(5);
    });

    test('Prev button disabled on first portion', () => {
        render(
            <Paginator
                totalItemsCount={100}
                pageSize={10}
                currentPage={1}
                onPageChanged={onPageChanged}
                portionSize={5}
            />
        );
        const prevButton = screen.getByText('PREV') as HTMLButtonElement;
        expect(prevButton.disabled).toBe(true);
    });

    test('Clicking Next button navigates to next portion', () => {
        render(
            <Paginator
                totalItemsCount={100}
                pageSize={10}
                currentPage={1}
                onPageChanged={onPageChanged}
                portionSize={5}
            />
        );
        const nextButton = screen.getByText('NEXT');

        // Кликаем кнопку Next
        fireEvent.click(nextButton);

        // Теперь должны отображаться страницы со 6 по 10
        expect(screen.getByText('6')).toBeInTheDocument();
        expect(screen.queryByText('1')).not.toBeInTheDocument();
    });

    test('Clicking on page number calls onPageChanged with correct page', () => {
        render(
            <Paginator
                totalItemsCount={30}
                pageSize={10}
                currentPage={1}
                onPageChanged={onPageChanged}
                portionSize={10}
            />
        );
        const page3 = screen.getByText('3');
        fireEvent.click(page3);
        expect(onPageChanged).toHaveBeenCalledWith(3);
    });
});
