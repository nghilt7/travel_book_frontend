import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postRegister } from "../../services/apiServices";

import validateEmail from "../../utils/validateEmail";

import "./Register.scss";

const Register = () => {
  const defaultValid = {
    validEmail: true,
    validUsername: true,
    validPassword: true,
    validConfirmPassword: true,
  };
  // state
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isValidForm, setIsValidForm] = useState(defaultValid);

  // hook
  const navigate = useNavigate();

  // handle
  const handleSubmitForm = async (event) => {
    event.preventDefault();

    setIsValidForm(defaultValid);

    // validate
    let isValidEmail = await validateEmail(email);

    if (!isValidEmail) {
      toast.error("Email is not valid");
      setIsValidForm({ ...defaultValid, validEmail: false });
      return;
    }

    if (!username) {
      toast.error("Please enter your username");
      setIsValidForm({ ...defaultValid, validUsername: false });
      return;
    }

    if (!password) {
      toast.error("Please enter your password");
      setIsValidForm({ ...defaultValid, validPassword: false });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password is not correct");
      setIsValidForm({
        ...defaultValid,
        validPassword: false,
        validConfirmPassword: false,
      });
      return;
    }

    // call api
    setIsLoading(true);
    const res = await postRegister(email, username, password);
    if (res && +res.EC === 0) {
      toast.success(res.EM);
      setIsLoading(false);
      navigate("/login");
      return;
    }

    toast.error(res.EM);
  };

  return (
    <div className="register-container">
      <div className="container">
        <div className="header">
          <span>Already have an account?</span>{" "}
          <button
            className="btn btn-outline-success"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>{" "}
        </div>
        <div className="body">
          <div className="title">Tanghi</div>
          <div className="text">Hello, We happy to see you here</div>
          <form
            onSubmit={(event) => handleSubmitForm(event)}
            className="col-12"
          >
            <div className="form-group col-12 col-lg-3">
              <label>Email address</label>
              <input
                type="email"
                className={
                  isValidForm.validEmail
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group col-12 col-lg-3">
              <label>Username</label>
              <input
                type="text"
                className={
                  isValidForm.validUsername
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>

            <div className="form-group col-12 col-lg-3">
              <label>Password</label>
              <input
                type="password"
                className={
                  isValidForm.validPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="form-group col-12 col-lg-3">
              <label>Confirm Password</label>
              <input
                type="password"
                className={
                  isValidForm.validConfirmPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="btn btn-primary col-12 col-lg-3"
            >
              {isLoading ? (
                <i class="fa-solid fa-spinner loader-icon"></i>
              ) : (
                <span>Register</span>
              )}
            </button>

            <div className="mt-3">
              <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                {" "}
                &gt;&gt;&gt; Go to homepage
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
