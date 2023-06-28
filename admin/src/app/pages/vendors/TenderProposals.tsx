import React from "react";
import clsx from 'clsx'

const TenderProposals=()=>{

    return(
      <div>
          <form className='form w-100'>

              <h1 className='text-center text-dark'>Make an offer</h1>

              <label className='form-label fs-6 fw-bolder text-dark'>Tender: </label>
              <br/>
              <select>
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
              <br/><br/>

              <label className='form-label fs-6 fw-bolder text-dark'>Your offer: </label><br/>
              <input
                  type='number'
                  placeholder='Your offer'
                  autoComplete='off'
              />
              <br/><br/>

              <label className='form-label fs-6 fw-bolder text-dark'>Documents:</label><br/>
              <input type="file"/>
              <br/><br/>





          </form>
      </div>
    );
};

export default TenderProposals;