import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import _ from "lodash";

import { putUpdateTrip } from "../../../services/apiServices";

function ModalUpdateTrip(props) {
  // props
  const { show, setShow, fetchAllTrips, dataModalUpdateTrip } = props;

  const defaultValid = {
    validTripName: true,
    validStartPlace: true,
    validStartDate: true,
    validDestination: true,
    validDuration: true,
  };

  // state
  const [tripName, setTripName] = useState("");
  const [startPlace, setStartPlace] = useState("");
  const [startDate, setStartDate] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");

  const [isValidForm, setIsValidForm] = useState(defaultValid);

  // hook

  useEffect(() => {
    if (!_.isEmpty(dataModalUpdateTrip)) {
      setTripName(dataModalUpdateTrip.tripName);
      setStartPlace(dataModalUpdateTrip.startPlace);
      setStartDate(dataModalUpdateTrip.startDate);
      setDestination(dataModalUpdateTrip.destination);
      setDuration(dataModalUpdateTrip.duration);
    }
  }, [dataModalUpdateTrip]);

  // handle
  const handleClose = () => setShow(false);

  const handleUpdateTrip = async () => {
    setIsValidForm(defaultValid);

    if (!startDate) {
      toast.error("Please choose your start date");
      setIsValidForm({ ...defaultValid, validStartDate: false });
      return;
    }
    if (!startPlace) {
      toast.error("Please enter your start place");
      setIsValidForm({ ...defaultValid, validStartPlace: false });
      return;
    }
    if (!destination) {
      toast.error("Please enter your destination");
      setIsValidForm({ ...defaultValid, validDestination: false });
      return;
    }
    if (!duration) {
      toast.error("Please enter your trip duration");
      setIsValidForm({ ...defaultValid, validDuration: false });
      return;
    }

    let res = await putUpdateTrip(
      dataModalUpdateTrip.id,
      startPlace,
      startDate,
      destination,
      duration
    );

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
      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update trip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row">
            <div className="form-group col-12 col-lg-6 mb-3">
              <label className="mb-2">Trip Name</label>
              <input
                type="text"
                disabled
                className={
                  isValidForm.validTripName
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={tripName}
                onChange={(event) => setTripName(event.target.value)}
              />
            </div>
            <div className="form-group col-12 col-lg-6 mb-3">
              <label className="mb-2">Start Date</label>
              <input
                type="date"
                className={
                  isValidForm.validStartDate
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </div>
            <div className="form-group col-12 col-lg-6 mb-3">
              <label className="mb-2">Start Place</label>
              <input
                type="text"
                className={
                  isValidForm.validStartPlace
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={startPlace}
                onChange={(event) => setStartPlace(event.target.value)}
              />
            </div>
            <div className="form-group col-12 col-lg-6 mb-3">
              <label className="mb-2">Destination</label>
              <input
                type="text"
                className={
                  isValidForm.validDestination
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
              />
            </div>
            <div className="form-group col-12 col-lg-6 mb-3">
              <label className="mb-2">Duration</label>
              <input
                type="text"
                className={
                  isValidForm.validDuration
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleUpdateTrip()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdateTrip;
