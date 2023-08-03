import React, {useState} from 'react';
import {Formik, Form, Field, ErrorMessage, useFormikContext} from 'formik';
import * as Yup from 'yup';
import {createTender} from '../../shared/services/tender.service';
import {TenderModel} from '../../shared/models/tender.model';
import {showSuccessMessage} from '../../shared/components/messages/success-createtender-message';
import {showErrorMessage} from '../../shared/components/messages/error-createtender-message';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify';

export function CreateTender() {
    const [loading, setLoading] = useState(false);
    const [isFormSubmitted, setFormSubmitted] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        setLoading(true);


        const tender = new TenderModel(values);

        const createdTender = await createTender(values).catch((error) => {

            showErrorMessage('You have not successfully created a tender!');
            setLoading(false);
        });

        showSuccessMessage('Tender successfully created ');
        navigate('/all-tenders')
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        deadline: Yup.date().required('Deadline is required'),
        criteria: Yup.string().required('Criteria are required'),
        weightage: Yup.number()
            .required('Weightage is required')
            .positive('Weightage must be a positive number'),
    });

    const initialValues = {
        title: '',
        description: '',
        deadline: '',
        criteria: '',
        weightage: '100',
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="col-10 col-md-8 col-lg-6">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({errors, touched, values, handleChange}) => (
                        <Form className="form card p-3">
                            <h1 className="text-center text-dark p-4 mt-1">Create Tender</h1>

                            <div className="mb-3">
                                <label className="form-label fs-6 fw-bolder text-dark">
                                    Title<span className="required"></span>
                                </label>
                                <Field
                                    type="text"
                                    id="title"
                                    name="title"
                                    className={`form-control form-control-lg form-control-solid ${
                                        (touched.title || isFormSubmitted) && errors.title
                                            ? 'is-invalid border border-danger'
                                            : touched.title
                                                ? 'is-valid'
                                                : ''
                                    }`}
                                    placeholder="Tender title"
                                />
                                <ErrorMessage name="title" component="div" className="error text-sm text-danger"/>
                            </div>

                            <div className="mb-3">
                                <label className="form-label fs-6 fw-bolder text-dark">
                                    Description<span className="required"></span>
                                </label>
                                <Field
                                    type="text"
                                    id="description"
                                    name="description"
                                    className={`form-control form-control-lg form-control-solid ${
                                        (touched.description || isFormSubmitted) && errors.description
                                            ? 'is-invalid border border-danger'
                                            : touched.description
                                                ? 'is-valid'
                                                : ''
                                    }`}
                                    placeholder="Tender description"
                                />
                                <ErrorMessage
                                    name="description"
                                    component="div"
                                    className="error text-sm text-danger"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fs-6 fw-bolder text-dark">
                                    Deadline date<span className="required"></span>
                                </label>
                                <Field
                                    type="date"
                                    id="deadline"
                                    name="deadline"
                                    className={`form-control form-control-lg form-control-solid ${
                                        (touched.deadline || isFormSubmitted) && errors.deadline
                                            ? 'is-invalid border border-danger'
                                            : touched.deadline
                                                ? 'is-valid'
                                                : ''
                                    }`}
                                />
                                <ErrorMessage name="deadline" component="div" className="error text-sm text-danger"/>
                            </div>

                            <div className="mb-3">
                                <label className="form-label fs-6 fw-bolder text-dark">
                                    Evaluation Criteria<span className="required"></span>
                                </label>
                                <Field
                                    type="text"
                                    id="criteria"
                                    name="criteria"
                                    placeholder="Tender criteria"
                                    className={`form-control form-control-lg form-control-solid ${
                                        (touched.criteria || isFormSubmitted) && errors.criteria
                                            ? 'is-invalid border border-danger'
                                            : touched.criteria
                                                ? 'is-valid'
                                                : ''
                                    }`}
                                />
                                <ErrorMessage name="criteria" component="div" className="error text-sm text-danger"/>
                            </div>

                            <div className="mb-3">
                                <label className="form-label fs-6 fw-bolder text-dark">
                                    Weightage<span className="required"></span>
                                </label>
                                <div className="input-group input-group-merge">
                                    <Field
                                        type="number"
                                        step="any"
                                        min="100"
                                        max="100000000"
                                        id="weightage"
                                        name="weightage"

                                        placeholder="Tender weightage"
                                        className={`form-control form-control-lg form-control-solid ${
                                            (touched.weightage || isFormSubmitted) && errors.weightage
                                                ? 'is-invalid border border-danger'
                                                : touched.weightage
                                                    ? 'is-valid'
                                                    : ''
                                        }`}
                                    />
                                    <div className="input-group-append mt-auto p-auto d-flex">
  <span
      className="form-control form-control-lg form-control-solid"
      style={{
          border: 'none',
          borderRadius: '0',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
      }}
  >
    $
  </span>
                                    </div>

                                </div>
                                <ErrorMessage name="weightage" component="div" className="error text-sm text-danger"/>
                            </div>


                            <br/>
                            <button className="btn btn-lg w-100 mb-5 text-dark" type="submit" disabled={loading} >
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>

        </div>
    );
}

export default CreateTender;
