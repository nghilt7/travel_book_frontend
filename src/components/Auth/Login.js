import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./Login.scss";
import validateEmail from "./../../utils/validateEmail";
import { postLogin } from "../../services/apiServices";

const Login = () => {
  const defaultValid = {
    validEmail: true,
    validPassword: true,
  };
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    if (!password) {
      toast.error("Please enter your password");
      setIsValidForm({ ...defaultValid, validPassword: false });
      return;
    }

    // call api
    const res = await postLogin(email, password);
    if (res && +res.EC === 0) {
      toast.success(res.EM);
      navigate("/");
      return;
    }

    toast.error(res.EM);
  };

  return (
    <div className="login-container">
      <div className="container">
        <div className="header">
          <span>Don't have an account yet?</span>{" "}
          <button
            className="btn btn-outline-info"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </button>{" "}
        </div>
        <div className="body">
          <div className="title">Tanghi</div>
          <div className="text">Hello, who’s this?</div>
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

            <button type="submit" className="btn btn-primary col-12 col-lg-3">
              Login
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

export default Login;
