import React from "react";
import styles from "./Register.module.css";
import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassowrd, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user = {
      displayName,
      email,
      password,
      confirmPassowrd,
    };

    if (password !== confirmPassowrd) {
      setError("Password not match");
      return;
    }

    const res = await createUser(user);
    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);
  return (
    <div className={styles.register}>
      <h1>Register for you are allow to post</h1>
      <p>Create your user and Show your histories</p>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">
          <span>Name:</span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Name of user"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <label htmlFor="">
          <span>Email:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="Email of user"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="">
          <span>Password:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Password of user 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label htmlFor="">
          <span>Confirm Password:</span>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirm Password of user"
            value={confirmPassowrd}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        {!loading && (
          <button type="submit" className="btn">
            Register
          </button>
        )}
        {loading && (
          <button type="submit" disabled className="btn">
            Wait...
          </button>
        )}

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
