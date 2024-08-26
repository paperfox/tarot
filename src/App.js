import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import CardDeck from './deck/CardDeck';
import TarotArray from './static/Tarot-content';
import CardList from './list/CardList';
import About from './About';
import Footer from './Footer';

function App() {
  const tarotContent = TarotArray();

  return (
    <>
      <main className="paperfox-content">
        <a href="https://paperfox.github.io" className="paperfox-logo">
          <img src="/images/paperfoxlogo-bold.svg" alt="Back to homepage" />
        </a>
        <Tabs
          defaultActiveKey="TarotApp"
          id="paperfox-"
          className="mb-3 w-100"
        >
          <Tab eventKey="TarotApp" title="Deck">
            <CardDeck tarotContent={tarotContent} />
          </Tab>
          <Tab eventKey="TarotCardList" title="Card List">
            <CardList tarotContent={tarotContent} />
          </Tab>
          <Tab eventKey="TarotAboutPage" title="About">
            <About />
          </Tab>
        </Tabs>
      </main>
      <Footer />
    </>
  );
}

export default App;
