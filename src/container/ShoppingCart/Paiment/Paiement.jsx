import React from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Paiement = ({qte, total, submit, show}) => {
    let modal;
    if (show === true){
        modal = (
            <div data-aos="zoom-in" data-aos-duration='2000' className='modal2'>
            <Modal.Dialog  className='modalShopping'style={{backgroundColor:'black',color:'white',borderRadius:'10px'}}>
                <Modal.Header style={{backgroundColor:'black',color:'white'}}>
                    <Modal.Title > Informations manquantes </Modal.Title>
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
    return (
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
            <div className='blockButtonCart'>
                <button className="buttonPaiment" disabled={qte === 0 ? true : false } onClick={submit}>Paiement</button>
            </div>
        </div>
    )
}


export default Paiement;