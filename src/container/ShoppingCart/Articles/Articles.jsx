import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RiArrowLeftSFill, RiArrowRightSFill } from 'react-icons/ri';
import * as actions from '../../../store/actions/index';

const Articles = ({movies}) => {
    const total = useSelector(state => state.cart.total);
    const qte = useSelector(state => state.cart.qte);
    const history = useHistory();
    const dispatch = useDispatch();
    const resetCart = () => { dispatch(actions.resetCart()) };
    const removeProduct = (id) => { dispatch(actions.removeToCart(id)) };
    const decrease = (id) => { dispatch(actions.decrease(id)) };
    const increase = (id) => { dispatch(actions.increase(id)) };

    let cart = (
        <>
            {movies.map(movie => (
                <li className="liMovieCart" key={movie.id}>
                    <img className="imgMovie" src={`https://image.tmdb.org/t/p/w500${movie.img}`} alt={movie.id} onClick={() => history.push(`/movie/${movie.id}`)}/>
                    <div className="infoMovie">
                        <p className='titleMovie'>{movie.title}</p>
                        <p className='pMovie'>Note {movie.note}/10</p>
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
        <ul className="GaucheCart" style={{padding:'0'}}>
            <h4 className="titlePanier">Panier</h4>
            <div style={{textAlign:'center'}}>
                <p className="window1100">{qte} Article{qte > 1 && <span>s</span>} | {total} €</p>
            </div>
            {cart} 
            {movies.length > 1 && <p className="buttonClear" onClick={resetCart}>Vider le Panier</p>}
        </ul>
    )
}

export default Articles;