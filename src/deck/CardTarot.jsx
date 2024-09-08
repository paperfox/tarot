import { useState } from 'react';
import CardModal from '../CardModal';
import Button from 'react-bootstrap/Button';

function CardTarot({ reverseCard, dataImg, dataContent, layoutTitles }) {
  const [cardFace, setCardFace] = useState('');
  const [showCard, setShowCard] = useState('');
  const [cardAriaLabel, setCardAriaLabel] = useState('Reveal card');

  setTimeout(() => {
    setShowCard('draw-animation-style');
  }, 550);

  const handleVisibility = () => {
    setCardFace('show');
    setCardAriaLabel(dataContent.title);
  }

  return (
    <div className="col-auto" id={'tarot-content-' + dataImg + reverseCard}>
      <div className={`card ${showCard}`}>
        <div className="card-body">
          <h2 className="p">{layoutTitles}</h2>
          <div className="mb-3">
            <Button variant="link" onClick={handleVisibility} aria-live="polite" aria-label={cardAriaLabel}>
              <div className="flip-card">
                <div className={'flip-card-inner ' + cardFace}>
                  <div className="flip-card-front">
                      <img src='/tarot/images/cards/back.svg' className='card-img-top' alt="Back of Tarot Card"/>
                  </div>
                  <div className="flip-card-back">
                      <img src={'/tarot/images/cards/' + dataImg + '.avif'} className={'card-img-top tarot-' + dataImg + reverseCard} alt=""/>
                  </div>
                </div>
              </div>
            </Button>
          </div>
          <CardModal reverseCard={reverseCard} dataImg={dataImg} dataContent={dataContent} modalDeck={true} />
        </div>
      </div>
    </div>
  );
}

export default CardTarot;