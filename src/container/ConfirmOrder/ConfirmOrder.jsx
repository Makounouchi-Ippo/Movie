import React,{useEffect,useState} from 'react';
import {Spinner} from 'react-bootstrap'
import './ConfirmOrder.css'

const ConfirmOrder = () => {
    const [load,setLoad] = useState(true);

    let order = 'FUWTS' + localStorage.getItem('numOrder');
    useEffect(() => {
    if (localStorage.getItem('spinner') === null){
        const timer = setTimeout(() => {
            // console.log('This will run after 1 second!')
            setLoad(false)
            localStorage.setItem('spinner',true)
          }, 5000);
          return () => clearTimeout(timer);}
     },[]);

    let show;
    console.log('rrrrrr---->',load)
    show = load === true && localStorage.getItem('spinner')=== null ?
        <div style={{height:'100vh'}}>
            <div className='SpinnerShop'>  
                <Spinner animation="border" style={{height:'200px',width:'200px'}}/>
                <p style={{marginTop:'30px'}}> Veuillez patient , paiment en cours</p>
            </div> 
        </div>
        : <div style={{height:'100vh', width:'50%', margin:'auto'}}>
            <div style={{textAlign:'center'}}>
                <img src='https://www.welovebuzz.com/wp-content/uploads/2019/11/giphy-5-8.gif' style={{borderRadius:'50%',marginTop:'50px'}}/>
            </div> 
            <h1 style={{marginTop:'50px', textAlign:'center'}}>Merci, nous avons reçu votre commande <br/>nᵒ {order}</h1>
            <p >Veuilez consulter votre messagerie pour obtenir la confirmation de commande, ainsi que tout les details correspond a votre achat.</p> 
            <p>Vous avez dorenavant la possibilite d'acceder a vos films dans votre espace perso.</p>
            <p>Facture livrer au (adresse client).</p>
        </div>

    return (
    <div style={{backgroundColor:'grey'}}>
       {show}
    </div>
    
    )
}
export default ConfirmOrder;