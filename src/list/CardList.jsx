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
    <div className="container-xxl">
      <h1 className="text-center">Complete Card Listing</h1>
      <div className="row justify-content-center mb-4">
        <div className="col-auto">
          <p className="text-center">Filter cards based on state of artwork</p>
          <ButtonToolbar aria-label="Toolbar with button groups">
            <ButtonGroup className="me-2">
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
        </div>
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-lg-2 col-md-3">
          <ul className="list-unstyled h4 side-nav">
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
        <div className="col-lg-10 col-md-9">
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
