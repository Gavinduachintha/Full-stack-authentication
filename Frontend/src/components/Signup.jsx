import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlSubmit = async (e) => {
    e.prevenDefault();
    try {
      const res = await axios.post("http://localhost:3000/register", {
        name,
        email,
        password,
      });
      localStorage.setItem("token",res.data.token)
    } catch (error) {}
  };

  return <></>;
};

export default Signup;
