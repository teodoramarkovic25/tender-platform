import React, { useState } from 'react';
import clsx from 'clsx';


export function CreateTender() {
  
//const TenderForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [documents, setDocuments] = useState('');
  const [criteria, setCriteria] = useState('');
  const [weightage, setWeightage] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDeadlineChange = (event) => {
    setDeadline(event.target.value);
  };

  const handleDocumentsChange = (event) => {
    setDocuments(event.target.value);
  };

  const handleCriteriaChange = (event) => {
    setCriteria(event.target.value);
  };

  const handleWeightageChange = (event) => {
    setWeightage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

  
    if (!title || !description || !deadline || !documents || !criteria || !weightage) {
      alert('Please fill in all required fields.');
      
    }
else{

console.log('Form submitted!');
}
    
  }
//}

    return (
      
    
<div className="d-flex justify-content-center">
  <div className="col-10 col-md-8 col-lg-6">
    <h1 className="text-center text-dark">Create Tender</h1> 
    <form className="form card p-3" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label fs-6 fw-bolder text-dark" htmlFor="title">Title:</label>
        <input className="form-control form-control-lg form-solid" type="text" id="title" placeholder="Tender title" value={title}
              onChange={handleTitleChange}required/>
      </div>
      <div className="mb-3">
        <label className="form-label fs-6 fw-bolder text-dark" htmlFor="description">Description:</label>
        <input className="form-control form-control-lg form-solid" type="text" id="description" placeholder="Tender description" value={description}
              onChange={handleDescriptionChange}required/>
      </div>
      <div className="mb-3">
        <label className="form-label fs-6 fw-bolder text-dark" htmlFor="deadline">Deadline date:</label>
        <input className="form-control form-control-lg form-solid" type="date" id="deadline" value={deadline}
              onChange={handleDeadlineChange}required/>
      </div>
      <div className="mb-3">
        <label className="form-label fs-6 fw-bolder text-dark" htmlFor="documents">Associated Documents:</label>
        <input className="form-control form-control-lg form-solid" type="file" id="documents"value={documents}
              onChange={handleDocumentsChange} required/>
      </div>
      <div className="mb-3">
        <h3>Evaluation Criteria:</h3>
        <input className="form-control form-control-lg form-solid" type="text" placeholder="Tender criteria" value={criteria}
              onChange={handleCriteriaChange}required/>
      </div>
      <div className="mb-3">
        <input className="form-control form-control-lg form-solid" type="number" step="any" min="100" max="100 000 000" placeholder="Weightage" value={weightage}
    onChange={handleWeightageChange} required />
      </div>
      <button
  className="btn btn-lg btn-danger" style={{ backgroundColor: '#FF0000' }}type="submit" onClick={handleSubmit}> Create Tender</button>

    </form>
  </div>
</div>

        
     
    )
}

export default CreateTender;