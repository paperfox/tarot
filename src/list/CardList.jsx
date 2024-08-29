import React, { useState, Fragment } from 'react';
import CardDesc from './CardDesc';
import SectionArray from '../static/Section-content';
import SectionDesc from './SectionDesc';
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';

function CardList({ tarotContent }) {
  const [filteredCards, setFilteredCards] = useState(tarotContent)
  const sectionContent = SectionArray();

  const handleClickComplete = () => {
    setFilteredCards(
      tarotContent.filter(sort => sort.artStatus === 'Complete')
    )
  }

  const handleClickDraft = () => {
    setFilteredCards(
      tarotContent.filter(sort => sort.artStatus !== 'None')
    )
  }

  const handleClickNotStarted = () => {
    setFilteredCards(
      tarotContent.filter(sort => sort.artStatus === 'None')
    )
  }

  const handleClickReset = () => {
    setFilteredCards(
      tarotContent.filter(sort => sort.artStatus)
    )
  }
   const minorTitle = (<span>Minor Arcana -</span>);
  // builds a mixed array of my descriptions and cards
  // yea I'll find a better way to do this, but I like keeping the 2 lists separate...
  const tarotFull = [
    ...sectionContent.slice(0,1),
    ...tarotContent.slice(0,22),
    ...sectionContent.slice(1,2),
    ...tarotContent.slice(22,36),
    ...sectionContent.slice(2,3),
    ...tarotContent.slice(36,50),
    ...sectionContent.slice(3,4),
    ...tarotContent.slice(50,64),
    ...sectionContent.slice(4,5),
    ...tarotContent.slice(64,78),
  ];

  return (
    <div className="container-xxl">
      <h1 className="text-center">Complete Card Listing</h1>
      <div className="row justify-content-center mb-4">
        <div className="col-auto">
          <p>Filter cards based on status of artwork</p>
          <ButtonToolbar aria-label="Toolbar with button groups">
            <ButtonGroup className="me-2">
              <Button variant="primary" onClick={handleClickComplete}>Completed</Button>
              <Button variant="primary" onClick={handleClickDraft}>Started</Button>
              <Button variant="primary" onClick={handleClickNotStarted}>Placeholders</Button>
            </ButtonGroup>

            <ButtonGroup>
              <Button variant="primary" onClick={handleClickReset} aria-label="Clear Filters">X</Button>
            </ButtonGroup>
          </ButtonToolbar>
          <p className="text-center"><small>Cards matching filter: {filteredCards.length}</small></p>
        </div>
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-lg-2 col-md-3">
          <ul className="list-unstyled h4 side-nav">
            {Array.of('Major', 'Wands', 'Cups', 'Swords', 'Pentacles').map(suit => (
              <li key={suit}><a href={`#${suit}-sectionTitle`}>{suit === 'Major' ? suit + ' Arcana' : <><span>Minor Arcana - </span>{suit}</>}</a></li>
            ))}
          </ul>
        </div>
        <div className="col-lg-10 col-md-9">
          {tarotFull.map((sectionHeading) => (
            <Fragment key={sectionHeading.id}>
              {sectionHeading.id && <SectionDesc sectionData={sectionHeading} key={sectionHeading.id} />}
              {filteredCards.filter(desc => desc.title.includes(sectionHeading.title)).map(exampleCard => (
                <CardDesc dataContent={exampleCard} key={exampleCard.cardValue}/>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardList;