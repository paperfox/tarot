import { useState } from 'react';
import CardTarot from './CardTarot';

function CardDeck({ tarotContent }) {
  const [createCard, setCreateCard] = useState([]);
  const [animateCard, setAnimateCard] = useState('');
  const [deckLabel, setDeckLabel] = useState('');
  const [counter, setCounter] = useState(0);
  const [deck, setDeck] = useState([...tarotContent]);

  const drawTitles = [
    {
      id: 'three-card-past',
      title: 'Past',
    },
    {
      id: 'three-card-present',
      title: 'Present',
    },
    {
      id: 'three-card-future',
      title: 'Future',
    },
  ];

  const handleClick = () => {
    let min = 1;
    let max = deck.length - 2;

    let randomInt = Math.trunc(Math.random() * (max - min));
    let randomBinary = Math.trunc(Math.random() * 2 + 1);

    if (deck.length > 75) {
      // creates drawn card in either upright or reversed position
      setCreateCard([
        ...createCard,
        {
          id: randomInt,
          reverseCard: '_' + randomBinary,
          tarotText: deck[randomInt],
        },
      ]);

      // animate on card draw
      setAnimateCard(`draw-animation-${counter}`);
      setTimeout(() => {
        setAnimateCard('draw-animation-time');
      }, 500);

      // removes drawn card from deck
      deck.splice(randomInt, 1);

      // counts cards drawn
      setCounter(counter + 1);

      // enhances screenreader experience
      if (counter === 0) {
        setDeckLabel('another ');
      } else if (counter === 1) {
        setDeckLabel('final ');
      }
    }
  };

  const handleClickReset = () => {
    setCreateCard([]);
    setAnimateCard('');
    setCounter(0);
    setDeckLabel('');
    setDeck([...tarotContent]);
  };

  return (
    <div className="container text-center">
      <h1>Three Card Draw</h1>
      <div className="mb-1-half">
        <button
          className="tarot-deck"
          onClick={handleClick}
          aria-live="polite"
          aria-label={'Draw ' + deckLabel + 'card from Tarot Deck'}
          disabled={counter === 3 ? true : false}
        >
          <div className="d-flex justify-content-center">
            <div className="mx-1-half build-deck">
              <p>Draw a Card</p>
              {Array.from({ length: 5 }, (_, i) => i).map((el) => (
                <img src="/images/cards/back.svg" key={el} className="deck-card-stack" alt="" />
              ))}
              <img
                src="/images/cards/back.svg"
                className={`deck-card-stack ${animateCard}`}
                alt=""
                id="top"
              />
            </div>
          </div>
        </button>
      </div>
      <div className="d-flex justify-content-center gap-1-half-sm mb-1-half">
        {createCard.map((exampleCard, index) => {
          return (
            <CardTarot
              layoutTitles={drawTitles[index].title}
              key={exampleCard.tarotText.cardValue}
              dataImg={exampleCard.tarotText.cardValue}
              dataContent={exampleCard.tarotText}
              reverseCard={exampleCard.reverseCard}
            />
          );
        })}
      </div>

      <button className="btn-primary mb-1-half" onClick={handleClickReset}>
        Reset
      </button>
    </div>
  );
}

export default CardDeck;
