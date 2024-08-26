import { render, screen, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import user from '@testing-library/user-event'
import '@testing-library/jest-dom'
import CardList from './CardList'

import TarotArray from '../static/Tarot-content'

const tarotContent = TarotArray();

test('view only completed cards and descriptions', async () => {
  render(<CardList tarotContent={tarotContent} />);

  user.click(screen.getByRole('button', {name: 'Completed'}));
  const cardTitles = screen.getAllByRole('heading', { level: 3 });

  expect(cardTitles).toHaveLength(24);
});

test('view all started cards and descriptions', async () => {
  render(<CardList tarotContent={tarotContent} />);

  user.click(screen.getByRole('button', {name: 'Started'}));
  const cardTitles = screen.getAllByRole('heading', { level: 3 });

  expect(cardTitles).toHaveLength(47);
});

test('clear card filters', async () => {
  render(<CardList tarotContent={tarotContent} />);

  user.click(screen.getByRole('button', {name: 'Clear Filters'}));
  const cardTitles = screen.getAllByRole('heading', { level: 3 });

  expect(cardTitles).toHaveLength(78);
});

test('open card image view modal', async () => {
  render(<CardList tarotContent={tarotContent} />);

  user.click(await screen.findByLabelText('View larger image of The Fool card'));

  const closeButton = await screen.findByRole('button', {name: 'Close'});

  expect(closeButton).toBeTruthy();
});

test('drawn card image view modal closes', async () => {
  render(<CardList tarotContent={tarotContent} />);

  user.click(await screen.findByLabelText('View larger image of The Fool card'));

  await waitFor(() => screen.getByRole('button', { name: /close/i }));
  fireEvent.click(screen.getByRole('button', { name: /close/i }));
  await waitForElementToBeRemoved(() => screen.queryByRole('button', { name: /close/i }));

  expect(screen.queryByRole('button', { name: /close/i })).toBeNull();
});
