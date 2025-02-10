import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const ModalComponent = (props) => {
    const { modal, handleClose, deleteFunction, setModal, id } = props;
    return (
        <Modal isOpen={modal} toggle={handleClose}>
            <ModalHeader toggle={handleClose}>Advarsel</ModalHeader>
            <ModalBody>
                Er du sikker på at du vil slette? Dette kan ikke omgjøres.
      </ModalBody>
            <ModalFooter>
                <Button
                    onClick={() => deleteFunction(id, setModal(!modal))}
                    color='primary'
                >
                    Slette
        </Button>
                <Button color='secondary' onClick={handleClose}>
                    Avbryt
        </Button>
            </ModalFooter>
        </Modal>
    );
};
export default ModalComponent;
