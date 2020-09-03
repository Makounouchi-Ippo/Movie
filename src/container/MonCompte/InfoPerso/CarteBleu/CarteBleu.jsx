import React from 'react'
import classes from './CarteBleu.css'
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';




const CarteBleu = () => {
    return (
        <div className={classes.blockImage1}>
             <div className={classes.TitreContainer}>
                <h2 className={classes.titreInContainer}> Carte Bleue </h2>   
                <Cards
                        cvc={'this.state.cvc'}
                        expiry={'this.state.expiry'}
                        focused={'this.state.focus'}
                        name={'this.state.name'}
                        number={'this.state.number'}
                />         
            </div>
        </div>
    )
}

export default CarteBleu;