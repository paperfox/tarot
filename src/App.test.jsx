import { render, screen, within, waitFor } from '@testing-library/react';
import { describe, it, test, expect } from 'vitest';
import user from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import App from './App';

const { axe, toHaveNoViolations } = require('jest-axe');

expect.extend(toHaveNoViolations);

describe('App loads and has content', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  it('loads and shows deck', () => {
    render(<App />);
    const deck = screen.getByLabelText(/Draw card from Tarot Deck/i);
    expect(deck).toBeInTheDocument();
  });

  it('does not have programmatic accessibility violations', async () => {
    const { container } = render(<App />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});

// Daily Card Tab
test('select tab and view daily card face down', async () => {
  render(<App />);

  user.click(await screen.findByRole('tab', { name: 'Daily', selected: false }));
  const dailyTabClicked = await screen.findByRole('tab', { name: 'Daily', selected: true });
  const subtitle = screen.getByLabelText(/Draw card from Tarot Deck/i);

  expect(dailyTabClicked).toBeTruthy();
  expect(subtitle).toBeInTheDocument("Reveal today's card below");
});

// Card List Tab
test('select tab and view full list of cards and descriptions', async () => {
  const { container } = render(<App />);

  user.click(await screen.findByRole('tab', { name: 'Card List', selected: false }));
  const listTabClicked = await screen.findByRole('tab', { name: 'Card List', selected: true });
  const cardTitles = within(container.querySelector('#paperfox--tabpane-TarotCardList')).getAllByRole('heading', {
    level: 3
  });

  expect(listTabClicked).toBeTruthy();
  expect(cardTitles).toHaveLength(78);
});

// About Tab
test('select and view about page', async () => {
  render(<App />);

  user.click(await screen.findByRole('tab', { name: 'About', selected: false }));
  const aboutTabClicked = await screen.findByRole('tab', {
    name: 'About',
    selected: true
  });

  expect(aboutTabClicked).toBeTruthy();
});

// Tracking for myself
describe('Count how many cards are left to draw', () => {
  it('wands not started', async () => {
    const { container } = render(<App />);

    await waitFor(() => userEvent.click(screen.getByRole('button', { name: 'Placeholders' })));
    const cardTitlesCups = within(container.querySelector('#paperfox--tabpane-TarotCardList')).getAllByRole('heading', {
      level: 3,
      name: /of wands/i
    });

    expect(cardTitlesCups).toHaveLength(2);
  });

  it('cups not started', async () => {
    const { container } = render(<App />);

    await waitFor(() => userEvent.click(screen.getByRole('button', { name: 'Placeholders' })));
    const cardTitlesCups = within(container.querySelector('#paperfox--tabpane-TarotCardList')).getAllByRole('heading', {
      level: 3,
      name: /of cups/i
    });

    expect(cardTitlesCups).toHaveLength(4);
  });

  it('swords not started', async () => {
    const { container } = render(<App />);

    await waitFor(() => userEvent.click(screen.getByRole('button', { name: 'Placeholders' })));
    const cardTitlesSwords = within(container.querySelector('#paperfox--tabpane-TarotCardList')).getAllByRole(
      'heading',
      { level: 3, name: /of swords/i }
    );

    expect(cardTitlesSwords).toHaveLength(9);
  });

  it('pentacles not started', async () => {
    const { container } = render(<App />);

    await waitFor(() => userEvent.click(screen.getByRole('button', { name: 'Placeholders' })));
    const cardTitlesPentacles = within(container.querySelector('#paperfox--tabpane-TarotCardList')).getAllByRole(
      'heading',
      { level: 3, name: /of pentacles/i }
    );

    expect(cardTitlesPentacles).toHaveLength(6);
  });
});
