import React, {useState} from "react";
import clsx from 'clsx';
import * as Yup from 'yup';
import {useFormik} from "formik";

const tenderProposalSchema = Yup.object().shape({

    offer: Yup.number().positive()
        .min(1, 'Minimum 1$')
        .required('Offer is required'),

    chooseFile: Yup.mixed().required('File is required')


})

const initialValues = {
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

        onSubmit: async(values,{setStatus,setSubmitting})=>{
            setLoading(true);
            try{
                console.log(values);
            }catch(error){
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
                        <label className='form-label fs-6 fw-bolder text-dark'>Your offer:</label>
                        <div className='input-group mb-3'>
                            <input
                                type='number'
                                name='offer'
                                placeholder='Your offer'
                                onChange={formik.handleChange}
                                {...formik.getFieldProps('offer')}
                                className={clsx('form-control form-control-lg form-solid border-gray-400',
                                    {'is-invalid': formik.touched.offer && formik.errors.offer},
                                    {'is-valid': formik.touched.offer && !formik.errors.offer}
                                )}
                            />
                            <div className='input-group-append'>
                                <span className='input-group-text border-gray-300'>$</span>
                            </div>

                        </div>

                        {formik.touched.offer && formik.errors.offer && (
                            <div className='fv-plugins-message-container'>
                                <span className='text-danger' role='alert'>{formik.errors.offer}</span>
                            </div>
                        )}
                    </div>


                    <div className=' fv-row mb-10'>

                        <label className='form-label fs-6 fw-bolder text-dark'>File input:</label>
                        <input
                            type="file"
                            name='chooseFile'
                            {...formik.getFieldProps('chooseFile')}
                            className={clsx('form-control form-control-lg form-control-solid border-gray-400',
                                {'is-invalid': formik.touched.chooseFile && formik.errors.chooseFile},
                                {'is-valid': formik.touched.chooseFile && !formik.errors.chooseFile}
                            )}
                        />


                        {formik.touched.chooseFile && formik.errors.chooseFile && (
                            <div className='fv-plugins-message-container'>
                                <span className='text-danger' role='alert'>{formik.errors.chooseFile}</span>
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