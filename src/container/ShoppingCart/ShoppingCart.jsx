import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RiArrowLeftSFill, RiArrowRightSFill } from 'react-icons/ri';
import { useHistory,Link } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import {Modal} from 'react-bootstrap'
import './ShoppingCart.css';
import axios from 'axios'

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
    const [orderUser, setOrderUser] = useState([]);
    const [show, setShow] = useState(false);
    const [number,setNumber] = useState(null)
    const [name,setName] = useState(null)
    useEffect(() => {
        axios.get(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/Order.json/`)
        .then(res =>setOrderUser(res.data))
        .catch(err => console.log(err))
        axios.get(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/CarteBleu.json/`)
       .then(response => {setNumber(response.data.number)})
       .catch(err => {})    
       axios.get(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/user.json/`)
       .then(response => {setName(response.data.name) })
       .catch(err => {})  
    }, [])

    useEffect(() => {
       getTotals();
    })

   const handleSubmit = () => {
    if (number && name){
    let films = JSON.parse(localStorage.getItem('Panier'))
    let total = JSON.parse(localStorage.getItem("total"))
    let qte = JSON.parse(localStorage.getItem("qte"))
    let tab = { films, total, qte };
    let newOrder;
    orderUser === null ? newOrder = [] : newOrder = orderUser;
    newOrder.push(tab)
    axios.put(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/Order.json/`,newOrder)
    .then(response => {
        resetCart();
        localStorage.removeItem('qte');
        localStorage.removeItem('Panier');
        localStorage.removeItem('total');
        localStorage.setItem('numOrder', Math.floor(Math.random() * Math.floor(1000000)))
        localStorage.setItem('commandeSuccess', true);
        history.push('/confirmorder')
         //console.log('userrr//////',response.data)
    })
    .catch(err => {
         console.log('DIDMOUNT',err)
    })
     
    const templateId = 'template_dfxnj1e';
    sendFeedback(templateId, {message_html: 'this.state.feedback', from_name: 'this.state.name', reply_to: 'mehdielkaddouri@gmail.com'})
    }
    else 
       setShow(true);
    }

    const sendFeedback = (templateId, variables) => {
        window.emailjs.send(
          'user_sPd6aG1e3xdkcQxMwXU', templateId,
          variables
          ).then(res => {
            console.log('Email successfully sent!')
          })
          .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
      }

    let modal; 

    if (show === true){
        modal = (
            <div data-aos="zoom-in" data-aos-duration='2000' className='modal2'>
                <Modal.Dialog  className='modalShopping'style={{backgroundColor:'black',color:'white',borderRadius:'10px'}}>
                    <Modal.Header style={{backgroundColor:'black',color:'white'}}>
                        <Modal.Title > Informations manquantes ! </Modal.Title>
                    </Modal.Header>    
                    <Modal.Body style={{backgroundColor:'black',color:'white'}}>
                        <p>Vous devez completer vous information personnel dans votre profil avant de pouvoir profitez de nos services :)</p>
                        <p>Cliquez sur le lien ci-dessous vous serez dirigez vers votre page de profil </p>
                        <Link to='/compte/InfoPerso'style={{display:'flex',justifyContent:'center'}}> Mon Profil </Link>
                    </Modal.Body>  
                </Modal.Dialog>
            </div>
            )
    }

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
                </li>)  
                )
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
            {modal}
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
                    <button className="buttonPaiment" disabled={qte === 0 ? true : false } onClick={()=>handleSubmit()}>Paiement</button>
                </div>
            </div>
            </div> 
        </div>
    )
}

export default ShoppingCart;