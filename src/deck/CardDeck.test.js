import { render, screen, act, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import user from '@testing-library/user-event'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import CardDeck from './CardDeck'
import TarotArray from '../static/Tarot-content'

const tarotContent = TarotArray();

test('draw a card from the deck', async () => {
  render(<CardDeck tarotContent={tarotContent} />);

  user.click(await screen.findByLabelText('Draw card from Tarot Deck'));

  const cardInfo = screen.getAllByAltText(/info icon/i);

  expect(cardInfo).toBeTruthy();
});

test('draw 3 cards from the deck', async () => {
  render(<CardDeck tarotContent={tarotContent} />);

  // draw 3 cards
  user.click(await screen.findByLabelText(/from Tarot Deck/i));
  user.click(await screen.findByLabelText(/from Tarot Deck/i));
  user.click(await screen.findByLabelText(/from Tarot Deck/i));

  const spreadTitles = screen.getAllByRole('heading', { level: 2 });

  expect(spreadTitles).toHaveLength(3);
});

test('deck disabled after drawing 3 cards', async () => {
  render(<CardDeck tarotContent={tarotContent} />);

  // draw 3 cards
  user.click(await screen.findByLabelText(/from Tarot Deck/i));
  user.click(await screen.findByLabelText(/from Tarot Deck/i));
  user.click(await screen.findByLabelText(/from Tarot Deck/i));

  const disabledDeck = await screen.findByLabelText(/Draw final card from Tarot Deck/i);

  expect(disabledDeck).toBeDisabled();
});

test('drawn card can be flipped over to view face', async () => {
  const { container } = render(<CardDeck tarotContent={tarotContent} />);

  user.click(await screen.findByLabelText('Draw card from Tarot Deck'));

  const cardView = await screen.findByRole('button', {name: 'Reveal card'});
  user.click(cardView);

  expect(container.querySelector('.flip-card-inner.show')).toBeTruthy();
});

test('open drawn card details modal', async () => {
  render(<CardDeck tarotContent={tarotContent} />);

  user.click(await screen.findByLabelText('Draw card from Tarot Deck'));
  user.click(screen.getByTestId('info-modal-trigger'));

  const closeButton = await screen.findByRole('button', {name: 'Close'});

  expect(closeButton).toBeTruthy();
});

test('drawn card details modal closes', async () => {
  render(<CardDeck tarotContent={tarotContent} />);

  user.click(await screen.findByLabelText('Draw card from Tarot Deck'));
  user.click(screen.getByTestId('info-modal-trigger'));

  await waitFor(() => screen.getByRole('button', { name: /close/i }));
  fireEvent.click(screen.getByRole('button', { name: /close/i }));
  await waitForElementToBeRemoved(() => screen.queryByRole('button', { name: /close/i }));

  expect(screen.queryByRole('button', { name: /close/i })).toBeNull();
});

test('deck is reset to shuffled and undrawn', async () => {
  render(<CardDeck tarotContent={tarotContent} />);

  user.click(await screen.findByLabelText('Draw card from Tarot Deck'));

  const cardInfo = screen.findByRole('heading', {name: 'Past'});
  expect(cardInfo).toBeTruthy();

  const resetButton = screen.getByRole('button', { name: /Reset/i });
  await act(async () => {
    userEvent.click(resetButton);
  });

  expect(screen.queryByRole('heading', {name: 'Past'})).toBeNull();
});

