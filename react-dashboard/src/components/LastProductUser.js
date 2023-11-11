import React from 'react';
/* import imagenFondo from '../assets/images/mandalorian.jpg'; */

function LastProductUser(props){
    return(
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">{props.grantitle}</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 20 +'rem', height: 20 +'rem'}} src={props.image} alt='imagen'/>
                    </div>
                    <p>{props.title}</p>
                    <p>{props.description}</p>
                </div>
            </div>
        </div>
    )
}

export default LastProductUser;