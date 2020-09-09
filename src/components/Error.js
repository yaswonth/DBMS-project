import React from 'react';
import {Link} from 'react-router-dom';
export default function Error(){
    return(
        <div className='er-c'>
            <div className='er-n'>
                <p className='er-t'>
                    404
                </p>
                <Link to='/'>Go to Home page</Link>
            </div>
        </div>
    );
}