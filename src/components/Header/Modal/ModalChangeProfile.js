import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ChangePassword from "./ChangePassword";

import ChangeProfile from "./ChangeProfile";

function ModalChangeProfile(props) {
  // props
  const { show, setShow } = props;

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Manage Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey="change-profile" className="mb-3">
            <Tab eventKey="change-profile" title="Change Profile">
              <ChangeProfile handleClose={handleClose} />
            </Tab>
            <Tab eventKey="change-password" title="Change Password">
              <ChangePassword handleClose={handleClose} />
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalChangeProfile;
