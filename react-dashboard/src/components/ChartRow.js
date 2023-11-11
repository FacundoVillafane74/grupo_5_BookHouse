import React from 'react';

function ChartRow(props){
    return (
                <tr>
                    <td>{props.name}</td>
                    <td>{props.category}</td>
                    <td>{props.price}</td>
                    <td>{props.description}</td>
                    <td>{props.age}</td>
                </tr>
            )
    }
    
        

export default ChartRow;