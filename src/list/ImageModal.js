import React, { useState, Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function ImageModal({ dataImg, dataContent }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Fragment>
      <Button variant="tertiary" className="float-end btn-tarotcard" onClick={handleShow} aria-label={`More information about ` + dataContent.title}>
        <img src={'/tarot/images/cards/' + dataImg + '.jpg'} className="w-100 rounded" alt={'Image of ' + dataContent.title + ' card'} />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title as="h2" className="text-center">{dataContent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row justify-content-center">
            <div className="col-auto mb-2">
              <img src={'/tarot/images/cards/' + dataImg + '.jpg'} className="modal-art-view rounded" alt={'Image of ' + dataContent.title + ' card'}/>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}

export default ImageModal;