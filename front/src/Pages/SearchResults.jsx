import {Center} from '../components/Formatting/StyledComponents'
import {useEffect, useState} from 'react';
import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export const SearchResults= () => {
    
    // creating my objects to retrieve the flight information
    const [flight, setFlights] = useState([]);
    const navigate = useNavigate();
    


    useEffect(() => { axios.get(`http://localhost:8086/flight${flight}`).then(res => setFlights(res.data));}); // attempting to get the flight data 

    const findFlight = async (flightNumber) => {
        try{

            await axios.delete(`http://localhost:8086/flight/${flight}`);
            navigate('./', {replace:true});        
        }catch(err){
            console.log(err);
        }
    }

    return(
        <Center>
            <div class="container">
            {/* Transforming the flights araay into an array of JSX elements for display and formatting */}
            {flight.map((flight, index) => {
                return(
                    <form class="FlightForm" onSubmit= {(event) => { event.preventDefault(); findFlight(flight.flightNumber)}}>
                        <div key={flight._id} >
                            
                            <div><strong>Flight ID: </strong>{flight.flightNumber}</div> 
                            <div><strong>Departure City: </strong>{flight.depCity}</div>
                            <div><strong>Departure Time: </strong>{flight.depTime}</div>
                            <div><strong>Departure Date: </strong>{flight.depDate}</div>
                            <div><strong>Arrival City: </strong>{flight.arrCity}</div>
                            <div><strong>Arrival Time: </strong>{flight.arrTime}</div>
                            <div><strong>Arrival Date: </strong>{flight.arrDate}</div>
                            <div><strong>Passengers: </strong>{flight.currPass}</div>
                            <div><strong>Max Seats: </strong>{flight.maxPass}</div>
                            <input type="submit" value="Delete Flight" />
                        </div>
                    </form>
                )
            })}
           </div>
        </Center>
    );
}