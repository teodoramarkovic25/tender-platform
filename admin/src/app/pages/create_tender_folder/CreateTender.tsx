import React from "react";
import clsx from 'clsx'


export function CreateTender() {
    return (
      
    
<div className="d-flex justify-content-center">
  <div className="col-10 col-md-8 col-lg-6">
    <h1 className="text-center text-dark">Create Tender</h1> 
    <form className="form card p-3">
      <div className="mb-3">
        <label className="form-label fs-6 fw-bolder text-dark" htmlFor="title">Title:</label>
        <input className="form-control form-control-lg form-solid" type="text" id="title" placeholder="Tender title"required/>
      </div>
      <div className="mb-3">
        <label className="form-label fs-6 fw-bolder text-dark" htmlFor="description">Description:</label>
        <input className="form-control form-control-lg form-solid" type="text" id="description" placeholder="Tender description"required/>
      </div>
      <div className="mb-3">
        <label className="form-label fs-6 fw-bolder text-dark" htmlFor="deadline">Deadline date:</label>
        <input className="form-control form-control-lg form-solid" type="date" id="deadline" required/>
      </div>
      <div className="mb-3">
        <label className="form-label fs-6 fw-bolder text-dark" htmlFor="documents">Associated Documents:</label>
        <input className="form-control form-control-lg form-solid" type="file" id="documents" required/>
      </div>
      <div className="mb-3">
        <h3>Evaluation Criteria:</h3>
        <input className="form-control form-control-lg form-solid" type="text" placeholder="Tender criteria"required/>
      </div>
      <div className="mb-3">
        <input className="form-control form-control-lg form-solid" type="number" step="100" min="0" max="100 000 000" placeholder="Weightage" required />
      </div>
      <button
  className="btn btn-lg btn-danger" style={{ backgroundColor: '#FF0000' }}type="button"> Create Tender</button>

    </form>
  </div>
</div>

        
     
    )
}
