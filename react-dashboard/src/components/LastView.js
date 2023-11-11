import React from 'react';
import LastProductUser from './LastProductUser';
import { useState, useEffect } from 'react'

/*  Cada set de datos es un objeto literal */

function LastView(){

    let [products, setProducts] = useState({})
    let [users, setUsers] = useState({})

    useEffect(() => {
        (
            async function(){
                try {
                    let response = await fetch('/product/api');
                    let data = await response.json();
                    console.log(data);
                    setProducts(data)

                } catch (error) {
                    console.log(error);
                }
            }
        )()
    },[]);

    useEffect(() => {
    (
        async function(){
            try {
                let response = await fetch('/user/api');
                let data = await response.json();
                console.log(data);
                setUsers(data)

            } catch (error) {
                console.log(error);
            }
        }
    )()
    },[]);

/* <!-- producto --> */

let product = {
    grantitle: 'Último producto',
    title: `Nombre: ${products.products ? products.products[products.products.length - 1].name : ''}`,
    description: `Descripción: ${products.products ? products.products[products.products.length - 1].description : ''}`,
    image: products.products ? products.products[products.products.length - 1].image : ''
}

console.log(product);
/* <!-- usuario --> */

let user = {
    grantitle: 'Último usuario',
    title: `Nombre: ${users.users ? users.users[users.users.length - 1].name : ''}`, 
    description: `Email: ${users.users ? users.users[users.users.length - 1].email : ''}`,
    image: users.users ? users.users[users.users.length - 1].image : ''
}

/* console.log(user); */


let newDate = [product, user];

    return (

        <div className="row">

            {newDate.map( (movie, i) => {
                return <LastProductUser {...movie} key={i}/>
            })}

        </div>
    )
}

export default LastView;