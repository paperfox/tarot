import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function CardModal({ dataImg, dataContent, modalDeck }) {
  const [show, setShow] = useState(false);

  const handleShowModal = () => {
    setShow(!show);
  };

  return (
    <>
      <button
        className={`${modalDeck ? 'float-end btn-tarotcard btn-link' : 'float-end btn-link'}`}
        onClick={handleShowModal}
        aria-label={`${
          modalDeck
            ? `More information about ${dataContent.title}`
            : `View larger image of ${dataContent.title}`
        }`}
        data-testid="info-modal-trigger"
      >
        {modalDeck === false || (
          <img
            src="https://paperfox.github.io/images/info-icon-by-i-con.svg"
            className="info-icon"
            alt="info icon"
          />
        )}

        {modalDeck === true || (
          <img
            src={'/images/cards/' + dataImg + '.avif'}
            className="w-100 rounded"
            alt={'Image of ' + dataContent.title + ' card'}
          />
        )}
      </button>

      <Modal show={show} onHide={handleShowModal} centered size={`${modalDeck ? 'lg' : ''}`}>
        <Modal.Header closeButton>
          <Modal.Title as="h2">{dataContent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row justify-content-center pf--px-half">
            <div className={`${modalDeck ? 'col-md-4 col-5' : 'col-auto pf--mb-half'}`}>
              <img
                src={'/images/cards/' + dataImg + '.avif'}
                className={`${
                  modalDeck ? 'w-100 rounded pf--mb-1-half' : 'w-100 rounded pf--mb-half'
                }`}
                alt={'Image of ' + dataContent.title + ' card'}
              />
            </div>

            {modalDeck == false || (
              <div className="col-sm col-12">
                <h3>{dataContent.uprightTitle}</h3>
                <p className="pf--mb-3">{dataContent.uprightCard}</p>
                <h3>{dataContent.reverseTitle}</h3>
                <p>{dataContent.reverseCard}</p>
                {dataContent.link && (
                  <p className="pf--pt-1-half text-right">
                    <small>
                      Characters from{' '}
                      <a href={dataContent.link} target="_blank" rel="noreferrer">
                        {dataContent.linkText}
                      </a>
                    </small>
                  </p>
                )}
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CardModal;
