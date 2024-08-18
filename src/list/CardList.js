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
      tarotContent.filter(t=>t.artStatus === 'Complete')
    )
  }

  const handleClickDraft = () => {
    setFilteredCards(
      tarotContent.filter(t=>t.artStatus !== 'None')
    )
  }

  const handleClickNotStarted = () => {
    setFilteredCards(
      tarotContent.filter(t=>t.artStatus === 'None')
    )
  }

  const handleClickReset = () => {
    setFilteredCards(
      tarotContent.filter(t=>t.artStatus)
    )
  }

  return (
    <div className="container-xxl">
      <h1 className="text-center">Complete Card Listing</h1>
      <div className="row justify-content-center mb-4">
        <div className="col-auto">
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
          <p className='text-center'>Cards matching filter: {filteredCards.length}</p>
        </div>
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-lg-2 col-md-3">
          <ul className="list-unstyled h4 side-nav">
            <li><a href="#Major-sectionTitle">Major Arcana</a></li>
            <li><a href="#Wands-sectionTitle"><span>Minor Arcana -</span> Wands</a></li>
            <li><a href="#Cups-sectionTitle"><span>Minor Arcana -</span> Cups</a></li>
            <li><a href="#Swords-sectionTitle"><span>Minor Arcana -</span> Swords</a></li>
            <li><a href="#Pentacles-sectionTitle"><span>Minor Arcana -</span> Pentacles</a></li>
          </ul>
        </div>
        <div className="col-lg-10 col-md-9">
          {sectionContent.filter(desc => desc.id.includes('Major')).map(sectionHeading => (
            <SectionDesc sectionData={sectionHeading} key={sectionHeading.id} />
          ))}
          {filteredCards.filter(desc => desc.cardValue <= 21).map(exampleCard => (
            <CardDesc dataContent={exampleCard} key={exampleCard.cardValue}/>
          ))}
          {/* if i do the index stuff below this section can go away */}

          {sectionContent.slice(1).map((sectionHeading, index) => (
            <Fragment key={sectionHeading.id}>
              <SectionDesc sectionData={sectionHeading} key={sectionHeading.id} />
              {/* filteredCards[index].map - everthing else goes here - */}
              {filteredCards.filter(desc => desc.title.includes(sectionHeading.title)).map(exampleCard => (
                <CardDesc dataContent={exampleCard} key={exampleCard.cardValue}/>
              ))}
            </Fragment>
            // if I put everything inside it's own sections in the array I should be  able to use index to simplify this further because the
            // index will be the unique Identify for each section insead of doing it by words
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardList;