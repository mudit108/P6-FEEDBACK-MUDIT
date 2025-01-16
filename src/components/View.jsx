import React from "react";
import { useState } from "react";

function View({list, handleEdit, handleDelete}) {
 
  return (
    <>  
      <h2>user data</h2>
        <table className="table w-50 mx-auto caption-top table-bordered">
          <tr>
            <th scope="col">name</th>
            <th scope="col">Age</th>
            <th scope="col">add</th>
            <th scope="col">gender</th>
            <th scope="col">city</th>
            <th scope="col">edit</th>
            <th scope="col">delete</th>
          </tr>
          <tbody>
            {list.length>0 ?( 
              list.map((user,index)=>(
                <tr key={index}>
                   <td>{user.name}</td>
                   <td>{user.age}</td>
                   <td>{user.address}</td>
                   <td>{user.gender1}</td> 
                   <td>{user.city}</td>
                   <td><button className="btn btn-primary" onClick={()=> handleEdit(user.id)}>Edit</button></td>
                  <td><button className="btn btn-danger" onClick={()=> handleDelete(user.id)}>Delete</button></td> 
                </tr>
              ))
            ):(<tr>
              <th scope="row" colSpan="7" className="text-center">
                Data Not Found.
              </th>
            </tr>) }
          </tbody>
        </table>
    </>
  );
}

export default View;
