import React, {useState, useEffect} from 'react';
import ChartRow from './ChartRow';

function Chart (){

let [products, setProducts] = useState({})

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

let productsArray = products.products;
/* console.log(productsArray); */

return (
        /* <!-- DataTales Example --> */
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Descripción</th>
                                <th>Año</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            productsArray &&
                            productsArray.map((row , i) => {
                                return <ChartRow { ...row} key={i}/>
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Chart;