import { Tab, Tabs } from 'react-bootstrap';
import CardDeck from './deck/CardDeck';
import CardList from './list/CardList';
import CardDaily from './daily/CardDaily';
import About from './About';
import Footer from './Footer';
import DeckArray from './static/Deck-content';

function App() {
  const tarotContent = DeckArray();

  // Removing descriptions from the deck, pre-sorted in descending order to avoid shifting issues
  const removeDesc = [68, 53, 38, 23, 0];

  removeDesc.forEach((description) => {
    tarotContent.splice(description, 1);
  });

  return (
    <>
      <main className="paperfox-content">
        <a href="https://paperfox.github.io" className="paperfox-logo" tabIndex={0}>
          <img src="/images/paperfoxlogo-bold.svg" alt="Back to homepage" />
        </a>
        <Tabs defaultActiveKey="TarotApp" id="paperfox-" className="mb-3 w-100">
          <Tab eventKey="TarotApp" title="Deck">
            <CardDeck tarotContent={tarotContent} />
          </Tab>
          <Tab eventKey="TarotDailyCard" title="Daily">
            <CardDaily tarotContent={tarotContent} />
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
