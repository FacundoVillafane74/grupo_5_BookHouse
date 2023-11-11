import React, { useState, useEffect } from 'react';
import '../App.css';

function CategoryInDb() {
    let [categorys, setCategorys] = useState([])

    useEffect(() => {
        (
            async function(){
                try {
                    let response = await fetch('/product/api');
                    let data = await response.json();
                    console.log(data);
                    setCategorys(data)

                } catch (error) {
                    console.log(error);
                }
            }
        )()
    },[]);

    let categorysArray = categorys.countByCategory

    return (
        <React.Fragment>
                {/*<!-- Categories in DB -->*/}
                <div className="col-lg-6 mb-4">						
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className='m-0 font-weight-bold text-gray-800'>Categorías</h6>
                        </div>
                        <div className='card-body'>
                            <div className="row">
                            {categorysArray && categorysArray.map((category, index) => (
                            <div key={index} className='category-card'>
                                {Object.keys(category).map((key, i) => (
                                    <div className='card-body card text-white bg-dark shadow' key={i}>{`${key}: ${category[key]}`}</div>
                                ))}
                            </div>
                        ))}
                            </div>
                        </div>
                    </div>
                </div>
           
        </React.Fragment>
    )

}
export default CategoryInDb;