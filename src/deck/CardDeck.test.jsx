import { render, screen, act, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import user from '@testing-library/user-event'
// import '@testing-library/jest-dom'

// import userEvent from '@testing-library/user-event'
import CardDeck from './CardDeck'

const tarotContent = [
  {
    cardValue: 0,
    artStatus: 'Draft',
    title: 'The Fool',
    uprightTitle: 'Upright',
    reverseTitle: 'Reversed',
    uprightCard: 'You stand on the brink of the unknown about to plunge into something new. Opportunity is hand in hand with risk, but optimism leads you to step forward without knowing what the future holds. Embrace the unlimited potential of an unwritten future and seek new experiences - trust in the journey ahead, even if you don\'t know where it may lead. Caution and mindfulness along the way are key as this card can also indicate naivety and falling into recklessness and extravagance. Take the leap of faith toward the unknown, embrace change, but don\'t lose yourself. Remember, nothing is without consequences.',
    reverseCard: 'In reverse, this card signifies blindly charging forth into the unknown, believing oneself invulnerable to risks. The fool neglects to consider dangers - to oneself or others. Overvaluing your achievements, accomplishments, or looks will lead you down a negative path.',
    link: 'https://www.tarotcardmeanings.net/waite-tarot-comments/waite-on-tarot-fool.htm',
  },
  {
    cardValue: 1,
    artStatus: 'Complete',
    title: 'The Magician',
    uprightTitle: 'Upright',
    reverseTitle: 'Reversed',
    uprightCard: 'Take control of your life and trust in your abilities to create the reality that you desire. Know what you want and know that you have the ability to turn your ideas into reality through focused attention and effort. While this card is a powerful symbol of manifestation, creativity, and taking action, it can also indicate the potential for trickery or manipulation, reminding you to be cautious of those who may abuse their power. Aspire for greatness, be confident in yourself. Embrace your unique talents and skills and use them to your advantage.',
    reverseCard: 'Your mind is in disorder. A fall from grace leaves you with ill feelings. What was once agency and taking control of oneself has become manipulation and scheming.',
    link: 'https://www.tarotcardmeanings.net/waite-tarot-comments/waite-on-tarot-magician.htm'
  },
  {
    cardValue: 2,
    artStatus: 'Complete',
    title: 'The High Priestess',
    uprightTitle: 'Upright',
    reverseTitle: 'Reversed',
    uprightCard: 'The hidden depths of your mind whisper to you to trust your intuition. Listen to that inner voice. Look within yourself for answers, taking time for reflection and introspection. Seek answers beyond the surface, explore the unknown, and find knowledge that has not yet been revealed. Examining your innermost thoughts and feelings can lead you to gain a better understanding of yourself and discover deeper truths, laying the foundation for spiritual growth. Introspection may entice you to take a step back and look beyond the obvious, to seek deeper meaning and understanding in your life. By tapping into your intuition and inner wisdom, you can access powerful insights and uncover hidden truths that will become a guide toward greater clarity and enlightenment.',
    reverseCard: 'You\'ve become disconnected from your emotions, relying too heavily on logic, rational thinking, or external validation to make decisions. This can leave you feeling lonely, cold, and cut off. Relying on another to validate your decisions and feelings leaves you open to manipulation. Don\'t ignore your gut feelings - your intuition is reaching out even though you\'ve tried to push it away.',
    link: 'https://www.tarotcardmeanings.net/waite-tarot-comments/waite-on-tarot-highpriestess.htm'
  }
];

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

