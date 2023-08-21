import React from "react";
import {getUsers, updateUser} from "../../shared/services/user.service";
import {useState, useEffect} from "react";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useAuth} from "../../modules/auth";
import clsx from 'clsx';
import {createFile, getFiles} from "../../shared/services/file.service";
import {getCompanies, getCompany} from "../../shared/services/company.service";
import {Card} from "react-bootstrap";
import {getProfilePicture} from "./UserInformation";
import {faPencilSquare, faUpload, faBan} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Users = () => {

    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationData, setPaginationData] = useState({});
    const [currentLimit, setCurrentLimit] = useState(10);
    const [deletedItemId, setDeletedItemId] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const {currentUser, logout} = useAuth();
    const [isEditMode, setIsEditMode] = useState(false);
    const [picture, setPicture] = useState(null);
    const [uploadedPicture, setUploadedPicture] = useState(null);
    const [isPictureUploaded, setIsPictureUploaded] = useState(false);
    const [companies, setCompanies] = useState({});

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

    const UserProfilePicture = ({profilePictureId}) => {
        const [picture, setPicture] = useState(null);

        useEffect(() => {
            getProfilePicture(profilePictureId)
                .then((pictureDisplay) => {
                    setPicture(pictureDisplay);
                });
        }, [profilePictureId]);

        return picture ? <Card.Img src={picture}/> : null;
    };


    useEffect(() => {

        if (!isPictureUploaded) {
            getProfilePicture(currentUser.documents)
                .then((pictureDisplay) => {
                    setPicture(pictureDisplay);
                });
        }
        fetchUsers({});
    }, []);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        fetchUsers({
            page: newPage,
            limit: currentLimit,
        });
    };

    const handleLimitChange = (newValue) => {
        setCurrentLimit(newValue);
        fetchUsers({
            limit: newValue,
            page: 1,
        });
    };


    const fetchUsers = (filterOptions) => {
        getUsers(filterOptions)
            .then(([pagination, allUsers]) => {
                const usersCompany = allUsers.map(user => {
                    if (user.role === 'vendor') {

                    }
                })
                setUsers(allUsers);
                setPaginationData(pagination)


            })
            .catch((error) => {
                console.error(error);
            });
    };

    const fetchCompanyData = async () => {
        const companies = await getCompanies();

    }

    const handleConfirmNo = (e) => {
        e.preventDefault();
        setIsEditMode(false);
    }


    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: '',
            documents: ''
        },
        validationSchema: userSchema,
        onSubmit: async (values, {setSubmitting}) => {
            try {
                const formData = new FormData();
                formData.append('documents', uploadedPicture);
                const userId = currentUser.id.toString();
                formData.append('createdBy', userId);

                await createFile(formData);

                setPicture(URL.createObjectURL(uploadedPicture));

                const files = await getFiles();
                const lastUploadedFile = files[files.length - 1];

                await updateUser(userId, {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password,
                    documents: lastUploadedFile.id
                });

                setIsEditMode(false);
            } catch (error) {
                console.error('Error occurred while updating user', error);
            } finally {
                setSubmitting(false);
            }
        }
    })
    return (
        <Card className='bg-yellow'>
            <div className='d-flex flex-wrap justify-content-between'>
                {users && (
                    users.map((user) => (
                        <Card
                            key={user.id}
                            className='card p-3 border border-black border-5 mb-3 col-10 col-md-8 col-lg-6 mr-2'
                            style={{flex: '0 0 calc(50% - 0.5rem)'}}
                        >
                            {!isEditMode && (
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <button className='btn btn-lg'
                                                onClick={() => setIsEditMode(true)}
                                        >
                                            Edit User
                                        </button>
                                    </div>
                                    <div>
                                        <button className='btn btn-lg'
                                                onClick={() => setIsEditMode(true)}
                                        >
                                            Block User
                                        </button>
                                    </div>
                                </div>
                            )}
                            <br/>

                            <UserProfilePicture profilePictureId={user.documents}/><br/>

                                {!isEditMode ? (
                                        <Card.Title className='text-center'>
                                    <label>{user.firstName} {user.lastName}</label>
                                        </Card.Title>
                                ) : (
                                    <Card.Body>
                                        <label className='form-label fs-6 fw-bolder text-dark'>First Name: </label>
                                        <input
                                            type='text'
                                            id='firstName'
                                            name='firstName'
                                            value={user.firstName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={clsx('form-control form-control-lg',
                                                {'is-invalid': (formik.touched.firstName) && formik.errors.firstName},
                                                {'is-valid': (formik.touched.firstName) && !formik.errors.firstName}
                                            )}/>

                                        {formik.touched.firstName && formik.errors.firstName && (
                                            <div className='fv-plugins-message-container'>
                                                <span className='text-danger'
                                                      role='alert'>{formik.errors.firstName}</span>
                                            </div>
                                        )}
                                        <br/>
                                        <label className='form-label fs-6 fw-bolder text-dark'>Last Name: </label>
                                        <input
                                            type='text'
                                            id='lastName'
                                            name='lastName'

                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={clsx('form-control form-control-lg',
                                                {'is-invalid': (formik.touched.lastName) && formik.errors.lastName},
                                                {'is-valid': (formik.touched.lastName) && !formik.errors.lastName}
                                            )}/>


                                        {formik.touched.lastName && formik.errors.lastName && (
                                            <div className='fv-plugins-message-container'>
                                                <span className='text-danger'
                                                      role='alert'>{formik.errors.lastName}</span>
                                            </div>
                                        )}
                                    </Card.Body>
                                )}

                            <Card.Body>
                                <label className='form-label fs-6 fw-bolder text-dark'>e-mail: </label>
                                {isEditMode ? (
                                    <div>
                                        <input
                                            type='text'
                                            id='email'
                                            value={user.email}
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
                                    <label>{user.email}</label>
                                )}
                                <br/>

                                <label className='form-label fs-6 fw-bolder text-dark'>Password: </label>
                                {isEditMode ? (
                                    <div>
                                        <input
                                            type='text'
                                            id='text'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={clsx('form-control form-control-lg',
                                                {'is-invalid': (formik.touched.password) && formik.errors.password},
                                                {'is-valid': (formik.touched.password) && !formik.errors.password}
                                            )}
                                        />
                                        {formik.touched.password && formik.errors.password && (
                                            <div className='fv-plugins-message-container'>
                                                <span className='text-danger' role='alert'>{formik.errors.password}</span>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <label>{formik.values.password}</label>
                                )}

                                <br/>
                                <label className='form-label fs-6 fw-bolder text-dark'>verified: </label>
                                {!isEditMode?(
                                    <div>
                                        {user.isEmailVerified ? (
                                            <label className='form-label fs-6 fw-bolder text-success'>Verified</label>
                                        ) : (
                                            <label className='form-label fs-6 fw-bolder text-danger'>Not verified </label>
                                        )}
                                    </div>
                                ):(
                                    <div>

                                    </div>
                                )}
                                <br/>
                                <label className='form-label fs-6 fw-bolder text-dark'>role:</label>
                                {!isEditMode?(
                                    <div>
                                        <label>{user.role}</label><br/>
                                        {user.role === 'vendor' && (
                                            <div className='fv-row'>
                                                <label className='form-label fs-6 fw-bolder text-dark'>company:</label><br/>

                                            </div>
                                        )}
                                    </div>

                                ):(
                                    <div>
                                        <input
                                            type='text'
                                            id='role'
                                            value={user.role}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={clsx('form-control form-control-lg',
                                                {'is-invalid': (formik.touched.role) && formik.errors.role},
                                                {'is-valid': (formik.touched.role) && !formik.errors.role}
                                            )}
                                        />
                                        {formik.touched.role && formik.errors.role && (
                                            <div className='fv-plugins-message-container'>
                                                <span className='text-danger' role='alert'>{formik.errors.role}</span>
                                            </div>
                                        )}
                                    </div>
                                )}


                                {isEditMode && (
                                    <div className='d-flex justify-content-between mt-3'>
                                        <div>
                                            <button
                                                className='btn btn-lg'
                                                type='submit'>
                                                Save Changes
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                className='btn btn-lg btn-secondary'
                                                onClick={handleConfirmNo}>
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    ))
                )}
            </div>
        </Card>
    )
};

export default Users;