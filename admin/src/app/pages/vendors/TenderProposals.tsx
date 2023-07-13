import React, {useState} from "react";
import clsx from 'clsx';
import * as Yup from 'yup';
import {useFormik} from "formik";
import {useAuth} from "../../modules/auth";
import {createOffer} from "../../shared/services/offer.service";
import {OfferModel} from "../../shared/models/offer.model";
import {getOffers} from "../../shared/services/offer.service";

const TenderProposals = () => {

    const tenderProposalSchema = Yup.object().shape({

        offer: Yup.number().positive()
            .min(1, 'Minimum 1$')
            .required('Offer is required'),

        // documents: Yup.mixed().required('File is required')

    })

    const initialValues = {
        offer: '0',
       // documents: ''
    }

    const [loading, setLoading] = useState(false);
    const [offer, setOffer] = useState('');
    const [documents, setDocuments] = useState('');
    const [error, setError] = useState('');
    const {saveAuth, setCurrentUser} = useAuth();


    const formik = useFormik({
        initialValues,
        validationSchema: tenderProposalSchema,

        onSubmit: async (values, {setStatus, setSubmitting}) => {
            setLoading(true);
            setError(null);
            try {

                const offer = new OfferModel(values);
                // @ts-ignore
                const createdOffer = await createOffer(values);

            } catch (error) {
                console.error(error);
                setStatus('Incorrect data entered');
                setLoading(false);
            }
        }


    })

    return (
        <div className='d-flex justify-content-center '>
            <div className='mx-auto col-10 col-md-8 col-lg-6 '>

                <form
                    className='form card p-3'
                    onSubmit={formik.handleSubmit}
                    noValidate
                    id='kt_dashboard_offer_form'
                >

                    <h1 className='text-center text-dark'>Make an offer</h1>


                    <div className=' fv-row mb-10'>
                        <label className='form-label fs-6 fw-bolder text-dark'>Your offer {<span
                            className="required"></span>}</label>
                        <div className='input-group mb-3'>
                            <input
                                value={offer}
                                onChange={(e) => {
                                    setOffer(e.target.value)
                                }}
                                type='number'
                                name='offer'
                                placeholder='Your offer'
                                {...formik.getFieldProps('offer')}
                                className={clsx('form-control form-control-lg form-solid',
                                    {'is-invalid': formik.touched.offer && formik.errors.offer},
                                    {'is-valid': formik.touched.offer && !formik.errors.offer}
                                )}
                            />
                            <div className='input-group-append'>
                                <span className='input-group-text'>$</span>
                            </div>

                        </div>

                        {formik.touched.offer && formik.errors.offer && (
                            <div className='fv-plugins-message-container'>
                                <span className='text-danger' role='alert'>{formik.errors.offer}</span>
                            </div>
                        )}
                    </div>

                    {/*
                    <div className=' fv-row mb-10'>

                        <label className='form-label fs-6 fw-bolder text-dark'>File input {<span
                            className="required"></span>}</label>
                        <input
                            value={documents}
                            onChange={(e) => {
                                setDocuments(e.target.value)
                            }}
                            type="file"
                            name='documents'
                            {...formik.getFieldProps('documents')}
                            className={clsx('form-control form-control-lg form-control-solid',
                                {'is-invalid border border-danger': formik.touched.documents && formik.errors.documents},
                                {'is-valid': formik.touched.documents && !formik.errors.documents}
                            )}
                        />


                        {formik.touched.documents && formik.errors.documents && (
                            <div className='fv-plugins-message-container'>
                                <span className='text-danger' role='alert'>{formik.errors.documents}</span>
                            </div>
                        )}
                    </div>
*/}

                    <button
                        type='submit'
                        className='btn btn-lg w-100 mb-5'
                        id='kt_dashboard_offer_submit'
                    >
                        Submit
                    </button>


                </form>

            </div>
        </div>
    );
};

export default TenderProposals;