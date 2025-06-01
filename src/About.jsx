function About() {
  return (
    <div className="container-xxl">
      <h1 className="text-center">About The App</h1>
      <div className="row justify-content-center mb-4">
        <div className="col-xl-5 col-lg-6 col-md-7 col-sm-10">
          <div className="mb-5">
            <p>
              I'm having fun building a tarot app and eventually, slowly drawing the cards. As a
              developer and designer professionally and an artist by passion it gives me a chance to
              combine the things I love!
            </p>
            <p>
              Creative writing is not my jam but I'm doing my best, and constantly revising the card
              descriptions here. If you're looking for more in-depth card descriptions, I recommend
              checking out{' '}
              <a
                href="https://labyrinthos.co/blogs/tarot-card-meanings-list"
                target="_blank"
                rel="noreferrer"
              >
                Labyrinthos
              </a>
              .{' '}
              <a href="https://www.tarotcardmeanings.net/" target="_blank" rel="noreferrer">
                Tarot Card Meanings
              </a>{' '}
              also has some really nice one liners as well as the older Rider-Waite-Smith
              descriptions for context.
            </p>
            <p>
              If you're wondering about my favorite physical tarot decks, they're{' '}
              <a
                href="https://wyrmwoodgaming.com/corrupted-tarot/"
                target="_blank"
                rel="noreferrer"
              >
                Corrupted Tarot Deck
              </a>{' '}
              and{' '}
              <a
                href="https://www.shadowscapes.com/Tarot/cardsmain.php?suit=0"
                target="_blank"
                rel="noreferrer"
              >
                Shadowscapes Tarot Deck
              </a>{' '}
              - though there's a new deck,{' '}
              <a href="https://verdancetarot.com/" target="_blank" rel="noreferrer">
                Verdance Tarot
              </a>
              , by Stephanie Law coming out, so I'm excited for that!
            </p>
          </div>
          <div className="mb-5">
            <h2>About the Images</h2>
            <p>
              Images on this site are either my own work or from the Rider-Waite-Smith Tarot Deck
              (which is in the public domain).
            </p>
            <p>
              My images are not for reuse or reposting, though if you want one for any reason,
              please reach out to me and we can probably work something out -{' '}
              <a
                href="https://www.instagram.com/paperfoxmakesart/"
                target="_blank"
                rel="noreferrer"
              >
                @paperfoxmakesart
              </a>{' '}
              on instagram.
            </p>
            <p>
              Many of the characters in my Tarot images belong to others, please check out their
              work!
            </p>
          </div>
          <h2>Where to Find Me</h2>
          <p>Looking to connect? You can find me in any of these places.</p>
          <ul className="list-unstyled d-flex justify-content-center">
            <li className="m-3">
              <a href="https://paperfox.art" target="_blank" rel="noreferrer">
                <img
                  src="https://paperfox.github.io/images/paperfoxlogo-bold.svg"
                  alt="Paperfox Website"
                  class="icon-white"
                />
              </a>
            </li>
            <li className="m-3">
              <a
                href="https://www.instagram.com/paperfoxmakesart/"
                target="_blank"
                rel="noreferrer"
              >
                <img src="https://paperfox.github.io/images/instagramlogo.svg" alt="Instagram" />
              </a>
            </li>
            <li className="m-3">
              <a href="https://cara.app/paperfox" target="_blank" rel="noreferrer">
                <img
                  src="https://paperfox.github.io/images/cara-app-logo-circle-White.svg"
                  alt="Cara"
                />
              </a>
            </li>
            <li className="m-3">
              <a href="https://github.com/paperfox" target="_blank" rel="noreferrer">
                <img src="https://paperfox.github.io/images/github-mark.svg" alt="GitHub" />
              </a>
            </li>
            <li className="m-3">
              <a
                href="https://www.linkedin.com/in/nathaliegarfinkle/"
                target="_blank"
                rel="noreferrer"
              >
                <img src="https://paperfox.github.io/images/linkedinlogo.svg" alt="LinkedIn" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
