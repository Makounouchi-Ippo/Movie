import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';
import { useHistory } from 'react-router-dom';
import './ShoppingCart.css';
import axios from 'axios';

import Articles from './Articles/Articles';
import Paiement from './Paiment/Paiement';

const ShoppingCart = () => {
    const movies = useSelector(state => state.cart.cart);
    const total = useSelector(state => state.cart.total);
    const qte = useSelector(state => state.cart.qte);
    const history = useHistory();
    const dispatch = useDispatch();
    const resetCart = () => { dispatch(actions.resetCart()) };
    const getTotals = () => { dispatch(actions.getTotals()) };
    const [orderUser, setOrderUser] = useState([]);
    const [cbCompleted, setCbCompleted] = useState(null);
    const [infoUser, setInfoUser] = useState(null);
    const [mail, setMail] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        localStorage.removeItem('spinner');
        axios.get(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/CarteBleu.json/`)
            .then(response => {setCbCompleted(response.data.number)})
            .catch(err => {})
        axios.get(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/user.json/`)
            .then(response => {setInfoUser(response.data.name) })
            .catch(err => {})
        axios.get(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/mail.json/`)
            .then(response => {
                setMail(response.data.mail)
                //console.log(response)
            })
            .catch(err => {
                setMail(localStorage.getItem('email'))
            })
        axios.get(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/Order.json/`)
            .then(res => {res.data === null ? setOrderUser([]) : setOrderUser(res.data)})
            .catch(err => {})
    }, [])

    useEffect(() => {
        getTotals();
    })

    const handleSubmit = () => {
        if (infoUser && cbCompleted) {
            let films = JSON.parse(localStorage.getItem('Panier'));
            let total = JSON.parse(localStorage.getItem("total"));
            let qte = JSON.parse(localStorage.getItem("qte"));
            let day = new Date().getDate();
            let month = new Date().getMonth() + 1;
            let years = new Date().getFullYear();
            let date = day + '/' + month + '/' + years;
            let numberOrder = localStorage.getItem('id').substr(0, 10).toUpperCase() + (orderUser.length);
            let tab = { films, total, qte , date, numberOrder};
            let newOrder;
            orderUser === null ? newOrder = [] : newOrder = orderUser;
            newOrder.push(tab)
            axios.put(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/Order.json/`,newOrder)
            .then(response => {
                localStorage.setItem('commandeSuccess', true);
                localStorage.setItem('numOrder', orderUser.length - 1);
                localStorage.removeItem('qte');
                localStorage.removeItem('total');
                localStorage.removeItem('Panier');
                resetCart();
                history.push('/confirmorder');
            }) 
            .catch(err => {})
            const templateId = 'template_dfxnj1e';
            sendFeedback(templateId, {message_html: 'message_html', from_name: infoUser, reply_to: mail});
        }
        else    
            setShowModal(true);
    }


    const sendFeedback = (templateId, variables) => {
        console.log(variables)
        window.emailjs.send('user_sPd6aG1e3xdkcQxMwXU', templateId,variables)
        .then(res => {})
        .catch(err => {})
    }
      
    return (
        <div className="PageCart">
            <div className="Cart">
               <Articles movies={movies}/>
               <Paiement qte={qte} total={total} submit={handleSubmit} show={showModal}/>
            </div> 
        </div>
    )
}

export default ShoppingCart;