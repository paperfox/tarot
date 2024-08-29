import { render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import user from '@testing-library/user-event'
// import '@testing-library/jest-dom'
import App from './App';

describe('App loads and has content', () => {
  it ('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  })

  it('loads and shows deck', () => {
    render(<App />);
    const deck = screen.getByLabelText(/Draw card from Tarot Deck/i);
    expect(deck).toBeInTheDocument();
  });
});

test('loads and shows deck', () => {
  render(<App />);
  const deck = screen.getByLabelText(/Draw card from Tarot Deck/i);
  expect(deck).toBeInTheDocument();
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

// About Tab

test('select and view about page', async () => {
  render(<App />);

  user.click(await screen.findByRole('tab', {name: 'About', selected: false }));
  const aboutTabClicked = await screen.findByRole('tab', {name: 'About', selected: true });

  expect(aboutTabClicked).toBeTruthy();
});

// Tracking for myself

// test('count wands not started', async () => {
//   const { container } = render(<App />);

//   user.click(screen.getByRole('button', {name: 'Placeholders'}));
//   const cardTitlesWands = within(container.querySelector('#paperfox--tabpane-TarotCardList')).getAllByRole('heading', { level: 3, name: /of wands/i });

//   expect(cardTitlesWands).toHaveLength(5);
// });

// test('count cups not started', async () => {
//   const { container } = render(<App />);

//   user.click(screen.getByRole('button', {name: 'Placeholders'}));
//   const cardTitlesCups = within(container.querySelector('#paperfox--tabpane-TarotCardList')).getAllByRole('heading', { level: 3, name: /of cups/i });

//   expect(cardTitlesCups).toHaveLength(5);
// });

// test('count swords not started', async () => {
//   const { container } = render(<App />);

//   user.click(screen.getByRole('button', {name: 'Placeholders'}));
//   const cardTitlesSwords = within(container.querySelector('#paperfox--tabpane-TarotCardList')).getAllByRole('heading', { level: 3, name: /of swords/i });

//   expect(cardTitlesSwords).toHaveLength(10);
// });

// test('count pentacles not started', async () => {
//   const { container } = render(<App />);

//   user.click(screen.getByRole('button', {name: 'Placeholders'}));
//   const cardTitlesPentacles = within(container.querySelector('#paperfox--tabpane-TarotCardList')).getAllByRole('heading', { level: 3, name: /of pentacles/i });

//   expect(cardTitlesPentacles).toHaveLength(6);
// });