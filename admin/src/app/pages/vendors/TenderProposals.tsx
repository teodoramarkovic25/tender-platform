import React, {useState} from "react";
import clsx from 'clsx';
import * as Yup from 'yup';
import {useFormik} from "formik";

const tenderProposalSchema = Yup.object().shape({

    chooseTender: Yup.string()
        .notOneOf([''], 'select')
        .required('Select an option'),

    companyName: Yup.string()
        .required('Company name is required'),

    offer: Yup.number().positive()
        .min(1, 'Minimum 1$')
        .required('Offer is required'),

    chooseFile: Yup.mixed().required('File is required')


})

const initialValues = {
    chooseTender: '',
    companyName: '',
    offer: '0',
    chooseFile: ''
}

const onSubmit = () => {
    console.log('submitted');
};

const TenderProposals = () => {

    const [loading, setLoading] = useState(false);


    const formik = useFormik({
        initialValues,
        validationSchema: tenderProposalSchema,

        onSubmit: onSubmit


    })
    console.error(formik.errors);

    return (
        <div className='d-flex justify-content-center'>
            <div className='mx-auto col-10 col-md-8 col-lg-6'>

                <form
                    className='form card p-3'
                    onSubmit={formik.handleSubmit}
                    noValidate
                    id='kt_dashboard_offer_form'
                >

                    <h1 className='text-center text-dark'>Make an offer</h1>

                    <div className='fv-row mb-10'>
                        <label className='form-label fs-6 fw-bolder text-dark'>Tender: </label>


                        <div className=' fv-row '>
                            <select
                                name='chooseTender'
                                {...formik.getFieldProps('chooseTender')}
                                className={clsx('form-control form-select form-select-lg form-control-solid',
                                    {'is-invalid': formik.touched.chooseTender && formik.errors.chooseTender},
                                    {'is-valid': formik.touched.chooseTender && !formik.errors.chooseTender}
                                )}>
                                <option value=''>Choose</option>
                                <option value='1'>proba za frontend</option>
                                <option value='2'>aa</option>
                            </select>

                            {formik.touched.chooseTender && formik.errors.chooseTender && (
                                <div className='fv-plugins-message-container'>
                                    <span role='alert'>{formik.errors.chooseTender}</span>
                                </div>
                            )}

                        </div>


                    </div>
                    <div className='fv-row mb-10'>
                        <label className='form-label fs-6 fw-bolder text-dark'>Company name: </label>
                        <input
                            type='text'
                            name='companyName'
                            placeholder='Company name'
                            {...formik.getFieldProps('companyName')}
                            autoComplete='off'
                            className={clsx(
                                'form-control form-control-lg form-control-solid',
                                {'is-invalid': formik.touched.companyName && formik.errors.companyName},
                                {'is-valid': formik.touched.companyName && !formik.errors.companyName}
                            )}
                        />

                        {formik.touched.companyName && formik.errors.companyName && (
                            <div className='fv-plugins-message-container'>
                                <span role='alert'>{formik.errors.companyName}</span>
                            </div>
                        )}
                    </div>


                    <div className=' fv-row mb-10'>
                        <label className='form-label fs-6 fw-bolder text-dark'>Your offer:</label>
                        <div className='input-group mb-3'>
                            <input
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
                            <div>
                                <span role='alert'>{formik.errors.offer}</span>
                            </div>
                        )}
                    </div>


                    <div className=' fv-row mb-10'>

                        <label className='form-label fs-6 fw-bolder text-dark'>File input:</label>
                        <input
                            type="file"
                            name='chooseFile'
                            {...formik.getFieldProps('chooseFile')}
                            className={clsx('form-control form-control-lg form-control-solid',
                                {'is-invalid': formik.touched.chooseFile && formik.errors.chooseFile},
                                {'is-valid': formik.touched.chooseFile && !formik.errors.chooseFile}
                            )}
                        />


                        {formik.touched.chooseFile && formik.errors.chooseFile && (
                            <div>
                                <span role='alert'>{formik.errors.chooseFile}</span>
                            </div>
                        )}
                    </div>


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