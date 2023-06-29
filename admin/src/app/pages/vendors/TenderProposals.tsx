import React from "react";
import clsx from 'clsx'
import customFileUploadButton from "../helper_functions/customFileUploadButton";

const TenderProposals=()=>{

    return(
      <div className='d-flex justify-content-center'>
          <div className='mx-auto col-10 col-md-8 col-lg-6'>

          <form className='form card p-3'>

              <h1 className='text-center text-dark'>Make an offer</h1>

              <div className='fv-row mb-10'>
              <label className='form-label fs-6 fw-bolder text-dark'>Tender: </label>
              <br/>
              <select className={clsx('form-control form-select form-select-lg form-control-solid')}>
                  <option value='0'>Choose</option>

              </select>
              <br/><br/>

              <label className='form-label fs-6 fw-bolder text-dark'>Company name: </label><br/>
              <input
                  type="text"
                  placeholder='Company name'
                  autoComplete='off'
                  className={clsx(
                      'form-control form-control-lg form-control-solid'
                  )}

              />
              </div>

              <br/><br/>

              <label className='form-label fs-6 fw-bolder text-dark'>Your offer:</label>
              <div className='input-group mb-3'>
                  <input
                  className='form-control form-control-lg form-solid'
                  type='text'
                  placeholder='Your offer'
                  aria-describedby="basic-addon2"
                  />
                  <div className='input-group-append'>
                      <span className='input-group-text'>$</span>
                  </div>

              </div>

              <br/><br/>

              {/*
              <label className='form-label fs-6 fw-bolder text-dark'>File input:</label><br/>
              <input type="file"
              className={clsx('form-control form-control-lg form-control-solid')}
              />
              */}
              <br/><br/>

              <button type='submit' className='btn btn-lg w-100 mb-5'>
                Submit
              </button>


          </form>

          </div>
      </div>
    );
};

export default TenderProposals;