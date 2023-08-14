import React,{useState, useEffect} from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = (props) => {
    const [data, setData] = useState([
        { name: 'Jan', value: 0 },
        { name: 'Feb', value: 0 },
        { name: 'Mar', value: 0 },
        { name: 'Apr', value: 0 },
        { name: 'May', value: 0 },
        { name: 'Jun', value: 0 },
        { name: 'Jul', value: 0 },
        { name: 'Avg', value: 0 },
        { name: 'Sept', value: 0 },
        { name: 'Oct', value: 0 },
        { name: 'Nov', value: 0 },
        { name: 'Dec', value: 0 },
        // Add more data points here
    ]);
    const currentDate = new Date().getFullYear();


    console.log(data[1]);
    useEffect(() => {
        // Update the data state when props.data changes
        if (props.data && Array.isArray(props.data) ) {

            setData(prevData => {
                const newData = [...prevData];
                props.data.forEach(item =>{
                        var index = parseInt(item._id.split('-')[1]);
                        console.log(index);
                        index--;
                        console.log(newData[index].value);
                        newData[index].value = item.count;
                }
                )
                return newData;
            });
        }
    }, [props.data]);

    return (
        <div className="container">
            <div className="row justify-content-center mt-4">
                <h2 className="text-center text-primary">{currentDate} Tender Trend</h2>
            </div>
            <ResponsiveContainer width="90%" height={500} className="row justify-content-center">
                <BarChart data={data}>
                    <XAxis dataKey="name" stroke = "#EF1A07"/>
                    <YAxis />
                    <CartesianGrid stroke="#ccc" />
                    <Bar type="monotone"  fill ="#EF1A07" dataKey="value" stroke="#EF1A07" strokeWidth={2}/>
                    <Tooltip cursor={{fill: 'transparent'}}/>
                    <Legend />
                </BarChart>
            </ResponsiveContainer>
        </div>
        
    );
};

export default Chart;
