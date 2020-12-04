import React from 'react';
import { Button, Input, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

type Props = {
    onButtonClickPrevious: () => void;
    pageNumber: number | undefined;
    onButtonClickNext: () => void;
    pages: number | null | undefined;
    onButtonClickScaleDown: () => void;
    onButtonClickNoScale: () => void;
    onButtonClickScaleUp: () => void;
    onButtonClickRotateLeft: () => void;
    onButtonClickNoRotation: () => void;
    onButtonClickRotateRight: () => void;
};

export const ControlPanel = ({
    onButtonClickPrevious,
    pageNumber,
    onButtonClickNext,
    pages,
    onButtonClickScaleDown,
    onButtonClickNoScale,
    onButtonClickScaleUp,
    onButtonClickRotateLeft,
    onButtonClickNoRotation,
    onButtonClickRotateRight,
}: Props) => {
    const styles = useStyles();

    return (
        <Paper elevation={1} className={styles.container}>
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
        </Paper>
    );
};

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 3,
        backgroundColor: 'white',
    },
});
