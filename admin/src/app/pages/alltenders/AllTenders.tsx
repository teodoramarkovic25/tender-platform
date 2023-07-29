import React, {useState, useEffect} from 'react';
import {getTenders} from "../../shared/services/tender.service";
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

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        fetchTenders({
            page: newPage,

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


    return (
        <div className="table-responsive">
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
                    <Form className="d-flex align-items-end">
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

                        <button type="submit" className='btn btn-lg btn-primary btn-sm'>Filter Tenders</button>

                    </Form>
                )}
            </Formik>

            <table className="table table-striped gy-7 gs-7">
                <thead className="text-white">
                {/* ... */}
                </thead>
                <tbody className="table-striped border table-hover">
                {tenders.map((tender) => (
                    <tr key={tender._id}>
                        <td>{tender.title}</td>
                        <td>{tender.description}</td>
                        <td>{formatDate(tender.deadline)}</td>
                        <td>{tender.criteria}</td>
                        <td>{tender.weightage}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <Pagination paginationData={paginationData} onPageChange={handlePageChange} />

        </div>
    );
}

export default AllTenders;
