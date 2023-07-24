import React, {useState, useEffect} from 'react';
import {deleteTender, getTenders} from "../../shared/services/tender.service";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {Pagination} from "../../shared/components/pagination/pagination";


function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    // @ts-ignore
    const formattedDate = date.toLocaleDateString(options);
    return formattedDate;
}


const tenderSchema = Yup.object().shape({
    dateFrom: Yup.date(),
    dateTo: Yup.date().min(Yup.ref('dateFrom'), 'Date To must be later than Date From'),
    weightageFrom: Yup.number().min(100),
    weightageTo: Yup.number().min(100).when(
        'weightageFrom',
        (weightageFrom, schema) => schema.min(weightageFrom, 'Weightage To must be greater than Weightage From')
    )
});

export function AllTenders() {
    const [tenders, setTenders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationData, setPaginationData] = useState({});
    const [currentLimit, setCurrentLimit] = useState(10);


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        fetchTenders({
            page: newPage,

        });
    };
    const handleLimitChange = (newValue) => {
        setCurrentLimit(newValue);
        fetchTenders({
            limit: newValue,
        })
    }


    const handleDeleteTender = (tenderId) => {
        deleteTender(tenderId)
            .then((deletedTender) => {
                if (deletedTender) {
                    setTenders((prevTenders) => prevTenders.filter((tender) => tender.id !== tenderId));
                    console.log('Tender deleted successfully.');
                } else {
                    console.log('Tender with the given ID was not found.');
                }
            })
            .catch((error) => {
                console.error('Error deleting tender:', error.message);
            });
    };




    const fetchTenders = (filterOptions) => {
        getTenders(filterOptions)
            .then(([pagination, allTenders]) => {
                setTenders(allTenders);
                setPaginationData(pagination)
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        fetchTenders({});
    }, []);

    const handleFilterSubmit = (values) => {
        fetchTenders(values);
    };


    // @ts-ignore
    return (
        <div>
            <h1>All active tenders</h1>
            <Formik
                initialValues={{
                    dateFrom: '',
                    dateTo: '',
                    weightageFrom: '',
                    weightageTo: '',
                }}
                validationSchema={tenderSchema}
                onSubmit={handleFilterSubmit}
            >
                {({errors, touched}) => (
                    <Form className="d-flex align-items-center form">
                        <div className="form-group me-3">
                            <label className="form-label fs-6 fw-bolder text-dark">Date From:</label>
                            <Field type="date" name="dateFrom" className="form-control form-control-lg"/>
                            <ErrorMessage name="dateFrom" component="div" className="text-danger"/>
                        </div>

                        <div className="form-group me-3">
                            <label className="form-label fs-6 fw-bolder text-dark">Date To:</label>
                            <Field type="date" name="dateTo" className="form-control form-control-lg"/>
                            <ErrorMessage name="dateTo" component="div" className="text-danger"/>
                        </div>

                        <div className="form-group me-3">
                            <label className="form-label fs-6 fw-bolder text-dark">Weightage From:</label>
                            <Field type="number" step="any" min="100" name="weightageFrom"
                                   className="form-control form-control-lg"/>
                            <ErrorMessage name="weightageFrom" component="div" className="text-danger"/>
                        </div>

                        <div className="form-group me-3">
                            <label className="form-label fs-6 fw-bolder text-dark">Weightage To:</label>
                            <Field type="number" step="any" min="100" name="weightageTo"
                                   className="form-control form-control-lg"/>
                            <ErrorMessage name="weightageTo" component="div" className="text-danger"/>
                        </div>

                        <button type="submit" className='btn btn-lg btn-primary  btn-sm'>Filter Tenders</button>

                    </Form>
                )}
            </Formik>
            <div className="table-responsive">
                <table className="table table-striped gy-7 gs-7  table-bordered border-4 ">
                    <thead className=" thead-dark text-center ">
                    <th>Title</th>
                    <th>Description</th>
                    <th>Deadline</th>
                    <th>Criteria</th>
                    <th>Weightage</th>
                    <th>Delete tender</th>

                    </thead>
                    <tbody className="table-striped border table-hover">
                    {tenders.map((tender) => (
                        <tr key={tender.id}>

                            <td className="text-center">{tender.title}</td>
                            <td className="text-center">{tender.description}</td>
                            <td className="text-center">{formatDate(tender.deadline)}</td>
                            <td className="text-center">{tender.criteria}</td>
                            <td className="text-center">{tender.weightage}</td>
                            <td className="text-center">

                                <button
                                    className="btn btn-sm btn-danger justify-content-center"
                                    onClick={() => handleDeleteTender(tender.id)}
                                >
                                    <i className="fas fa-trash "></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <Pagination paginationData={paginationData} onPageChange={handlePageChange}
                            onLimitChange={handleLimitChange}/>

            </div>
        </div>
    );
}

export default AllTenders;
