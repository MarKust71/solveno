import React from 'react';
import { Document, Page } from 'react-pdf';
import { PDFDocumentProxy } from 'pdfjs-dist';
import { PDFPageProxy } from 'react-pdf/dist/Page';

export type Rotate = 0 | 90 | 180 | 270 | undefined;

type Props = {
    file: string;
    onLoadSuccess: (pdf: PDFDocumentProxy) => void;
    pageNumber?: number;
    scale?: number;
    rotate?: Rotate;
};

export const PdfDocument = ({ file, onLoadSuccess, pageNumber, scale, rotate }: Props) => {
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
        <Document file={file} onLoadSuccess={onLoadSuccess}>
            <Page
                pageNumber={pageNumber || 1}
                scale={scale || 1}
                rotate={rotate || 0}
                onLoadSuccess={onLoadPageSuccess}
            />
        </Document>
    );
};

// const styles = StyleSheet.create({});
