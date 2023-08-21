import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ModalComponent from "../modals/ModalComponent";
import EvaluateTender from "./evaluators/EvaluateTender";
import {getFileContent} from "../shared/services/fileContent.service";
import {getFile} from "../shared/services/file.service";

const EvaluateOffers = () => {
    const location = useLocation();
    // @ts-ignore
    const {offer} = location.state || {};
    const [isOpen, setIsOpen] = useState(false);
    const [fileContent, setFileContent] = useState(null);
    const [file, setFile] = useState(null);
    const toggle = () => setIsOpen(!isOpen);

    const showFile = async () => {
        const fileBlob = await getFileContent(offer.documents);
        setFileContent(URL.createObjectURL(fileBlob));

        const file = await getFile(offer.documents);
        setFile(file);
    }

    const handleShow = () => {
        setIsOpen(true);
    };

    const downloadFile = () => {

        if (file) {
            const link = document.createElement('a');
            link.href = fileContent;
            link.download = file.fileName + '.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }


    useEffect(() => {
        showFile();
    }, [])

    // @ts-ignore
    return (
        <div>
            <Card className='text-center'>
                <Card.Title>
                    Offer details
                </Card.Title>
                <Card.Body>
                    <h1>Offered Money: </h1>
                    <br/>
                    {offer.offer} $
                    <br/>
                    <br/>
                    <h1>Documents: </h1>
                    <br/>
                    <br/>
                    <iframe
                        src={fileContent}
                        width="100%"
                        height="500px"
                        className='text-center'
                    />
                    <button
                        className="btn btn-lg w-30 mb-3"
                        onClick={downloadFile}
                    >Download File
                    </button>
                    <button className='btn btn-lg w-100 mb-5' onClick={() => handleShow()}>Evaluate offer</button>
                </Card.Body>
            </Card>
            <ModalComponent show={isOpen} onHide={toggle}>

                <EvaluateTender offer={offer}/>


            </ModalComponent>
        </div>
    );
};

export default EvaluateOffers;