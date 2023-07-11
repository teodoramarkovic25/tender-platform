import React, {useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export function CreateTender() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [documents, setDocuments] = useState('');
    const [criteria, setCriteria] = useState('');
    const [weightage, setWeightage] = useState('');
    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        deadline: Yup.date().required('Deadline is required'),
        documents: Yup.string().required('Documents are required'),
        criteria: Yup.string().required('Criteria are required'),
        weightage: Yup.number().required('Weightage is required'),
    });

    const handleSubmit = async (values, {setStatus, setSubmitting}) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [loading, setLoading] = useState(false);
        setLoading(true);

        try {
            const url = 'http://localhost:3000/v1/auth/tenders';
            const res = await axios.post(url, {
                title: values.title,
                description: values.description,
                deadline: values.deadline,
                criteria: values.criteria,
                weightage: values.weightage,
            });
            console.log('res: ');
            console.log(res.data);
        } catch (error) {

            console.error('Error:', error.message);
        }

        setLoading(false);
    };


    return (
        <div className="d-flex justify-content-center">
            <div className="col-10 col-md-8 col-lg-6">

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
                    {({errors, touched}) => (
                        <Form className="form card p-3" action="/upload" method="POST" encType="multipart/form-data">
                            <h1 className="text-center text-dark">Create Tender</h1>

                            <div className="mb-3">
                                <label className="form-label fs-6 fw-bolder text-dark">
                                    Title{<span className="required"></span>}
                                </label>
                                <Field
                                    value={title}
                                    onChange={(e)=>{setTitle(e.target.value)}}
                                    type="text"
                                    id="title"
                                    name="title"
                                    className={`form-control form-control-lg form-control-solid ${
                                        touched.title && errors.title ? 'is-invalid border border-danger' : touched.title ? 'is-valid' : ''
                                    }`}
                                    placeholder="Tender title"
                                />
                                {touched.title && errors.title && (
                                    <div className="error text-sm text-danger">Please enter a title</div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label fs-6 fw-bolder text-dark">
                                    Description{<span className="required"></span>}
                                </label>
                                <Field
                                    value={description}
                                    onChange={(e)=>{setDescription(e.target.value)}}
                                    type="text"
                                    id="description"
                                    name="description"
                                    className={`form-control form-control-lg form-control-solid ${
                                        touched.description && errors.description ? 'is-invalid border border-danger' : touched.description ? 'is-valid' : ''
                                    }`}
                                    placeholder="Tender description"
                                />
                                {touched.description && errors.description && (
                                    <div className="error text-sm text-danger">Please enter a description</div>
                                )}

                            </div>

                            <div className="mb-3">
                                <label className="form-label fs-6 fw-bolder text-dark">
                                    Deadline date{<span className="required"></span>}
                                </label>
                                <Field
                                    value={deadline}
                                    onChange={(e)=>{setDeadline(e.target.value)}}
                                    type="date"
                                    id="deadline"
                                    name="deadline"
                                    className={`form-control form-control-lg form-control-solid ${
                                        touched.deadline && errors.deadline ? 'is-invalid border border-danger' : touched.deadline ? 'is-valid' : ''
                                    }`}
                                />
                                {touched.deadline && errors.deadline && (
                                    <div className="error text-sm text-danger">Please enter a deadline</div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label fs-6 fw-bolder text-dark">
                                    Associated Documents{<span className="required"></span>}
                                </label>
                                <Field
                                    value={documents}
                                    onChange={(e)=>{setDocuments(e.target.value)}}
                                    type="file"
                                    id="documents"
                                    name="documents"
                                    className={`form-control form-control-lg form-control-solid ${
                                        touched.documents && errors.documents ? 'is-invalid border border-danger' : touched.documents ? 'is-valid' : ''
                                    }`}
                                />
                                {touched.documents && errors.documents && (
                                    <div className="error text-sm text-danger">Please choose a document</div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label fs-6 fw-bolder text-dark">
                                    Evaluation Criteria{<span className="required"></span>}
                                </label>
                                <Field
                                    value={criteria}
                                    onChange={(e)=>{setCriteria(e.target.value)}}
                                    type="text"
                                    id="criteria"
                                    name="criteria"
                                    placeholder="Tender criteria"
                                    className={`form-control form-control-lg form-control-solid ${
                                        touched.criteria && errors.criteria ? 'is-invalid border border-danger' : touched.criteria ? 'is-valid' : ''
                                    }`}
                                />
                                {touched.criteria && errors.criteria && (
                                    <div className="error text-sm text-danger">Please enter a criteria</div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label fs-6 fw-bolder text-dark">
                                    Weightage{<span className="required"></span>}
                                </label>
                                <Field
                                    value={weightage}
                                    onChange={(e)=>{setWeightage(e.target.value)}}
                                    type="number"
                                    id="weightage"
                                    name="weightage"
                                    step="any"
                                    min="100"
                                    max="100000000"
                                    placeholder="Tender weightage"
                                    className={`form-control form-control-lg form-control-solid ${
                                        touched.weightage && errors.weightage ? 'is-invalid border border-danger' : touched.weightage ? 'is-valid' : ''
                                    }`}
                                />
                                {touched.weightage && errors.weightage && (
                                    <div className="error text-sm text-danger">Please choose a weightage</div>
                                )}
                            </div>

                            <button className="btn btn-lg w-100 mb-5" type="submit">
                                Create Tender
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default CreateTender;
