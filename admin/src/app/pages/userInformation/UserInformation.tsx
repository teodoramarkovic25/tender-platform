import React, {useState, useEffect} from "react";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useAuth} from "../../modules/auth";
import {getCompany} from "../../shared/services/company.service";
import {faPencilSquare, faUpload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {updateUser} from "../../shared/services/user.service";
import clsx from 'clsx';
import {getFile, getFiles} from "../../shared/services/file.service";
import {createFile} from "../../shared/services/file.service";
import {getOffers} from "../../shared/services/offer.service";
import {getTender} from "../../shared/services/tender.service";
import BlockUi from "react-block-ui";
import AuthService from "../../shared/services/api-client/auth.service";

const getProfilePicture = async (profilePictureId) => {
    const picture = await getFile(profilePictureId);
    const pictureDisplay = require('../../../../../backend/file/' + picture.fileName);
    return pictureDisplay;
}

const UserInformation = () => {
    const {currentUser, logout} = useAuth();
    const [company, setCompany] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [picture, setPicture] = useState(null);
    const [uploadedPicture, setUploadedPicture] = useState(null);
    const [isPictureUploaded, setIsPictureUploaded] = useState(false);
    const [offersList, setOffersList] = useState(null);
    const [tenderInfo, setTenderInfo] = useState({});
    const [isBlocking, setIsBlocking] = useState(currentUser.isBlocked);

    const authService = new AuthService();

    const userSchema = Yup.object().shape({
        firstName: Yup.string(),
        lastName: Yup.string(),
        email: Yup.string()
            .email('Wrong email format')
            .min(3, 'Minimum 3 symbols')
            .max(50, 'Maximum 50 symbols'),
        password: Yup.string()
            .min(3, 'Minimum 3 symbols')
            .max(50, 'Maximum 50 symbols'),
        role: Yup.string(),
        isEmailVerified: Yup.boolean(),
        company: Yup.string(),
        documents: Yup.mixed()
    });

    useEffect(() => {

        setIsBlocking(currentUser.isBlocked);
        fetchOffers();
        if (currentUser.role === "vendor") {
            fetchCompanyData();
        }
        if (!isPictureUploaded) {
            getProfilePicture(currentUser.documents)
                .then((pictureDisplay) => {
                    setPicture(pictureDisplay);
                });
        }
        //console.log('is pic uploaded', isPictureUploaded);
        //console.log('uploaded pic', uploadedPicture);
        if (isPictureUploaded) {
            const imageURL = URL.createObjectURL(uploadedPicture);
            setPicture(imageURL);
        }
        //console.log('offerslist effect', offersList);
        //  console.log('blocked', currentUser.isBlocked)
    }, [currentUser.isBlocked]);


    const fetchOffers = async () => {
        const filters = {
            createdBy: currentUser.id.toString(),
            tender: ''
        }
        const offers = await getOffers(filters);
        // console.log('offers list', offers);
        setOffersList(offers);

        offers.forEach(offer => {
            if (offer.tender) {
                fetchTenderInfo(offer.tender);
            }
        });
    }

    const fetchCompanyData = async () => {
        const companyData = await getCompany((currentUser as any).company);
        setCompany(companyData);
    }

    const handleConfirmNo = (e) => {
        e.preventDefault();
        setIsEditMode(false);
    }

    const formik = useFormik({
        initialValues: {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            password: currentUser.password,
            role: currentUser.role,
            documents: currentUser.documents,
            isBlocked: currentUser.isBlocked
        },
        validationSchema: userSchema,
        onSubmit: async (values, {setSubmitting}) => {
            try {
                // console.log('current picture', values.documents);
                if (uploadedPicture) {
                    const formData = new FormData();
                    formData.append('documents', uploadedPicture);
                    formData.append('createdBy', currentUser.id.toString());

                    await createFile(formData);

                    setPicture(URL.createObjectURL(uploadedPicture));

                    const files = await getFiles();
                    const lastUploadedFile = files[files.length - 1];

                    values.documents = lastUploadedFile.id;
                }
                // console.log('picture now', values.documents);
                await updateUser(currentUser.id.toString(), {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password,
                    documents: values.documents
                });

                setIsEditMode(false);
            } catch (error) {
                console.error('Error occurred while updating your information', error);
            } finally {
                setSubmitting(false);
            }
        }
    });

    const handleEditPicture = () => {
        setUploadedPicture(null);
        setIsPictureUploaded(false);
    };

    const handlePictureChange = (event) => {
        const file = event.target.files[0];
        setUploadedPicture(file);
        console.log('file', file);
        const imageURL = URL.createObjectURL(file);
        setPicture(imageURL);
        setIsPictureUploaded(true);
    };

    const fetchTenderInfo = async (tenderId) => {
        try {
            const tenderInfo = await getTender(tenderId);
            setTenderInfo(prevTenderInfo => ({
                ...prevTenderInfo,
                [tenderId]: tenderInfo
            }));
            console.log('tenderinfo', tenderInfo);
        } catch (error) {
            console.error("Error fetching tender:", error);
            setTenderInfo(prevTenderInfo => ({
                ...prevTenderInfo,
                [tenderId]: {}
            }));
        }
    };

    const verifyEmail = async () => {
        const email = await authService.sendVerificationEmail();
        console.log('email', email);

    };


    if (isBlocking) {
        return <div>
            <h1 className='text-center text-primary text-lg-center'>Your account is suspended!!!</h1>
            <p className='text-center text-lg-center'>Contact Admin about more details!</p>
        </div>
    }

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <BlockUi tag='div' blocking={isBlocking}>
                <div className="col-10 col-md-8 col-lg-6">
                    <form className='form card p-3' onSubmit={formik.handleSubmit}>
                        <div className='gy-2 gs-2 card p-3'>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <h1 className='text-center mb-3'>Edit Information</h1><br/>
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faPencilSquare} className='fa-2x text-black'
                                                     onClick={() => setIsEditMode(true)}/>
                                </div>
                            </div>

                            <div className='fv-row d-flex justify-content-center align-items-center'>
                                <label></label>

                                {isEditMode ? (
                                    <div className='d-flex justify-content-between'>
                                        <img className='rounded-circle img-fluid' src={picture} alt='Profile Picture'/>
                                        <br/>
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <label className='upload-icon'>
                                                <FontAwesomeIcon className='mx-5' icon={faUpload}/>
                                                <input
                                                    type='file'
                                                    accept='.jpg,.jpeg,.png'
                                                    onChange={handlePictureChange}
                                                    onClick={handleEditPicture}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                ) : (
                                    <img className='rounded-circle img-fluid' src={picture} alt='Profile Picture'/>
                                )}

                            </div>

                            <div className='fv-row'>
                                <label className='form-label fs-6 fw-bolder text-dark'>First Name</label><br/>
                                <label>{currentUser.firstName}</label>
                            </div>
                            <br/>

                            <div className='fv-row'>
                                <label className='form-label fs-6 fw-bolder text-dark'>Last Name</label><br/>
                                <label>{currentUser.lastName}</label>
                            </div>
                            <br/>

                            <div className='fv-row d-flex'>
                                <label className='form-label fs-6 fw-bolder text-dark'>
                                    Email
                                    {(currentUser as any).isEmailVerified ? (
                                        <span className="badge bg-success ms-2">Verified</span>
                                    ) : (
                                        <div className='d-flex justify-content-between'>
                                            <span className="badge bg-danger ms-2">Not Verified</span>
                                            <button
                                                onClick={verifyEmail}
                                                className='btn btn-sm'>Verify
                                            </button>
                                        </div>
                                    )}

                                </label>

                                <br/>
                                {isEditMode ? (
                                    <div>
                                        <input
                                            type='text'
                                            id='email'
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={clsx('form-control form-control-lg',
                                                {'is-invalid': (formik.touched.email) && formik.errors.email},
                                                {'is-valid': (formik.touched.email) && !formik.errors.email}
                                            )}
                                        />
                                        {formik.touched.email && formik.errors.email && (
                                            <div className='fv-plugins-message-container'>
                                                <span className='text-danger' role='alert'>{formik.errors.email}</span>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <label>{formik.values.email}</label>
                                )}
                            </div>
                            <br/>

                            <div className='fv-row'>
                                <label className='form-label fs-6 fw-bolder text-dark'>Password</label><br/>
                                {
                                    isEditMode ? (
                                        <div>
                                            <input
                                                type='password'
                                                id='password'
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className={clsx('form-control form-control-lg',
                                                    {'is-invalid': (formik.touched.password) && formik.errors.password},
                                                    {'is-valid': (formik.touched.password) && !formik.errors.password}
                                                )}
                                            />
                                            {formik.touched.password && formik.errors.password && (
                                                <div className='fv-plugins-message-container'>
                                            <span className='text-danger'
                                                  role='alert'>{formik.errors.password}</span>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <label></label>
                                    )}

                            </div>

                            <br/>

                            {currentUser.role === 'vendor' && (
                                <div className='fv-row'>
                                    <label className='form-label fs-6 fw-bolder text-dark'>My company</label><br/>
                                    <label>{company ? company.name : 'N/A'}</label>
                                </div>
                            )}

                            {isEditMode && (
                                <div className='d-flex justify-content-between mt-3'>
                                    <div>
                                        <button className='btn btn-lg' type="submit">Save changes</button>
                                    </div>
                                    <div>
                                        <button className='btn btn-lg btn-secondary' onClick={handleConfirmNo}>Cancel
                                        </button>
                                    </div>
                                </div>
                            )}

                            <h1>My offers </h1>
                            {offersList &&
                                offersList.map((offer) => (

                                    <div key={offer.id}
                                         className='card p-3 border border-black border-5 mb-3 text-center'>
                                        <div className='card-title'>
                                            <label className='form-label fs-6 fw-bolder text-dark'>Offer
                                                Details: </label><br/>
                                        </div>
                                        <div>
                                            <label>Offered Money: </label>
                                            {offer.offer} $
                                        </div>


                                        <div>
                                            {offer.isSelected ? (
                                                <div className='fw-bold text-success'>Offer Won!</div>
                                            ) : (
                                                <div className='fw-bold text-primary'>Offer Did Not Win!</div>
                                            )}
                                        </div>
                                        <br/>
                                        {offer.tender && (
                                            <div>
                                                <label className='form-label fs-6 fw-bolder text-dark'>Tender
                                                    Details: </label><br/>
                                                <div>Title: {tenderInfo[offer.tender]?.title}</div>
                                                <div>Description: {tenderInfo[offer.tender]?.description}</div>
                                                <div>Criteria: {tenderInfo[offer.tender]?.criteria}</div>
                                                <div>Weightage: {tenderInfo[offer.tender]?.weightage}</div>
                                            </div>
                                        )}
                                    </div>
                                ))}

                        </div>
                    </form>
                </div>
            </BlockUi>
        </div>
    );
};


export default UserInformation;
export {getProfilePicture};
