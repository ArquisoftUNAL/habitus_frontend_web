import React from 'react';

import "./../styles/GeneralStyles.css";

function LoadingView() {

    return (
        <div className="habitus-large-text habitus-fullpage-container">
            <div className='row'>
                <div className='col-12'>
                    <img src="https://cdn.pixabay.com/animation/2023/03/20/02/45/02-45-27-186_512.gif" />
                </div>
            </div>
        </div>
    );
}

export default LoadingView;