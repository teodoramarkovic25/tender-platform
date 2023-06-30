import React, { useState } from 'react';
import clsx from 'clsx';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


export function CreateTender() {
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    deadline: Yup.date().required('Deadline is required'),
    documents: Yup.string().required('Documents are required'),
    criteria: Yup.string().required('Criteria are required'),
    weightage: Yup.number().required('Weightage is required'),
  });
  const handleSubmit = (values: any) => {
   
    console.log(values);
  };
  

    return (
      <div className="d-flex justify-content-center">
      <div className="col-10 col-md-8 col-lg-6">
        <h1 className="text-center text-dark">Create Tender</h1>
        <Formik
          initialValues={{
            title: '',
            description: '',
            deadline: '',
            documents: '',
            criteria: '',
            weightage: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="form card p-3">
            <div className="mb-3">
              <label className="form-label fs-6 fw-bolder text-dark"  htmlFor="title" >Title:</label>
              <Field type="text" id="title" name="title" className="form-control form-control-1g form-control-solid " placeholder="Tender title" />
              <ErrorMessage name="title" component="div" className="error text-sm text-danger" />
            </div>

            <div className="mb-3">
              <label className="form-label fs-6 fw-bolder text-dark" htmlFor="description">Description:</label>
              <Field type="text" id="description" name="description" className="form-control form-control-1g form-control-solid " placeholder="Tender description"/>
              <ErrorMessage name="description" component="div" className="error text-sm text-danger" />
            </div>

            <div className="mb-3">
              <label className="form-label fs-6 fw-bolder text-dark" htmlFor="deadline">Deadline date:</label>
              <Field type="date" id="deadline" name="deadline" className="form-control form-control-1g form-control-solid "  />
              <ErrorMessage name="deadline" component="div" className="error text-sm text-danger"  />
            </div>

            <div className="mb-3">
              <label className="form-label fs-6 fw-bolder text-dark"htmlFor="documents">Associated Documents:</label>
              <Field type="file" id="documents" name="documents"className="form-control form-control-1g form-control-solid " />
              <ErrorMessage name="documents" component="div" className="error text-sm text-danger" />
            </div>

            <div className="mb-3">
              <label className="form-label fs-6 fw-bolder text-dark" htmlFor="criteria">Evaluation Criteria:</label>
              <Field type="text" id="criteria" name="criteria" placeholder="Tender criteria"className="form-control form-control-1g form-control-solid "  />
              <ErrorMessage name="criteria" component="div" className="error text-sm text-danger" />
            </div>

            <div className="mb-3">
              <label className="form-label fs-6 fw-bolder text-dark" htmlFor="weightage">Weightage:</label>
              <Field type="number" id="weightage" name="weightage" step="any" min="100" max="100 000 000" placeholder="Tender weightage"className="form-control form-control-1g form-control-solid " />
              <ErrorMessage name="weightage" component="div" className="error text-sm text-danger" />
            </div>

            <button className="btn btn-lg btn-danger" style={{ backgroundColor: '#FF0000' }}type="submit">Create Tender</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreateTender;