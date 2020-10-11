import React, { useEffect, useState } from 'react';
import './Achat.css'
import {Card} from 'react-bootstrap'
import axios from 'axios';

const Achat = () => {
    const [orderUser, setOrderUser] = useState([]);
    useEffect(() => {
      axios.get(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/Order.json/`)
        .then(res => {
          res.data !== null && setOrderUser(res.data)
        })
        .catch(err => {})   
    },[])

    let order;
    if (orderUser.length === 0)
        order = <p style={{fontStyle: 'italic', color: 'black',marginTop:'60px'}}>Aucune commande.</p>

    else {
        order = orderUser.map((order, index) => (
            <div key={index} className='blockOrder'>
                <div className='blockTitre'>
                    <h4 style={{color: 'white', marginTop:'20px', marginLeft:'20px'}}>Commande nᵒ{order.numberOrder}</h4>
                </div>
                <div className='blockCarteAchat'>
                    <div className='blockCarte'>
                        {
                            order.films.map(movie => {
                                return (
                                        <Card.Img  key={movie.id} className='cardAchat'src={`https://image.tmdb.org/t/p/w500/${movie.img}`} alt={movie.title} />
                                    )
                                })
                        }
                    </div>
                </div>
            </div>)
        )
    }  
  
    return (
        <div className='Order'>   
            {order}
        </div>
    )
}

export default Achat;