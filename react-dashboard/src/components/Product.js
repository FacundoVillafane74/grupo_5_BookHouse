import React from 'react';
import imgCode from '../img/Code.png'

let Product = () => {
    return(
        <div>
            <h2>Titulo del producto</h2>
            <img src={imgCode} alt='imagen del producto' />
            <p>Descripción del producto</p>
        </div>
    )
};

export default Product