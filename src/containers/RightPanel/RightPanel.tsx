import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Paper } from '@material-ui/core';
import { PdfDocument, Rotate } from '../../components/PdfDocument';
import { PDFDocumentProxy } from 'pdfjs-dist';
import { PDFDocument } from 'pdf-lib';
import { ControlPanel } from '../../components/ControlPanel/ControlPanel';
import { PDFPageProxy } from 'react-pdf/dist/Page';

export const RightPanel = () => {
    const styles = useStyles();
    const [pages, setPages] = useState<number | null>();
    const [pageNumber, setPageNumber] = useState<number | undefined>(1);
    const [scale, setScale] = useState(1.5);
    const [rotate, setRotate] = useState<Rotate>(0);

    const onButtonClickPrevious = () => {
        if (pageNumber) {
            if (pageNumber > 1) setPageNumber(pageNumber - 1);
        }
    };

    const onButtonClickNext = () => {
        if (pageNumber && pages) {
            if (pageNumber < pages) setPageNumber(pageNumber + 1);
        }
    };

    const onButtonClickNoScale = () => {
        setScale(1.5);
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

    const onLoadPageSuccess = (page: PDFPageProxy) => {
        page.getAnnotations().then((result) => console.log('getAnnotation', result));
        page.getTextContent().then((result) => console.log('getTextContent', result));
        console.log(
            'getVieport',
            page.getViewport({
                dontFlip: undefined,
                offsetX: undefined,
                offsetY: undefined,
                rotation: undefined,
                scale: 1,
            }),
        );
    };

    return (
        <div>
            <Paper elevation={3} className={styles.paper}>
                <PdfDocument
                    file="/assets/fax@pbsim.pl_20201112_095939.pdf"
                    onLoadPageSuccess={onLoadPageSuccess}
                    onLoadDocumentSuccess={onLoadSuccess}
                    pageNumber={pageNumber}
                    scale={scale}
                    rotate={rotate}
                />
            </Paper>
            <ControlPanel
                onButtonClickPrevious={onButtonClickPrevious}
                pageNumber={pageNumber}
                onButtonClickNext={onButtonClickNext}
                pages={pages}
                onButtonClickScaleDown={onButtonClickScaleDown}
                onButtonClickNoScale={onButtonClickNoScale}
                onButtonClickScaleUp={onButtonClickScaleUp}
                onButtonClickRotateLeft={onButtonClickRotateLeft}
                onButtonClickNoRotation={onButtonClickNoRotation}
                onButtonClickRotateRight={onButtonClickRotateRight}
            />
        </div>
    );
};

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    paper: {
        height: 833,
        maxHeight: 8533,
        display: 'flex',
        justifyContent: 'center',
        overflow: 'auto',
    },
});
