import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { LeftPanel } from './containers/LeftPanel/LeftPanel';
import { RightPanel } from './containers/RightPanel/RightPanel';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function App() {
    const style = {
        backgroundColor: 'lightgrey',
        height: 900,
    };

    return (
        <Container style={style}>
            <Grid container spacing={1} justify="center" alignItems="flex-start" style={style}>
                <Grid item lg={3}>
                    <LeftPanel />
                </Grid>
                <Grid item lg={9}>
                    <RightPanel />
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;
