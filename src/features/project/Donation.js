import React from 'react'
import { useParams } from 'react-router-dom';

function Donation() {
    const { userId } = useParams();
    console.log("user", userId); 
  return (
    <div>Donation</div>
  )
}

export default Donation;