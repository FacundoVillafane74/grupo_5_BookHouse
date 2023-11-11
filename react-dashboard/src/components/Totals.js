import React from 'react';
import SmallCard from './SmallCard.js';
import { useState, useEffect } from 'react'

/*  Cada set de datos es un objeto literal */

function Totals(){

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

/* <!-- products --> */

let product = {
    title: 'Total productos',
    color: 'primary', 
    cuantity: products.count ? products.count : '',
    icon: 'fa-clipboard-list'
}

/* <!-- usuarios --> */

let user = {
    title:'Total usuarios', 
    color:'success', 
    cuantity: users.count ? users.count : '',
    icon:'fa-award'
}

/* <!-- categorias --> */

let category = {
    title:'Total categorias',
    color:'warning',
    cuantity: products.countByCategory ? products.countByCategory.length : '',
    icon:'fa-user-check'
}

let totals = [product, user, category];

    return (

        <div className="row">

            {totals.map( (movie, i) => {

                return <SmallCard {...movie} key={i}/>

            })}

        </div>
    )
}

export default Totals;