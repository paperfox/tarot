import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CardModal({ dataImg, dataContent, modalDeck }) {
  const [show, setShow] = useState(false);

  const handleShowModal = () => {
    setShow(!show);
  };

  return (
    <>
      <Button
        variant="link"
        className={`${modalDeck ? 'float-end btn-tarotcard' : 'float-end'}`}
        onClick={handleShowModal}
        aria-label={`${
          modalDeck ? `More information about ${dataContent.title}` : `View larger image of ${dataContent.title}`
        }`}
        data-testid="info-modal-trigger"
      >
        {modalDeck === false || <img src="/images/info-icon-by-i-con.svg" className="info-icon" alt="info icon" />}

        {modalDeck === true || (
          <img
            src={'/tarot/images/cards/' + dataImg + '.avif'}
            className="w-100 rounded"
            alt={'Image of ' + dataContent.title + ' card'}
          />
        )}
      </Button>

      <Modal show={show} onHide={handleShowModal} centered size={`${modalDeck ? 'lg' : ''}`}>
        <Modal.Header closeButton>
          <Modal.Title as="h2">{dataContent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row justify-content-center">
            <div className={`${modalDeck ? 'col-md-4 col-5' : 'col-auto mb-2'}`}>
              <img
                src={'/tarot/images/cards/' + dataImg + '.avif'}
                className={`${modalDeck ? 'w-100 rounded mb-4' : 'w-100 rounded'}`}
                alt={'Image of ' + dataContent.title + ' card'}
              />
            </div>

            {modalDeck == false || (
              <div className="col-sm col-12">
                <h3>{dataContent.uprightTitle}</h3>
                <p className="mb-5">{dataContent.uprightCard}</p>
                <h3>{dataContent.reverseTitle}</h3>
                <p>{dataContent.reverseCard}</p>
                {dataContent.link && (
                  <p className="pt-4 text-right">
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
