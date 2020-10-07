import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DetailsOrder.css';

const ConfirmOrder = () => {
    const [adresse, setAdresse] = useState('');
    const [command, setCommand] = useState([]);
    const [total, setTotal] = useState('');
    const [numberOrder, setNumberOrder] = useState('');

    useEffect(() => {
        axios.get(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/Order.json/`)
        .then(res => {
            setNumberOrder(res.data[localStorage.getItem('numOrder')].numberOrder)
            setTotal(res.data[localStorage.getItem('numOrder')].total)
            setCommand(res.data[localStorage.getItem('numOrder')].films)
        })
        .catch(err => {})   
        axios.get(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/user.json/`)
            .then(response => {setAdresse(response.data.address) })
            .catch(err => console.log(err))  
    }, [])

    let recapCommande = (
        <ul className="GaucheCart" style={{padding:'0'}}>
            {command.map(movie => (
                <li className="liMovieCart" key={movie.id}>
                    <img className="imgMovie" style={{cursor:'inherit'}} src={`https://image.tmdb.org/t/p/w500${movie.img}`} alt={movie.id} />
                    <div className="infoMovie">
                        <p className='titleMovie'>{movie.title}</p>
                        <p className='pMovie'>Note {movie.note}/10</p>
                        <p className='pMovie'>Durée {movie.duree} min</p>
                        <div className="qteMovie">
                            <p className='pMovie'>Quantité </p>
                            <p className='pMovie'>{movie.qte}</p>
                        </div>
                    </div>
                    <div className="priceMovie">
                        <p className="price">{movie.price} €</p> 
                    </div>
                </li>))
            }
            <div className='totalPriceRecap'>
                <p className="totalPriceGauche">Total</p>
                <p className="totalPriceDroite">{total} €</p>
            </div>
        </ul>
    )

    return (
        <div className="blockDetailsOrder">
            <div style={{textAlign:'center'}}>
                <img alt="good" src='https://www.welovebuzz.com/wp-content/uploads/2019/11/giphy-5-8.gif' style={{borderRadius:'50%', marginTop:'50px'}}/>
            </div>
            <h1 className="h1DetailsOrder">Merci, nous avons reçu votre commande <br/>nᵒ {numberOrder}.</h1>
            <div style={{textAlign:'center'}}>
                <p>Veuilez consulter votre messagerie pour obtenir la confirmation de commande.</p>
                <p>Vous avez dorenavant la possibilite d'acceder a vos films dans votre espace perso.</p>
                <p>Facture livrer à l'adresse suivante : {adresse}.</p>
            </div>
            <h4 className="h4DetailsOrder">Recapitulatif des films de votre commande :</h4>
            <div style={{display:'flex', justifyContent:'center'}}>
                {recapCommande}
            </div>
        </div>
    )
}
export default ConfirmOrder; 