import React from "react";
import clsx from "clsx";

export function EvaluateTender() {
  return (
    <div className="d-flex justify-content-center">
      <div className="mx-auto col-10 col-md-8 col-lg-6">
        <form className="form card p-3">
          <h1 className="text-center text-dark">Evaluate Tender</h1>
         
           <div className="fv-row mb-10">
            <label className="form-label fs-6 fw-bolder text-dark">Proposal:</label>
            <br />
            <select
              id="Proposal"
              name="proposal"
              className={clsx(
                "form-control form-select form-select-lg form-control-solid"
              )}
            >
              <option value="proposal1">Proposal 1</option>
              <option value="proposal2">Proposal 2</option>
              <option value="proposal3">Proposal 3</option>
            </select>
            <br /><br />
            <label className="form-label fs-6 fw-bolder text-dark">Rating:</label><br />
            <input
              type="number"
              id="rating"
              name="rating"
              min="1"
              max="5"
              className={clsx(
                "form-control form-control-lg form-control-solid"
              )}
            />
          </div>
          <br />
          <label className="form-label fs-6 fw-bolder text-dark">Comment:</label>
          <textarea id="comment" name="comment"></textarea>
          <br /><br />
          <label className="form-label fs-6 fw-bolder text-dark">Collaborators:</label><br />
          <input
            type="text"
            id="collaborators"
            name="collaborators"
            className={clsx(
              "form-control form-control-lg form-control-solid"
            )}
          />
          <br /><br />
          <button type="submit" className="btn btn-lg w-100 mb-5">
            Submit
          </button>
        </form>
      </div>
    </div>



  );
}
