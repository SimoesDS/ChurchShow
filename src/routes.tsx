import React from 'react';
import { Route, BrowserRouter } from "react-router-dom";

import MainScreen from './MainScreen';
import PresentationScreen from './PresentationScreen';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={MainScreen} path="/MainScreen"/>
            <Route component={PresentationScreen} path="/PresentationScreen"/>
        </BrowserRouter>
    );
};

export default Routes;