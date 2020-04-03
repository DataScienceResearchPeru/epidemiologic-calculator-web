import React, { useContext } from 'react';
import { StateContext } from '../contexts';

import Header from '../components/Header/Header';
import LineAreaGraphic from '../components/LineGraphic/LineGraphic';


const DashboardPage = () => {
    const { state, dispatch } = useContext(StateContext);

    return (
        <React.Fragment>
            <Header></Header>
            <LineAreaGraphic></LineAreaGraphic>
        </React.Fragment>
    )
}

export default DashboardPage;