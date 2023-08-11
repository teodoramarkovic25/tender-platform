import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom"
import {Formik, Form, Field, ErrorMessage} from 'formik';
import DashBoardCard from "./DashboarcCard";
import {getChartData, getStats} from "../../shared/services/statsService";
import Chart from './Chart';
import * as Yup from "yup";


const statsSchema = Yup.object().shape({
    dateFrom: Yup.date(),
    dateTo: Yup.date().min(Yup.ref('dateFrom'), 'Date To must be later than Date From')
});

export function Dashboard() {

    const [activeCount, setActiveCount] = useState(0);
    const [inactiveCount, setInactiveCount] = useState(0);
    const [offersCount, setOffersCount] = useState(0);
    const [chartData, setChartData] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const handleFilterSubmit = (values)=>{
        getChartData(values)
            .then(data =>{
                setSearchParams(values);
                setChartData(data.result);
            })
    }
    useEffect(() => {
        //fetching all the data
        getStats()
            .then(data => {
                setActiveCount(data.activeTenders);
                setInactiveCount(data.inactiveTenders);
                setOffersCount(data.offers);
            });
        getChartData({
            dateFrom: searchParams.has('dateFrom') ? searchParams.get('dateFrom') : '',
            dateTo: searchParams.has('dateTo') ? searchParams.get('dateTo') : '',
        }) //should think about this, maybe the current year.
            .then(data => {
                setChartData(data.result);
                console.log(data.result);
            });

    }, []);

    return (
        <div>
            <Formik
                initialValues={{
                    //corrected for automatic filter
                    dateFrom: searchParams.has('dateFrom') ? searchParams.get('dateFrom') : '',
                    dateTo: searchParams.has('dateTo') ? searchParams.get('dateTo') : '',

                }}
                validationSchema={statsSchema}
                onSubmit={handleFilterSubmit}
            >
                {({errors, touched}) => (
                    <Form className="d-flex justify-content-start form flex-wrap">
                        <div className="form-group me-3">
                            <label className="form-label fs-6 fw-bolder text-dark justify-content-start">Date
                                From:</label>
                            <Field type="date" name="dateFrom" className="form-control form-control-lg"/>
                            <ErrorMessage name="dateFrom" component="div" className="text-danger"/>
                        </div>

                        <div className="form-group me-3">
                            <label className="form-label fs-6 fw-bolder text-dark justify-content-start">Date
                                To:</label>
                            <Field type="date" name="dateTo" className="form-control form-control-lg"/>
                            <ErrorMessage name="dateTo" component="div" className="text-danger"/>
                        </div>
                        <div className=" mt-auto p-auto d-flex ">
                            <button type="submit" className='btn btn-sm py-4
                         text-dark   '>Filter Tenders
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
            <div className="row row-cols-3 card-group my-4">
                <DashBoardCard number={activeCount} name="Active Tenders"></DashBoardCard>
                <DashBoardCard number={inactiveCount} name="Inactive Tenders"></DashBoardCard>
                <DashBoardCard number={offersCount} name="Offers"></DashBoardCard>
            </div>
            <div className="row row-cols-1 my-4">
                <Chart data={chartData}></Chart>
            </div>

        </div>
    );


}
