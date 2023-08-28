import React, { useState } from 'react';
import * as Yup from 'yup';
import clsx from 'clsx';
import {Link, Route} from 'react-router-dom';
import { useFormik } from 'formik';
import AuthService from '../../../shared/services/api-client/auth.service';
import { useQueryParam, StringParam } from 'use-query-params';
import { QueryParamProvider } from 'use-query-params';

export function ResetPassword() {
    const [token, setToken] = useQueryParam('token', StringParam);
    const [loading, setLoading] = useState(false);

    const authService = new AuthService();

    const handleSubmit = async (values) => {
        if (values.newPassword === values.confirmNewPassword) {
            setLoading(true);
            try {

                await authService.resetPassword(token, values.newPassword);

                setLoading(false);
                console.log('Password successfully updated');
            } catch (error) {
                setLoading(false);
                console.error('Error updating password:', error);
            }
        } else {
            console.error('Passwords do not match');
        }
    };




    const formik = useFormik({
        initialValues: {
            token: '',
            newPassword: '',
            confirmNewPassword: '',
        },
        validationSchema: Yup.object({
            newPassword: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
            confirmNewPassword: Yup.string()
                .oneOf([Yup.ref('newPassword'), null], 'Passwords must match with new password')
                .required('Required'),
        }),
        onSubmit:handleSubmit,
    });



    return (


        <div>
            <br/>
            <br/>

            <form
                style={{ marginTop: '8%', maxWidth: '400px', margin: '0 auto' }}
                className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework '
                noValidate
                id='kt_login_password_reset_form'
                onSubmit={formik.handleSubmit}
            >
                <div className='text-center mb-10'>
                    <h1 className='text-dark mb-3'>Change your password?</h1>
                    <div className='text-gray-400 fw-bold fs-4'>Enter your new password.</div>
                </div>


                <div className='fv-row mb-10'>
                    <label className='form-label fw-bolder text-gray-900 fs-6'>New password</label>
                    <input
                        type='password'
                        placeholder='Enter new password'
                        autoComplete='off'
                        {...formik.getFieldProps('newPassword')}
                        className={clsx(
                            'form-control form-control-lg form-control-solid border-gray-400',
                            {
                                'is-invalid': formik.touched.newPassword && formik.errors.newPassword,

                            },
                            {
                                'is-valid': formik.touched.newPassword && !formik.errors.newPassword,
                            }

                        )}

                    />
                    {formik.touched.newPassword && formik.errors.newPassword && (
                        <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>

                            </div>
                        </div>
                    )}
                </div>
                <div className='fv-row mb-10'>
                    <label className='form-label fw-bolder text-gray-900 fs-6'>Confirm new password</label>
                    <input
                        type='password'
                        placeholder='Confirm new password'
                        autoComplete='off'
                        {...formik.getFieldProps('confirmNewPassword')}
                        className={clsx(
                            'form-control form-control-lg form-control-solid border-gray-400',
                            {
                                'is-invalid': formik.touched.confirmNewPassword && formik.errors.confirmNewPassword,
                            },
                            {
                                'is-valid': formik.touched.confirmNewPassword && !formik.errors.confirmNewPassword,
                            }
                        )}
                    />
                    {formik.touched.confirmNewPassword && formik.errors.confirmNewPassword && (
                        <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>

                            </div>
                        </div>
                    )}
                </div>

                <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
                    <button type='submit' disabled={formik.isSubmitting || loading} id='kt_password_reset_submit' className='btn btn-lg fw-bolder me-4'>
                        <span className='indicator-label'>Change Password</span>
                        {loading && (
                            <span className='indicator-progress'>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
                        )}
                    </button>
                    <Link to='/auth/login'>
                        <button
                            type='button'
                            id='kt_login_password_reset_form_cancel_button'
                            className='btn btn-lg fw-bolder'
                            disabled={formik.isSubmitting || !formik.isValid}
                        >
                            Cancel
                        </button>
                    </Link>{' '}
                </div>

            </form>

</div>

    );
}
