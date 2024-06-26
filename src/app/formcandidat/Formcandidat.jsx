"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./formcandidat.scss";

function Formcandidat() {
  const [error, setError] = useState(null);
  const [offerId, setOfferId] = useState("");
  const [FormCand, setFormCand] = useState({
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
    setFormCand({
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
    formData.append("Name", FormCand.Name);
    formData.append("LastName", FormCand.LastName);
    formData.append("Adress", FormCand.Adress);
    formData.append("Email", FormCand.Email);
    formData.append("description", FormCand.description);
    formData.append("offerId", offerId);

    if (FormCand.uploadDocument) {
      formData.append("uploadDocument", FormCand.uploadDocument);
    }

    if (FormCand.uploadDocument1) {
      formData.append("uploadDocument1", FormCand.uploadDocument1);
    }

    try {
      const response = await axios.post("/api/users/formcandidat", formData);
      console.log("Form submission successful", response.data);
    } catch (error) {
      console.error("Form submission failed", error.message);
      setError(true);
    }
  };

  return (
    <div className="formcand">
      <h1>Apply for a job</h1>
      <form onSubmit={handleForm}>
        <label htmlFor="name">Name*</label>
        <input
          type="text"
          name="name"
          id="name"
          value={FormCand.Name}
          onChange={(e) => setFormCand({ ...FormCand, Name: e.target.value })}
          placeholder="Enter Name"
          required
        />
        <label htmlFor="lastname">Last Name*</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          value={FormCand.LastName}
          onChange={(e) =>
            setFormCand({ ...FormCand, LastName: e.target.value })
          }
          placeholder="Enter Last Name"
          required
        />

        <label htmlFor="adress">Adress*</label>
        <input
          type="text"
          name="adress"
          id="adress"
          value={FormCand.Adress}
          onChange={(e) =>
            setFormCand({ ...FormCand, Adress: e.target.value })
          }
          required
        />

        <label htmlFor="email">Email*</label>
        <input
          type="text"
          name="email"
          id="email"
          value={FormCand.Email}
          onChange={(e) =>
            setFormCand({ ...FormCand, Email: e.target.value })
          }
          required
        />

        <label htmlFor="file">Upload CV</label>
        <input
          type="file"
          name="uploadDocument"
          id="file"
          onChange={(e) =>
            setFormCand({ ...FormCand, uploadDocument: e.target.files[0] })
          }
          placeholder="Upload CV"
        />

        <label htmlFor="file1">Upload Cover Letter</label>
        <input
          type="file"
          name="uploadDocument1"
          id="file1"
          onChange={(e) =>
            setFormCand({ ...FormCand, uploadDocument1: e.target.files[0] })
          }
          placeholder="Upload Cover Letter"
        />
        <label htmlFor="description">Description*</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          value={FormCand.description}
          onChange={(e) =>
            setFormCand({ ...FormCand, description: e.target.value })
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

export default Formcandidat;
