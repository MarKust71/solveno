import React, { useEffect, useState } from 'react';
import { Button, Container, Input, Paper } from '@material-ui/core';
import { pdfjs } from 'react-pdf';
import { PDFDocumentProxy } from 'pdfjs-dist';
import { PdfDocument, Rotate } from './components/PdfDocument';
import { makeStyles } from '@material-ui/styles';
import { PDFDocument } from 'pdf-lib';
import { getAllFiles } from './endpoints/getAllFiles';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function App() {
    const [pages, setPages] = useState<number | null>();
    const [pageNumber, setPageNumber] = useState<number | undefined>(1);
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState<Rotate>(0);
    const [response, setResponse] = useState('');
    const styles = useStyles();

    const onLoadSuccess = (pdf: PDFDocumentProxy) => {
        const { numPages } = pdf;
        setPages(numPages);
        setPageNumber(1);
        pdf.getMetadata().then((result) => console.log('getMetaData:', result));
        pdf.getData().then((result) => {
            // @ts-ignore
            PDFDocument.load(result, { updateMetadata: true }).then((pdfDoc) => {
                pdfDoc.setKeywords(["{dms-id: '1111-2222-333333-4444'}"]);
                // @ts-ignore
                console.log('keywords:', pdfDoc.getKeywords());
                pdfDoc
                    .save()
                    .then((onFulfilled) => console.log('fulfilled:', onFulfilled))
                    .catch((error) => console.log('error:', error));
            });
        });
    };

    const onButtonClickNext = () => {
        if (pageNumber && pages) {
            if (pageNumber < pages) setPageNumber(pageNumber + 1);
        }
    };

    const onButtonClickPrevious = () => {
        if (pageNumber) {
            if (pageNumber > 1) setPageNumber(pageNumber - 1);
        }
    };

    const onButtonClickNoScale = () => {
        setScale(1);
    };

    const onButtonClickScaleDown = () => {
        if (scale >= 0.5) setScale(scale - 0.1);
    };

    const onButtonClickScaleUp = () => {
        if (scale <= 1.5) setScale(scale + 0.1);
    };

    const onButtonClickRotateRight = () => {
        switch (rotate) {
            case 0:
                setRotate(90);
                break;
            case 90:
                setRotate(180);
                break;
            case 180:
                setRotate(270);
                break;
            case 270:
                setRotate(0);
                break;
            default:
                break;
        }
    };

    const onButtonClickRotateLeft = () => {
        switch (rotate) {
            case 0:
                setRotate(270);
                break;
            case 90:
                setRotate(0);
                break;
            case 180:
                setRotate(90);
                break;
            case 270:
                setRotate(180);
                break;
            default:
                break;
        }
    };

    const onButtonClickNoRotation = () => {
        setRotate(0);
    };

    useEffect(() => {
        getAllFiles();
    }, []);

    return (
        <Container style={{ marginTop: 10 }}>
            <Paper elevation={5}>
                <PdfDocument
                    file="./assets/fax@pbsim.pl_20201112_095939.pdf"
                    onLoadSuccess={onLoadSuccess}
                    pageNumber={pageNumber}
                    scale={scale}
                    rotate={rotate}
                />
            </Paper>
            <div id="my_pdf_viewer" style={{ display: 'grid' }}>
                <div id="navigation-controls">
                    <Button onClick={onButtonClickPrevious} variant="outlined" size="small" disabled={pageNumber === 1}>
                        Previous
                    </Button>
                    <Input value={pageNumber} type="number" />
                    <Button onClick={onButtonClickNext} variant="outlined" size="small" disabled={pageNumber === pages}>
                        Next
                    </Button>
                </div>
                <div id="zoom-controls">
                    <Button variant="outlined" onClick={onButtonClickScaleDown} size="small">
                        -
                    </Button>
                    <Button onClick={onButtonClickNoScale} size="small">
                        o
                    </Button>
                    <Button variant="outlined" onClick={onButtonClickScaleUp} size="small">
                        +
                    </Button>
                </div>
                <div>
                    <Button variant="outlined" onClick={onButtonClickRotateLeft} size="small">
                        left
                    </Button>
                    <Button onClick={onButtonClickNoRotation} size="small">
                        o
                    </Button>
                    <Button variant="outlined" onClick={onButtonClickRotateRight} size="small">
                        right
                    </Button>
                </div>
            </div>
            <div>path:{__dirname}</div>
            <div>res:{response}</div>
        </Container>
    );
}

export default App;

const useStyles = makeStyles({});
