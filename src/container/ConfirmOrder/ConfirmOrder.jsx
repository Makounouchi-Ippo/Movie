import React, { useEffect, useState } from 'react';


const ConfirmOrder = () => {
    
    useEffect (()  => {
        localStorage.removeItem('qte');
        localStorage.removeItem('Panier');
        localStorage.removeItem('total');
    }, [])

    return (
       <>
            <div>
                <p>rfrfrfrfrfrfrefrfrfrfrefrfrferfrf</p>
            </div>
       </>
    )
}

export default ConfirmOrder;