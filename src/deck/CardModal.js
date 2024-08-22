import React, { useState, Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function CardModal({ dataImg, dataContent }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Fragment>
      <Button variant="link" className="float-end" onClick={handleShow} aria-label={'More information about ' + dataContent.title} data-testid="info-modal-trigger">
        <img src='/images/info-icon-by-i-con.svg' className="info-icon" alt="info icon"/>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title as="h2">{dataContent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row justify-content-center">
            <div className="col-md-4 col-5">
              <img src={'/tarot/images/cards/' + dataImg + '.avif'} className="w-100 rounded mb-4" alt={'Image of ' + dataContent.title + ' card'}/>
            </div>
            <div className="col-sm col-12">
              <h3>{dataContent.uprightTitle}</h3>
              <p className="mb-5">{dataContent.uprightCard}</p>
              <h3>{dataContent.reverseTitle}</h3>
              <p>{dataContent.reverseCard}</p>
              {/* <h3>About the Image</h3>
              <p>{dataContent.bkgInfo}</p>
              <a href={dataContent.link} target="_blank" rel="noreferrer">Rider-Waite Description</a> */}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}

export default CardModal;