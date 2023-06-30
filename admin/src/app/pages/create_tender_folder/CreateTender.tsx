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
              <label htmlFor="title">Title:</label>
              <Field type="text" id="title" name="title" className="form-control" />
              <ErrorMessage name="title" component="div" className="error text-sm text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="description">Description:</label>
              <Field type="text" id="description" name="description" className="form-control" />
              <ErrorMessage name="description" component="div" className="error text-sm text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="deadline">Deadline date:</label>
              <Field type="date" id="deadline" name="deadline" className="form-control" />
              <ErrorMessage name="deadline" component="div" className="error text-sm text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="documents">Associated Documents:</label>
              <Field type="text" id="documents" name="documents" className="form-control" />
              <ErrorMessage name="documents" component="div" className="error text-sm text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="criteria">Evaluation Criteria:</label>
              <Field type="text" id="criteria" name="criteria" className="form-control" />
              <ErrorMessage name="criteria" component="div" className="error text-sm text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="weightage">Weightage:</label>
              <Field type="number" id="weightage" name="weightage" step="any" min="100" max="100 000 000" className="form-control" />
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