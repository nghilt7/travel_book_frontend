import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { toast } from "react-toastify";

import { postChangeProfile } from "../../../services/apiServices";
import { doUpdate } from "./../../../redux/reducer/User/user.actions";

const ChangeProfile = (props) => {
  const defaultValid = {
    validUsername: true,
  };

  // state
  const [username, setUsername] = useState("");
  const [isValidForm, setIsValidForm] = useState(defaultValid);

  // props
  const { handleClose } = props;

  // redux
  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();

  // hook
  useEffect(() => {
    if (!_.isEmpty(account)) {
      setUsername(account.username);
    }
  }, [account]);

  // handle
  const handleChangeProfile = async () => {
    // validate
    setIsValidForm(defaultValid);

    if (!username) {
      toast.error("Please enter your username");
      setIsValidForm({ ...defaultValid, validUsername: false });
      return;
    }

    // data to send redux
    const data = {
      access_token: account.access_token,
      username: username,
      email: account.email,
      userId: account.userId,
    };

    let res = await postChangeProfile(account.userId, username);
    if (res && +res.EC === 0) {
      toast.success(res.EM);
      dispatch(doUpdate(data));
      handleClose();
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <div className="row">
        <div className="form-group col-12 col-lg-6">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control mt-2"
            id="email"
            disabled
            value={account.email}
          />
        </div>
        <div className="form-group col-12 col-lg-6">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className={
              isValidForm.validUsername
                ? "form-control mt-2"
                : "form-control is-invalid mt-2"
            }
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div className="mt-3">
          <button
            className="btn btn-primary"
            onClick={() => handleChangeProfile()}
          >
            Change
          </button>
        </div>
      </div>
    </>
  );
};

export default ChangeProfile;
