import React from 'react';
import ReactDOM from 'react-dom/client';
import {UserCard} from './brycejen_Activity13_Modules_Components_Props_UserCard.js'
/*
    Author: Bryce Jensenius
    ISU Netid: brycejen@iastate.edu
    Date: September 4th, 2024
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    Author: Bryce Jensenius<br/>
    ISU NetId: brycejen@iastate.edu<br/>
    Date: 10/18/2024

    <UserCard
      picture=" https://freepngimg.com/thumb/mark_zuckerberg/70496-states-united-executive-world's-mark-zuckerberg-chief-thumb.png"
      name="Mark Zuckerberg"
      amount={3000}
      married={true}
      points={[100, 101.1, 202, 2]}
      address={{ street: "123 Bellmont Rd.", city: "Ames", state: "Iowa" }}
    />

    <UserCard
      picture="https://freepngimg.com/thumb/bill_gates/170351-gates-bill-face-hq-image-free.png"
      name="Bill Gates"
      amount={3500}
      married={true}
      points={[1, 2, 3, 4]}
      address={{ street: "5010 Av Some", city: "Tempe", state: "AZ" }}
    />
  </div>
);