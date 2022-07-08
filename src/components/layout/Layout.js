import React from 'react';

import classes from './Layout.module.css';
import MainNavigation from './MainNavigation.js';

const Layout = (props) => {
    return <React.Fragment>
        <MainNavigation />
        <main className={classes.main}>{props.children}</main>
    </React.Fragment>
};

export default Layout;