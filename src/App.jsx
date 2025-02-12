import { Tab, Tabs } from 'react-bootstrap';
import CardDeck from './deck/CardDeck';
import CardList from './list/CardList';
import CardDaily from './daily/CardDaily';
import About from './About';
import Footer from './Footer';
import DeckArray from './static/Deck-content';

function App() {
  const justCards = [];

  // Removing descriptions from the deck for cases where I need cards only
  for (let i = 0; i < DeckArray().length; i++) {
    if (DeckArray()[i].hasOwnProperty('description')) continue;
    justCards.push(DeckArray()[i]);
  }

  return (
    <>
      <main className="paperfox-content">
        <a href="https://paperfox.github.io" className="paperfox-logo" tabIndex={0}>
          <img src="/images/paperfoxlogo-bold.svg" alt="Back to Paperfox homepage" />
        </a>
        <Tabs defaultActiveKey="TarotApp" id="paperfox-" className="mb-3 w-100">
          <Tab eventKey="TarotApp" title="Deck">
            <CardDeck tarotContent={justCards} />
          </Tab>
          <Tab eventKey="TarotDailyCard" title="Daily">
            <CardDaily tarotContent={justCards} />
          </Tab>
          <Tab eventKey="TarotCardList" title="Card List">
            <CardList tarotContent={DeckArray()} />
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
