import { useState } from 'react';
import CardModal from '../CardModal';

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
  };

  return (
    <div id={'tarot-content-' + dataImg + reverseCard}>
      <div className={`card ${showCard}`}>
        <div className="card-body">
          <h2 className="p">{layoutTitles}</h2>
          <div className="pf--mb-1">
            <button
              className="btn-drawn-card"
              onClick={handleVisibility}
              aria-live="polite"
              aria-label={cardAriaLabel}
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
                      src={'/images/cards/' + dataImg + '.avif'}
                      className={'card-img tarot-' + dataImg + reverseCard}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </button>
          </div>
          <CardModal
            reverseCard={reverseCard}
            dataImg={dataImg}
            dataContent={dataContent}
            modalDeck={true}
          />
        </div>
      </div>
    </div>
  );
}

export default CardTarot;
