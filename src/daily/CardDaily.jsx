import { useState, useEffect } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";
import Button from 'react-bootstrap/Button';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function CardDaily({ tarotContent }) {
  const genAI = new GoogleGenerativeAI('AIzaSyD263avpbNrg16PM2kIS6iKj9JW01XjUeM');
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const [aiResponse, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [deck, setDeck] = useState([...tarotContent])
  const [createCard, setCreateCard] = useState([]);
  const [cardFace, setCardFace] = useState('');
  const [cardAriaLabel, setCardAriaLabel] = useState('Reveal card');
  const [cardNumber, setCardNumber] = useState('');
  const [disabled, setDisabled] = useState(false);

  let randomBinary = Math.floor(Math.random() * 2 + 1);
  var randomValue = randomBinary === 1 ? 'upright' : 'reversed';
  // var randomValue = Math.random() < 0.5 ? 'upright' : 'reversed';
  var randomValueNumber = randomValue === 'upright' ? 1 : 2;
  let date = new Date().toLocaleDateString();

  useEffect(() => {
    let min = 1;
    let max = deck.length - 2;
    let randomInt = Math.floor(Math.random() * (max - min));

    // creates drawn card in either upright or reversed position
    setCreateCard([...createCard,
      {
        id: randomInt,
        tarotText: deck[randomInt]
      }
    ]);

    setSearch(deck[randomInt].title);
    setCardNumber(deck[randomInt].cardValue);
    console.log(search, cardNumber, randomValue, cardAriaLabel);
  }, []);

  const handleClick = () => {
    setCardAriaLabel(search);
    aiRun2();
    setCardFace('show');
    setDisabled(true);
  }

  // Generative AI Call fetch
  const aiRun2 = async () => {
    const prompt = `Tarot reading with ${search} for ${date}. Include the name of the card, an interpretation, and the meaning for both the upright and reversed positions. Also include a contextual reading for ${date}.`;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    setResponse(text);

    console.log(prompt, text);
    console.log('api', search, cardNumber, randomValue, randomValueNumber)
  }

  return (
    <div className="container-xxl">
      <h1 className="text-center">Daily Card for {date}</h1>
      <div className="row justify-content-center mb-4">
        <div className="col-lg-10 col-md-9">
          <div className="row justify-content-center mb-4">
            <div className="col-auto mb-4">
              <Button variant="link" className="btn-daily" onClick={() => handleClick()} aria-live="polite" aria-label={cardAriaLabel} disabled={disabled}>
                <div className="flip-card">
                  <div className={'flip-card-inner ' + cardFace}>
                    <div className="flip-card-front">
                        <img src='/tarot/images/cards/back.svg' className='card-img-top' alt="Back of Tarot Card"/>
                    </div>
                    <div className="flip-card-back">
                        <img src={'/tarot/images/cards/' + cardNumber + '.avif'} className={'card-img-top tarot-' + cardNumber} aria-label={search} />
                    </div>
                  </div>
                </div>
              </Button>
            </div>
            <div className="col-sm mb-4">
              {/* {loading == true && search != '' ?
                <p style={{ margin: '30px 0' }}>Loading ...</p>
                :
                <div>
                  <Markdown remarkPlugins={[remarkGfm]}>{aiResponse}</Markdown>
                </div>
              } */}
              <div>
                <Markdown remarkPlugins={[remarkGfm]}>{aiResponse}</Markdown>
              </div>
            </div>
          </div>
          <p className="text-center"><small>Powered by <a href="https://gemini.google.com/">Gemini</a></small></p>
        </div>
      </div>
    </div>
  )
}

export default CardDaily;