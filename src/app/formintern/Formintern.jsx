"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./formintern.scss";

function Forminternship() {
  const [error, setError] = useState(null);
  const [offerId, setOfferId] = useState("");
  const [FormInter, setFormInter] = useState({
    Name: "",
    LastName: "",
    Adress: "",
    Email: "",
    uploadDocument: null,
    uploadDocument1: null,
    description: "",
    offerId: "",
  });

  useEffect(() => {
    const offerId = new URLSearchParams(window.location.search).get("offerId");
    setOfferId(offerId || "");
  }, []);

  const handleReset = () => {
    setFormInter({
      Name: "",
      LastName: "",
      Adress: "",
      Email: "",
      uploadDocument: null,
      uploadDocument1: null,
      description: "",
      offerId: offerId,
    });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Name", FormInter.Name);
    formData.append("LastName", FormInter.LastName);
    formData.append("Adress", FormInter.Adress);
    formData.append("Email", FormInter.Email);
    formData.append("description", FormInter.description);
    formData.append("offerId", offerId);

    if (FormInter.uploadDocument) {
      formData.append("uploadDocument", FormInter.uploadDocument);
    }

    if (FormInter.uploadDocument1) {
      formData.append("uploadDocument1", FormInter.uploadDocument1);
    }

    try {
      const response = await axios.post("/api/users/formcandidat", formData);
      console.log("FormInter submission successful", response.data);
    } catch (error) {
      console.error("FormInter submission failed", error.message);
      setError(true);
    }
  };

  return (
    <div className="formintern">
      <h1>Apply for an internship</h1>
      <form onSubmit={handleForm}>
        <label htmlFor="name">Name*</label>
        <input
          type="text"
          name="name"
          id="name"
          value={FormInter.Name}
          onChange={(e) => setFormInter({ ...FormInter, Name: e.target.value })}
          placeholder="Enter Name"
          required
        />
        <label htmlFor="lastname">Last Name*</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          value={FormInter.LastName}
          onChange={(e) =>
            setFormInter({ ...FormInter, LastName: e.target.value })
          }
          placeholder="Enter Last Name"
          required
        />

        <label htmlFor="adress">Adress*</label>
        <input
          type="text"
          name="adress"
          id="adress"
          value={FormInter.Adress}
          onChange={(e) =>
            setFormInter({ ...FormInter, Adress: e.target.value })
          }
          required
        />

        <label htmlFor="email">Email*</label>
        <input
          type="text"
          name="email"
          id="email"
          value={FormInter.Email}
          onChange={(e) =>
            setFormInter({ ...FormInter, Email: e.target.value })
          }
          required
        />

        <label htmlFor="file">Upload CV</label>
        <input
          type="file"
          name="uploadDocument"
          id="file"
          onChange={(e) =>
            setFormInter({ ...FormInter, uploadDocument: e.target.files[0] })
          }
          placeholder="Upload CV"
        />

        <label htmlFor="file1">Upload Cover Letter</label>
        <input
          type="file"
          name="uploadDocument1"
          id="file1"
          onChange={(e) =>
            setFormInter({ ...FormInter, uploadDocument1: e.target.files[0] })
          }
          placeholder="Upload Cover Letter"
        />
        <label htmlFor="description">Description*</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          value={FormInter.description}
          onChange={(e) =>
            setFormInter({ ...FormInter, description: e.target.value })
          }
          placeholder="Provide more details"
          required
        ></textarea>

        <button type="reset" id="butt2" value="reset" onClick={handleReset}>
          Reset
        </button>
        <button type="submit" id="bu" value="Submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default  Forminternship;
