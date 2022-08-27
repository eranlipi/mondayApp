import React from 'react'
import PatientsList from '../patients.json';

class Patient extends React.Component {
  
  collapsibleBtn(colId) {
    var coll = document.getElementById(colId);
    if (coll.style.display === "none") {
      coll.style.display = "block";
    } else {
      coll.style.display = "none";
      } 
  }


  updateItem (itemId,patient){
      let updateItemQuery = `mutation {create_update (item_id: "${itemId}", body: \"new body\") { id }}`;
    

      fetch ("https://api.monday.com/v2", {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE3Nzc5MzE0MCwidWlkIjozMzY4MzMzOCwiaWFkIjoiMjAyMi0wOC0yN1QyMDoxODo1NS4wODVaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTMyMzUwMzQsInJnbiI6InVzZTEifQ.7QtO_gMAaEf21B35BGcad5OQqot-POGYJhAgAuiB3r0'
        },
        body: JSON.stringify({
          'query' : updateItemQuery
        })
        })
        .then(res => res.json())
        .then(res => console.log(JSON.stringify(res, null, 2)));
  }

  createItem(patient){
      let createItemQuery = `mutation { create_item (board_id: 3150947562,  item_name: \"new Patient\") { id  }}`;
      fetch ("https://api.monday.com/v2", {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE3Nzc5MzE0MCwidWlkIjozMzY4MzMzOCwiaWFkIjoiMjAyMi0wOC0yN1QyMDoxODo1NS4wODVaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTMyMzUwMzQsInJnbiI6InVzZTEifQ.7QtO_gMAaEf21B35BGcad5OQqot-POGYJhAgAuiB3r0'
        },
        body: JSON.stringify({
          'query' : createItemQuery
        })
        })
        .then(res => res.json())
        .then(res => this.updateItem(JSON.stringify(res, null, 2), patient));
   }


  render() {

    return (
      <div className="square">
        {PatientsList.map(patient => {
          this.createItem(patient);
          return (
            <div key={patient._id}>
              <button  className='collapsible'  onClick={() => this.collapsibleBtn(patient._id)}>{patient.name}</button>
              <div id={patient._id} className="content">
                <div><b>Age: </b>{patient.age} </div>
                <div><b>gender: </b>{patient.gender} </div>
                <div><b>action: </b>{patient.action} </div>
                <div><b>Ddagnosis: </b>{patient.Ddagnosis} </div>
                <div><b>probability: </b>{patient.probability} </div>
              </div>
            </div>
          )
        })}
      </div>
    );

  }
}

export default Patient