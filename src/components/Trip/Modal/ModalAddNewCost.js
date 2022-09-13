import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import Select from "react-select";

import { postCreateNewCost } from "../../../services/apiServices";

function ModalAddNewCost(props) {
  // props
  const { show, setShow, fetchAllTrips, dataModalAddNewCost } = props;

  const defaultValid = {
    validCostValue: true,
  };

  // state
  const [costValue, setCostValue] = useState("");
  const [costDescription, setCostDescription] = useState("");

  const [selectedOption, setSelectedOption] = useState({});

  const [isValidForm, setIsValidForm] = useState(defaultValid);

  // hook

  const options = [
    { value: "FOOD", label: "Food" },
    { value: "TRAVEL", label: "Travel" },
    { value: "TRANSITION", label: "Transition" },
  ];

  // handle
  const handleClose = () => setShow(false);

  const handleCreateNewCost = async () => {
    setIsValidForm(defaultValid);

    if (!costValue) {
      toast.error("Please enter your cost value");
      setIsValidForm({ ...defaultValid, validCostValue: false });
      return;
    }

    let res = await postCreateNewCost(
      selectedOption.value,
      costValue,
      costDescription,
      dataModalAddNewCost.id
    );

    console.log(">>>", dataModalAddNewCost);

    if (res && +res.EC === 0) {
      toast.success(res.EM);
      fetchAllTrips();
      handleClose();
      setCostValue("");
      setCostDescription("");
      setSelectedOption("");
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new cost</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row">
            <div className="form-group col-12 col-lg-6 mb-3">
              <label className="mb-2">Type</label>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
              />
            </div>
            <div className="form-group col-12 col-lg-6 mb-3">
              <label className="mb-2">Value</label>
              <input
                type="text"
                className={
                  isValidForm.validCostValue
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={costValue}
                onChange={(event) => setCostValue(event.target.value)}
              />
            </div>
            <div className="form-group col-12 col-lg-6 mb-3">
              <label className="mb-2">Description</label>
              <input
                type="text"
                className="form-control"
                value={costDescription}
                onChange={(event) => setCostDescription(event.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleCreateNewCost()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddNewCost;
