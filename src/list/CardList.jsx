import { useState, Fragment } from 'react';
import CardDesc from './CardDesc';
import SectionDesc from './SectionDesc';
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import DeckArray from '../static/Deck-content';

function CardList({ tarotContent }) {
  const tarotFull = DeckArray();
  const [filteredCards, setFilteredCards] = useState(tarotContent);

  const handleClickFilter = (status) => {
    setFilteredCards(tarotContent.filter((sort) => sort.artStatus === status));
  };

  const handleClickReset = () => {
    setFilteredCards(tarotContent);
  };

  const filterButtons = [
    { label: 'Completed', status: 'Complete' },
    { label: 'Drafts', status: 'Draft' },
    { label: 'Placeholders', status: 'None' },
  ];

  return (
    <div className="container">
      <h1 className="text-center">Complete Card Listing</h1>
      <div className="d-flex justify-content-center pf--mb-1-half">
        <div>
          <p className="text-center">Filter cards based on state of artwork</p>
          <ButtonToolbar aria-label="Toolbar with button groups" class="d-flex">
            <ButtonGroup className="pf--mr-half">
              {filterButtons.map((button) => (
                <Button
                  variant="primary"
                  onClick={() => handleClickFilter(button.status)}
                  key={button.label}
                >
                  {button.label}
                </Button>
              ))}
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="primary" onClick={handleClickReset} aria-label="Clear Filters">
                X
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
          <p className="text-center">
            <small>
              Cards matching filter:{' '}
              {filteredCards.length === 83 ? filteredCards.length - 5 : filteredCards.length}
            </small>
          </p>
        </div>
      </div>

      <div className="d-flex justify-content-center pf--mb-1-half">
        <div>
          <ul className="side-nav">
            {Array.of('Major', 'Wands', 'Cups', 'Swords', 'Pentacles').map((suit) => (
              <li key={suit}>
                <a href={`#${suit}-sectionTitle`}>
                  {suit === 'Major' ? (
                    suit + ' Arcana'
                  ) : (
                    <>
                      <span>Minor Arcana - </span>
                      {suit}
                    </>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="list-right">
          {tarotFull.map((sectionHeading, index) => (
            <Fragment key={index}>
              {sectionHeading.id && (
                <SectionDesc sectionData={sectionHeading} key={sectionHeading.id} />
              )}
              {/* {console.log(sectionHeading)} */}
              {filteredCards
                .filter((desc) => desc.title.includes(sectionHeading.title || null))
                .map((exampleCard) => (
                  <CardDesc dataContent={exampleCard} key={exampleCard.cardValue} />
                ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardList;
