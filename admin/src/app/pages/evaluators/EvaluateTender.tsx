import React from "react";

export function EvaluateTender() {

    return (
        <div className='d-flex justify-content-center'>
          <h1 className='text-center text-dark'>Evaluate Tender</h1>
          <form className='form card p-3'>
          <div className='mx-auto col-10 col-md-8 col-lg-6'>
          <label className='form-label fs-6 fw-bolder text-dark' htmlFor="title">Title:</label>
          <input className='form-control form-control-lg form-solid' type="text" id="title"required/>
          <br/>
          <label className='form-label fs-6 fw-bolder text-dark' htmlFor="description">Description:</label>
          <input className='form-control form-control-lg form-solid'type="text" id="description" required/>
          <br/>
          <label className='form-label fs-6 fw-bolder text-dark'htmlFor="deadline">Deadline date:</label>
          <input type="date" id="deadline" required/>
          <br/>
          <label className='form-label fs-6 fw-bolder text-dark' htmlFor="documents">Associated Documents:</label>
          <input className='form-control form-control-lg form-solid'type="file" id="documents" required/>
          <br/>
          <h3>Evaluation Criteria:</h3>
           <input className='form-control form-control-lg form-solid' type="text" required/>
          <br/>
          <input className='form-control form-control-lg form-solid' type="number" step="0.01" min="0" max="100" placeholder="Weightage" required />
          <br/>
          <button className='btn btn-lg w-100 mb-5' type="button" >Create Tender</button>
          </div>
          </form>
          <div>
          </div>
          </div>
      )
  }