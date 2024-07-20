import { render, screen, within, act, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import user from '@testing-library/user-event'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from './App'

test('loads and shows deck', () => {
  render(<App />);

  const deck = screen.findByLabelText('Draw card from Tarot Deck');
  expect(deck).toBeTruthy();
});


// Deck Tab

test('draw a card from the deck', async () => {
  render(<App />);

  user.click(await screen.findByLabelText('Draw card from Tarot Deck'));

  const cardInfo = screen.getAllByAltText(/info icon/i);

  expect(cardInfo).toBeTruthy();
});

test('draw 3 cards from the deck', async () => {
  const { container } = render(<App />);

  // draw 3 cards
  user.click(await screen.findByLabelText(/from Tarot Deck/i));
  user.click(await screen.findByLabelText(/from Tarot Deck/i));
  user.click(await screen.findByLabelText(/from Tarot Deck/i));

  const spreadTitles = within(container.querySelector('#paperfox--tabpane-TarotApp')).getAllByRole('heading', { level: 2 });

  expect(spreadTitles).toHaveLength(3);
});

test('deck disabled after drawing 3 cards', async () => {
  render(<App />);

  // draw 3 cards
  user.click(await screen.findByLabelText(/from Tarot Deck/i));
  user.click(await screen.findByLabelText(/from Tarot Deck/i));
  user.click(await screen.findByLabelText(/from Tarot Deck/i));

  const disabledDeck = await screen.findByLabelText(/Draw final card from Tarot Deck/i);

  expect(disabledDeck).toBeDisabled();
});

test('drawn card can be flipped over to view face', async () => {
  const { container } = render(<App />);

  user.click(await screen.findByLabelText('Draw card from Tarot Deck'));

  const cardView = await screen.findByRole('button', {name: 'Reveal card'});
  user.click(cardView);

  expect(container.querySelector('.flip-card-inner.show')).toBeTruthy();
});

test('open drawn card details modal', async () => {
  render(<App />);

  user.click(await screen.findByLabelText('Draw card from Tarot Deck'));
  user.click(screen.getByTestId('info-modal-trigger'));

  const closeButton = await screen.findByRole('button', {name: 'Close'});

  expect(closeButton).toBeTruthy();
});

test('drawn card details modal closes', async () => {
  render(<App />);

  user.click(await screen.findByLabelText('Draw card from Tarot Deck'));
  user.click(screen.getByTestId('info-modal-trigger'));

  // const closeButton = screen.getByRole('button', { name: /close/i });
  // await act(async () => {
  //   userEvent.click(closeButton);
  // });

  // expect(screen.queryByRole('dialog')).toBeNull();

  await waitFor(() => screen.getByRole('button', { name: /close/i }));
  fireEvent.click(screen.getByRole('button', { name: /close/i }));
  await waitForElementToBeRemoved(() => screen.queryByRole('button', { name: /close/i }));

  expect(screen.queryByRole('button', { name: /close/i })).toBeNull();
});

test('deck is reset to shuffled and undrawn', async () => {
  render(<App />);

  user.click(await screen.findByLabelText('Draw card from Tarot Deck'));

  const cardInfo = screen.findByRole('heading', {name: 'Past'});
  expect(cardInfo).toBeTruthy();

  const resetButton = screen.getByRole('button', { name: /Reset/i });
  await act(async () => {
    userEvent.click(resetButton);
  });

  expect(screen.queryByRole('heading', {name: 'Past'})).toBeNull();
});


// Card List Tab

test('select tab and view full list of cards and descriptions', async () => {
  const { container } = render(<App />);

  user.click(await screen.findByRole('tab', {name: 'Card List', selected: false }));
  const aboutTabClicked = await screen.findByRole('tab', {name: 'Card List', selected: true });
  const cardTitles = within(container.querySelector('#paperfox--tabpane-TarotCardList')).getAllByRole('heading', { level: 3 });

  expect(aboutTabClicked).toBeTruthy();
  expect(cardTitles).toHaveLength(78);
});

test('view only completed cards and descriptions', async () => {
  const { container } = render(<App />);

  user.click(screen.getByRole('button', {name: 'Completed'}));
  const cardTitles = within(container.querySelector('#paperfox--tabpane-TarotCardList')).getAllByRole('heading', { level: 3 });

  expect(cardTitles).toHaveLength(24);
});

test('view all started cards and descriptions', async () => {
  const { container } = render(<App />);

  user.click(screen.getByRole('button', {name: 'Started'}));
  const cardTitles = within(container.querySelector('#paperfox--tabpane-TarotCardList')).getAllByRole('heading', { level: 3 });

  expect(cardTitles).toHaveLength(45);
});

test('clear card filters', async () => {
  const { container } = render(<App />);

  user.click(screen.getByRole('button', {name: 'Clear Filters'}));
  const cardTitles = within(container.querySelector('#paperfox--tabpane-TarotCardList')).getAllByRole('heading', { level: 3 });

  expect(cardTitles).toHaveLength(78);
});

test('open card image view modal', async () => {
  render(<App />);

  user.click(await screen.findByLabelText('More information about The Fool'));

  const closeButton = await screen.findByRole('button', {name: 'Close'});

  expect(closeButton).toBeTruthy();
});

test('drawn card image view modal closes', async () => {
  render(<App />);

  user.click(await screen.findByLabelText('More information about The Fool'));

  await waitFor(() => screen.getByRole('button', { name: /close/i }));
  fireEvent.click(screen.getByRole('button', { name: /close/i }));
  await waitForElementToBeRemoved(() => screen.queryByRole('button', { name: /close/i }));

  expect(screen.queryByRole('button', { name: /close/i })).toBeNull();
});


// About Tab

test('select and view about page', async () => {
  render(<App />);

  user.click(await screen.findByRole('tab', {name: 'About', selected: false }));
  const aboutTabClicked = await screen.findByRole('tab', {name: 'About', selected: true });

  expect(aboutTabClicked).toBeTruthy();
});


// Tracking for myself

test('count wands not started', async () => {
  const { container } = render(<App />);

  user.click(screen.getByRole('button', {name: 'RWS'}));
  const cardTitlesWands = within(container.querySelector('#paperfox--tabpane-TarotCardList')).getAllByRole('heading', { level: 3, name: /of wands/i });

  expect(cardTitlesWands).toHaveLength(5);
});

test('count cups not started', async () => {
  const { container } = render(<App />);

  user.click(screen.getByRole('button', {name: 'RWS'}));
  const cardTitlesCups = within(container.querySelector('#paperfox--tabpane-TarotCardList')).getAllByRole('heading', { level: 3, name: /of cups/i });

  expect(cardTitlesCups).toHaveLength(6);
});

test('count swords not started', async () => {
  const { container } = render(<App />);

  user.click(screen.getByRole('button', {name: 'RWS'}));
  const cardTitlesSwords = within(container.querySelector('#paperfox--tabpane-TarotCardList')).getAllByRole('heading', { level: 3, name: /of swords/i });

  expect(cardTitlesSwords).toHaveLength(10);
});

test('count pentacles not started', async () => {
  const { container } = render(<App />);

  user.click(screen.getByRole('button', {name: 'RWS'}));
  const cardTitlesPentacles = within(container.querySelector('#paperfox--tabpane-TarotCardList')).getAllByRole('heading', { level: 3, name: /of pentacles/i });

  expect(cardTitlesPentacles).toHaveLength(6);
});