import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { BottomNavigation, BottomNavigationAction, Paper } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { getAllFiles } from '../../endpoints/getAllFiles';
import CustomizedSelects from '../../components/CustomizedSelects';

export const LeftPanel = () => {
    const styles = useStyles();
    const [value, setValue] = useState('folder');
    const [viewport, setViewport] = useState('');
    const [response, setResponse] = useState([]);

    useEffect(() => {
        const files = async () => {
            const filesList = await getAllFiles();
            console.log(filesList);
            // setResponse(JSON.stringify(filesList, null, 2));
            setResponse(filesList);
        };
        files();
    }, []);

    return (
        <div>
            <Paper elevation={3} className={styles.paper}>
                {/*<div>{value}</div>*/}
                {/*<div>{response}</div>*/}
                <CustomizedSelects files={response} />
            </Paper>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
                className={styles.root}
            >
                <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
                <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
                <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon />} />
            </BottomNavigation>
        </div>
    );
};

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        height: 833,
        maxHeight: 833,
        overflow: 'auto',
    },
    root: { marginTop: 3 },
});
