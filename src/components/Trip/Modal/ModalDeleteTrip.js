import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteTrip } from "../../../services/apiServices";
import { toast } from "react-toastify";

function ModalDeleteTrip(props) {
  const { show, setShow, dataModalDeleteTrip, fetchAllTrips } = props;

  // handle
  const handleClose = () => setShow(false);

  const handleDeleteTrip = async (tripId) => {
    const res = await deleteTrip(tripId);
    console.log("res", res);
    if (res && +res.EC === 0) {
      toast.success(res.EM);
      fetchAllTrips();
      handleClose();
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {dataModalDeleteTrip.tripName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are you sure to delete</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDeleteTrip(dataModalDeleteTrip.id)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteTrip;
