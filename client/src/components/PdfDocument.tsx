import React from 'react';
import { Document, Page } from 'react-pdf';
import { PDFDocumentProxy } from 'pdfjs-dist';
import { PDFPageProxy } from 'react-pdf/dist/Page';

export type Rotate = 0 | 90 | 180 | 270 | undefined;

type Props = {
    file: string;
    onLoadDocumentSuccess: (pdf: PDFDocumentProxy) => void;
    onLoadPageSuccess: (page: PDFPageProxy) => void;
    pageNumber?: number;
    scale?: number;
    rotate?: Rotate;
};

export const PdfDocument = ({ file, onLoadDocumentSuccess, onLoadPageSuccess, pageNumber, scale, rotate }: Props) => {
    return (
        <Document file={file} onLoadSuccess={onLoadDocumentSuccess}>
            <Page
                pageNumber={pageNumber || 1}
                scale={scale || 1.5}
                rotate={rotate || 0}
                onLoadSuccess={onLoadPageSuccess}
            />
        </Document>
    );
};
