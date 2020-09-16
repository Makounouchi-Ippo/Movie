import React from 'react';
import {useSelector} from 'react-redux';
import { RiArrowLeftSFill, RiArrowRightSFill } from 'react-icons/ri';

import './ShoppingCart.css';

const ShoppingCart = () => {

    
const movies = useSelector(state => state.movie.movie)
    let cart = (
         <>
          
            {movies.map(movie => (
                
                <li className="liMovie" key={movie.id}>
                    <img className="imgMovie" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.id}
                       />
                    <div className="infoMovie">
                        <p className='titleMovie'>{movie.title}</p>
                        <p className='pMovie'>{movie.pays}</p>
                        <p className='pMovie'>Durée {movie.duree} min</p>
                        <div className="qteMovie">
                            <p className='pMovie'>Quantité </p>
                            <RiArrowLeftSFill className="qteIcon"  /> 
                            <p className='pMovie'>{movie.qte}</p>
                            <RiArrowRightSFill className="qteIcon"  />
                        </div>
                        <p className='deleteMovie' >Supprimer</p>
                    </div>
                    <div className="priceMovie">
                        <p className="price">{movie.price} €</p> 
                    </div>
                </li>))
            }
        </>  
    )

    if (movies.length === 0)
        cart = <p className="cartEmpty">Il n'y a aucun article dans votre panier.</p>
  
    return (
        <div className="PageCart">
            <div className="Cart">
           
            <ul className="GaucheCart" style={{padding:'0'}}>
                <h4 className="titlePanier">Panier</h4>
                {cart} 
                {movies.length > 1 && <p className="buttonClear" >Vider le Panier</p>}
            </ul>
            <div className="DroiteCart"> 
                <h4 className="titleRecap">Récapitulatif</h4>
                <div className="Recapitulatif">
                    <div className="rubriqueRecapitulatif">
                        <p className="infoGauche">Nombre d'articles</p>
                        <p className="infoDroite">0</p>
                    </div>
                    <div className="rubriqueRecapitulatif">
                        <p className="infoGauche">Date de prise en charge et d'expédition estimée</p>
                        <p className="infoDroite" style={{textDecoration:'line-through'}}> 0 € </p>
                    </div>
                    <p style={{textAlign:'center', fontStyle: 'italic'}}>Expedition offerte jusqu'au 31/12/2020</p>
                    <div className='totalPrice'>
                        <p className="totalPriceGauche">Total</p>
                        <p className="totalPriceDroite">0 €</p>
                    </div>
                </div>
                <div className='blockButtons'>
                    <button className="buttonPaiment" disabled>Paiement</button>
                </div>
            </div>

            </div> 
        </div>
    )
}

export default ShoppingCart;