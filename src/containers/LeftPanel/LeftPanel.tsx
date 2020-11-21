import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { BottomNavigation, BottomNavigationAction, Paper } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

export const LeftPanel = () => {
    const styles = useStyles();
    const [value, setValue] = useState('folder');

    return (
        <div>
            <Paper elevation={3} className={styles.paper}>
                {value}
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
        height: 833,
        maxHeight: 833,
        display: 'flex',
        justifyContent: 'center',
        overflow: 'auto',
    },
    root: { marginTop: 3 },
});
