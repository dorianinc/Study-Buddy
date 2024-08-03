import { useState } from "react";
import { useLoginMutation } from "../../../store/features/api";
import { useModal } from "../../../context/ModalContext";
import "./LoginForm.css";

function LoginFormModal() {
  const [login] = useLoginMutation();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    await login({ credential, password })
      .unwrap()
      .then(closeModal)
      .catch((error) => setErrors(error.data.errors));
  };

  const signInDemo = async (e) => {
    e.preventDefault();
    return (
      await login({ credential: "demo_user123", password: "password1" })
        .unwrap()
        .then(closeModal)
        .catch((error) => setErrors(error.data.errors))
    );
  };

  return (
    <div className="login-modal">
      <h1 className="header">Log In</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="Username or Email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            className="input-field"
          />
          {errors.credential && <p className="errors">{errors.credential}</p>}
        </label>
        <label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          {errors.password && <p className="errors">{errors.password}</p>}
          {errors.login && <p className="errors">{errors.login}</p>}
        </label>
        <div className="button-group">
          <button className="pink-button" type="submit">
            Log In
          </button>
          <button className="demo-button" onClick={(e) => signInDemo(e)}>
            Demo User
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
