import React, { useState } from "react";
import axios from "axios";
import "./formdocument.scss";

function FormDocuments() {
  const [deps, setDeps] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [FormD, setFormD] = useState({
    title: "",
    targeteddepartments: [], // Initialize with an empty array
    uploadDocument: "",
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleDepChange = (e) => {
    const { value, checked } = e.target;
    if (value === "all") {
      const updatedDeps = checked
        ? [
            "Development",
            "Design",
            "Project management",
            "Content",
            "Sales & Marketing",
            "Customer Support",
          ]
        : [];
      setDeps(updatedDeps);
      setFormD({ ...FormD, targeteddepartments: updatedDeps }); // Update targeteddepartments in FormD
    } else {
      let updatedDeps;
      if (checked) {
        updatedDeps = [...deps, value];
      } else {
        updatedDeps = deps.filter((dep) => dep !== value);
      }
      setDeps(updatedDeps);
      setFormD({ ...FormD, targeteddepartments: updatedDeps }); // Update targeteddepartments in FormD
    }
  };

  const resetCheckboxes = () => {
    // Reset the deps state to an empty array or any initial state you want
    setDeps([]);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", FormD.title);

    // Include the code you provided to add targeteddepartments to formData
    formData.append("targeteddepartments", FormD.targeteddepartments);

    const file = FormD.uploadDocument;
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = async function () {
      const arrayBuffer = reader.result;
      const blob = new Blob([arrayBuffer]);
      formData.append("uploadDocument", blob, file.name);

      // Sending data to the server
      try {
        console.log(deps);
        const response = await axios.post("/api/users/document", formData);
        console.log("Form submission successful", response.data);
      } catch (error) {
        console.error("Form submission failed", error.message);
        setError(true);
      }
    };
  };

  const handleTitleChange = (e) => {
    setFormD({ ...FormD, title: e.target.value });
    // Clear the error state when the title field is being edited
    setError(null);
  };

  const handleReset = () => {
    setFormD({
      title: "",
      targeteddepartments: [],
      uploadDocument: "",
    });
    setDeps([]); // Reset deps state as well
  };

  const handleModalClick = (e) => {
    // Prevent form submission/validation when clicking on the modal
    e.preventDefault();
    toggleModal();
  };

  return (
    <div className="formDocuments">
      <h1>Form Documents</h1>
      <form onSubmit={handleForm}>
        <label htmlFor="title">Title*</label>
        <input
          type="text"
          name="title"
          id="title"
          value={FormD.title}
          onChange={handleTitleChange}
          placeholder="Enter Title"
          required
        />
        <label htmlFor="dep">Targeted Departments*</label>
        <div className="department-selection">
          <button className="department-toggle" onClick={handleModalClick}>
            Select Departments
          </button>
          {showModal && (
            <div className="modal-overlay" onClick={toggleModal}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h2>Select Departments</h2>
                  <span
                    className="close"
                    onClick={() => {
                      toggleModal();
                      resetCheckboxes();
                    }}
                  >
                    &times;
                  </span>
                </div>
                <div className="modal-content">
                  <ul>
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          name="dep"
                          value="all"
                          checked={deps.length === 6}
                          onChange={handleDepChange}
                        />
                        All
                      </label>
                    </li>
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          name="dep"
                          value="Development"
                          checked={deps.includes("Development")}
                          onChange={handleDepChange}
                        />
                        Development
                      </label>
                    </li>
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          name="dep"
                          value="Design"
                          checked={deps.includes("Design")}
                          onChange={handleDepChange}
                        />
                        Design
                      </label>
                    </li>
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          name="dep"
                          value="Project management"
                          checked={deps.includes("Project management")}
                          onChange={handleDepChange}
                        />
                        Project management
                      </label>
                    </li>
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          name="dep"
                          value="Content"
                          checked={deps.includes("Content")}
                          onChange={handleDepChange}
                        />
                        Content
                      </label>
                    </li>
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          name="dep"
                          value="Sales & Marketing"
                          checked={deps.includes("Sales & Marketing")}
                          onChange={handleDepChange}
                        />
                        Sales & Marketing
                      </label>
                    </li>
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          name="dep"
                          value="Customer Support"
                          checked={deps.includes("Customer Support")}
                          onChange={handleDepChange}
                        />
                        Customer Support
                      </label>
                    </li>
                  </ul>
                </div>
                <div className="modal-footer">
                  <button
                    onClick={() => {
                      toggleModal();
                    }}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <label htmlFor="uploadDocument">Upload Document*</label>
        <input
          type="file"
          name="uploadDocument"
          id="uploadDocument"
          onChange={(e) =>
            setFormD({ ...FormD, uploadDocument: e.target.files[0] })
          }
          required
        />
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

export default FormDocuments;
