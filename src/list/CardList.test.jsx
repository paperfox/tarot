import { render, screen, waitFor } from '@testing-library/react';
import { test, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CardList from './CardList';
import DeckArray from '../static/Deck-content';

const tarotContent = DeckArray();

test('view only completed cards and descriptions', async () => {
  render(<CardList tarotContent={tarotContent} />);

  await waitFor(() => userEvent.click(screen.getByRole('button', { name: 'Completed' })));
  const cardTitles = screen.getAllByRole('heading', { level: 3 });

  expect(cardTitles).toHaveLength(25);
});

test('view all started cards and descriptions', async () => {
  render(<CardList tarotContent={tarotContent} />);

  await waitFor(() => userEvent.click(screen.getByRole('button', { name: 'Drafts' })));
  const cardTitles = screen.getAllByRole('heading', { level: 3 });

  expect(cardTitles).toHaveLength(24);
});

test('clear card filters', async () => {
  render(<CardList tarotContent={tarotContent} />);

  await waitFor(() => userEvent.click(screen.getByRole('button', { name: 'Drafts' })));
  const cardView = await waitFor(() => userEvent.click(screen.getByRole('button', { name: 'Clear Filters' })));
  await waitFor(() => userEvent.click(cardView));

  const cardTitles = screen.getAllByRole('heading', { level: 3 });

  expect(cardTitles).toHaveLength(78);
});
