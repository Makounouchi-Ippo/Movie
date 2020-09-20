import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RiArrowLeftSFill, RiArrowRightSFill } from 'react-icons/ri';
import { useHistory } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import './ShoppingCart.css';

const ShoppingCart = () => {
    
    const movies = useSelector(state => state.cart.cart);
    const total = useSelector(state => state.cart.total);
    const qte = useSelector(state => state.cart.qte);
    const history = useHistory();
    const dispatch = useDispatch();
    const resetCart = () => { dispatch(actions.resetCart()) };
    const removeProduct = (id) => { dispatch(actions.removeToCart(id)) };
    const decrease = (id) => { dispatch(actions.decrease(id)) };
    const increase = (id) => { dispatch(actions.increase(id)) };
    const getTotals = () => { dispatch(actions.getTotals())};

    useEffect(() => {
        getTotals();
    })

    let cart = (
         <>
            {movies.map(movie => (
                <li className="liMovie" key={movie.id}>
                    <img className="imgMovie" src={`https://image.tmdb.org/t/p/w500${movie.img}`} alt={movie.id}
                        onClick={() => history.push(`/movie/${movie.id}`)}/>
                    <div className="infoMovie">
                        <p className='titleMovie'>{movie.title} ({movie.pays})</p>
                        <p className='pMovie'>{movie.note}</p>
                        <p className='pMovie'>Durée {movie.duree} min</p>
                        <div className="qteMovie">
                            <p className='pMovie'>Quantité </p>
                            <RiArrowLeftSFill className="qteIcon" onClick={() => movie.qte === 1 ? removeProduct(movie.id) : decrease(movie.id)} /> 
                            <p className='pMovie'>{movie.qte}</p>
                            <RiArrowRightSFill className="qteIcon" onClick={() => increase(movie.id)} />
                        </div>
                        <p className='deleteMovie' onClick={() => removeProduct(movie.id)}>Supprimer</p>
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
                {movies.length > 1 && <p className="buttonClear" onClick={resetCart}>Vider le Panier</p>}
            </ul>
            <div className="DroiteCart"> 
                <h4 className="titleRecap">Récapitulatif</h4>
                <div className="Recapitulatif">
                    <div className="rubriqueRecapitulatif">
                        <p className="infoGauche">Nombre d'articles</p>
                        <p className="infoDroite">{qte}</p>
                    </div>
                    <div className="rubriqueRecapitulatif">
                        <p className="infoGauche">Date de prise en charge et d'expédition estimée</p>
                        <p className="infoDroite" style={{textDecoration:'line-through'}}> 0 € </p>
                    </div>
                    <p style={{textAlign:'center', fontStyle: 'italic'}}>Expedition offerte jusqu'au 31/12/2020</p>
                    <div className='totalPrice'>
                        <p className="totalPriceGauche">Total</p>
                        <p className="totalPriceDroite">{total} €</p>
                    </div>
                </div>
                <div className='blockButtons'>
                    <button className="buttonPaiment" disabled={qte === 0 ? true : false }>Paiement</button>
                </div>
            </div>

            </div> 
        </div>
    )
}

export default ShoppingCart;