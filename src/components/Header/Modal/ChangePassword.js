import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { postChangePassword } from "../../../services/apiServices";

const ChangePassword = (props) => {
  const defaultValid = {
    validPassword: true,
    validNewPassword: true,
    validConfirmNewPassword: true,
  };

  // state
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isValidForm, setIsValidForm] = useState(defaultValid);

  // props
  const { handleClose } = props;

  // redux
  const account = useSelector((state) => state.user.account);

  // handle
  const handleChangePassword = async () => {
    // validate
    setIsValidForm(defaultValid);

    if (!password) {
      toast.error("Please enter your current password");
      setIsValidForm({ ...defaultValid, validPassword: false });
      return;
    }

    if (!newPassword) {
      toast.error("Please enter your new password");
      setIsValidForm({ ...defaultValid, validNewPassword: false });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("Your new password and confirm new password is not correct");
      setIsValidForm({
        ...defaultValid,
        validNewPassword: false,
        validConfirmNewPassword: false,
      });
      return;
    }

    let res = await postChangePassword(account.userId, password, newPassword);
    if (res && +res.EC === 0) {
      toast.success(res.EM);
      handleClose();
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <div className="row">
        <div className="form-group col-12 col-lg-6">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            className={
              isValidForm.validPassword
                ? "form-control mt-2"
                : "form-control is-invalid mt-2"
            }
            id="currentPassword"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="form-group col-12 col-lg-6">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            className={
              isValidForm.validNewPassword
                ? "form-control mt-2"
                : "form-control is-invalid mt-2"
            }
            id="newPassword"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
        </div>

        <div className="form-group col-12 col-lg-6">
          <label htmlFor="confirmNewPassword">Confirm New Password</label>
          <input
            type="password"
            className={
              isValidForm.validConfirmNewPassword
                ? "form-control mt-2"
                : "form-control is-invalid mt-2"
            }
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(event) => setConfirmNewPassword(event.target.value)}
          />
        </div>

        <div className="mt-3">
          <button
            className="btn btn-primary"
            onClick={() => handleChangePassword()}
          >
            Change
          </button>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
