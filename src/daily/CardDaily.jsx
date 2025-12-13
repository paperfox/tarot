import { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function CardDaily({ tarotContent }) {
  const MY_KEY = import.meta.env.VITE_KEY;

  const [aiResponse, setResponse] = useState('');
  const [search, setSearch] = useState('');
  const [deck, setDeck] = useState([...tarotContent]);
  const [createCard, setCreateCard] = useState([]);
  const [cardFace, setCardFace] = useState('');
  const [cardAriaLabel, setCardAriaLabel] = useState('Reveal card');
  const [cardNumber, setCardNumber] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [binary, setBinary] = useState('');

  const genAI = new GoogleGenerativeAI(MY_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  var loading = disabled === true ? 'skeleton-loading' : '';
  let date = new Date().toLocaleDateString();

  useEffect(() => {
    let min = 1;
    let max = deck.length - 2;
    let randomInt = Math.trunc(Math.random() * (max - min));
    let randomBinary = Math.trunc(Math.random() * 2 + 1);

    // creates drawn card in either upright or reversed position
    setCreateCard([
      ...createCard,
      {
        id: randomInt,
        reverseCard: randomBinary,
        tarotText: deck[randomInt],
      },
    ]);

    setSearch(deck[randomInt].title);
    setCardNumber(deck[randomInt].cardValue);
    setBinary(randomBinary);
  }, []);

  const position = binary === 1 ? 'upright' : 'reversed';

  const handleClick = () => {
    // THERE'S A BETTER WAY TO DO THIS, but it's sunday so I'll come back to it later
    let demand = document.querySelectorAll('.daily-description'); // add tests starting here
    demand.forEach((el) => {
      el.classList.add('width');
    });

    setCardAriaLabel(search);
    aiRun();
    setCardFace('show');
    setDisabled(true);
  };

  // Generative AI Call fetch
  const aiRun = async () => {
    const prompt = `Tarot reading with ${search} for ${date}. Include the name of the card, an reading of the  ${position} position meaning only as a bulleted list but do not include the word only in the title. Also include a contextual reading for ${date} and ${position} position only but do not include the word only in the title as a paragraph.`;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    setResponse(text);
  }; // end testing section

  return (
    <div className="container">
      <h1 className="text-center">Daily Card for {date}</h1>
      {disabled == false ? <p className="text-center">Reveal today's card below</p> : ''}
      <div className="d-flex justify-content-center pf--mb-1-half">
        <div className="daily-container">
          <div className="d-flex justify-content-center flex-column-sm align-items-center pf--mb-1-half">
            <div className="daily-card-img pf--mb-1-half">
              <button
                className="btn-daily"
                onClick={() => handleClick()}
                aria-live="polite"
                aria-label={cardAriaLabel}
                disabled={disabled}
              >
                <div className="flip-card">
                  <div className={'flip-card-inner ' + cardFace}>
                    <div className="flip-card-front">
                      <img
                        src="/images/cards/back.svg"
                        className="card-img"
                        alt="Back of Tarot Card"
                      />
                    </div>
                    <div className="flip-card-back">
                      <img
                        src={cardNumber ? '/images/cards/' + cardNumber + '.avif' : ''}
                        className={`card-img tarot-${cardNumber}_${binary}`}
                        aria-label={search}
                      />
                    </div>
                  </div>
                </div>
              </button>
            </div>
            <div className="pf--ml-1 pf--mb-1-half daily-description demand-2">
              <div className={loading}>
                {disabled == true ? (
                  <span className="visually-hidden" aria-live="polite" aria-busy="true">
                    Daily card reading for {search} is loading.
                  </span>
                ) : (
                  ''
                )}
                <Markdown remarkPlugins={[remarkGfm]}>{aiResponse}</Markdown>
              </div>
            </div>
          </div>
          <p className="text-center">
            <small>
              Powered by <a href="https://gemini.google.com/">Gemini</a>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardDaily;
