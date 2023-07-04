import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useFormik } from "formik";
import * as Yup from "yup";

const EvaluateTender = () => {
  const [isSubmissionAllowed, setIsSubmissionAllowed] = useState(true);
  const [evaluations, setEvaluations] = useState([]);
  const [remainingTime, setRemainingTime] = useState(0);

  const evaluationSchema = Yup.object().shape({
    proposal: Yup.string().required("Proposal is required"),
    rating: Yup.number()
      .min(1, "Rating should be at least 1")
      .max(5, "Rating should not exceed 5")
      .required("Rating is required"),
    comment: Yup.string().required("Comment is required"),
    collaborators: Yup.string().required("Collaborators are required"),
  });

  const formik = useFormik({
    initialValues: {
      proposal: "",
      rating: "",
      comment: "",
      collaborators: "",
    },
    validationSchema: evaluationSchema,
    onSubmit: (values) => {
      const newEvaluation = {
        proposal: values.proposal,
        rating: values.rating,
        comment: values.comment,
        collaborators: values.collaborators,
      };
      setEvaluations([...evaluations, newEvaluation]);
      formik.resetForm();
      setIsSubmissionAllowed(false);
    },
  });

  useEffect(() => {
    const timeLimit = 5 * 60 * 1000;

    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1000);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      setIsSubmissionAllowed(false);
    }, timeLimit);

    return () => {
      clearInterval(timer);
      setRemainingTime(0);
    };
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <div className="mx-auto col-10 col-md-8 col-lg-6">
        <form className="card p-3" onSubmit={formik.handleSubmit}>
          <h1 className="text-center text-dark">Evaluate Tender</h1>

          <div className="fv-row mb-10">
            <label className="form-label fs-6 fw-bolder text-dark">
              Proposal:
            </label>
            <br />
            <select
              id="proposal"
              name="proposal"
              className={clsx(
                "form-select form-select-lg form-control-solid"
              )}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.proposal}
            >
              <option value="">Select a proposal</option>
              <option value="proposal1">Proposal 1</option>
              <option value="proposal2">Proposal 2</option>
              <option value="proposal3">Proposal 3</option>
            </select>
            {formik.errors.proposal && formik.touched.proposal && (
              <div className="error">{formik.errors.proposal}</div>
            )}
          </div>

          <div className="fv-row mb-10">
            <label className="form-label fs-6 fw-bolder text-dark">
              Rating:
            </label>
            <br />
            <input
              type="number"
              id="rating"
              name="rating"
              min="1"
              max="5"
              className={clsx(
                "form-control form-control-lg form-control-solid"
              )}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rating}
            />
            {formik.errors.rating && formik.touched.rating && (
              <div className="error">{formik.errors.rating}</div>
            )}
          </div>

          <div className="fv-row mb-10">
            <label className="form-label fs-6 fw-bolder text-dark">
              Comment:
            </label>
            <br />
            <textarea
              id="comment"
              name="comment"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.comment}
            />
            {formik.errors.comment && formik.touched.comment && (
              <div className="error">{formik.errors.comment}</div>
            )}
          </div>

          <div className="fv-row mb-10">
            <label className="form-label fs-6 fw-bolder text-dark">
              Collaborators:
            </label>
            <br />
            <input
              type="text"
              id="collaborators"
              name="collaborators"
              className={clsx(
                "form-control form-control-lg form-control-solid"
              )}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.collaborators}
            />
            {formik.errors.collaborators && formik.touched.collaborators && (
              <div className="error">{formik.errors.collaborators}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isSubmissionAllowed}
          >
            Submit Evaluation
          </button>
        </form>

        {remainingTime > 0 && (
          <p className="text-center mt-4">
            Remaining Time: {Math.floor(remainingTime / 1000)} seconds
          </p>
        )}

        <div className="mt-4">
          <h2>Evaluation List</h2>
          <ul>
            {evaluations.map((evaluation, index) => (
              <li key={index}>
                <strong>Proposal: </strong>
                {evaluation.proposal}
                <br />
                <strong>Rating: </strong>
                {evaluation.rating}
                <br />
                <strong>Comment: </strong>
                {evaluation.comment}
                <br />
                <strong>Collaborators: </strong>
                {evaluation.collaborators}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EvaluateTender;
