import React from 'react'
import './TableCard.css'

export default function TableCard(props) {
    let tableTitle = props.title
    let data = props.data
    let keys = [];
    if(data.length>0){
        keys = Object.keys(data[0]);
    }
    
  return (
    <div className='table-card'>
    <div>
        <b>{tableTitle}</b>
    </div>
    {data.length>0 ?
     <div>
        <table>
        <tr>
            {
                keys.map((key) => {
                    return <th>{key}</th>
                })
            }
            </tr>
            
            {
                data.map((row) =>{
                    return (
                        <tr>
                            {
                                keys.map((key) => {
                                    return <td>{row[key]}</td>
                                })
                            }
                        </tr>
                    )
                })
                
            }
        </table>
    </div>
    :
    <div>You have not applied to any job yet</div>}
</div>
  )
}
