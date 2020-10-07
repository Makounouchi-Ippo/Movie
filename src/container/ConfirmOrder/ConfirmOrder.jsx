import React, { useEffect, useState } from 'react';
import Spinner from './Spinner/Spinner';
import DetailsCommand from './DetailsOrder/DetailsOrder';

const ConfirmOrder = () => {
    const [load,setLoad] = useState(true);

    useEffect(() => {
         console.log('useEffect')
        let timer;
        if (localStorage.getItem('spinner') === null){
             console.log('NUULL')
            timer = setTimeout(() => {
                setLoad(false)
                 console.log('TRUE')
                localStorage.setItem('spinner',true)
            }, 3000);
        }
        return (() => {
            clearTimeout(timer);
            localStorage.removeItem('commandeSuccess');
        }) 
    }, [])

    return <div className='PageCart'>{ load && localStorage.getItem('spinner') === null ? <Spinner /> : <DetailsCommand />}</div>
}
export default ConfirmOrder; 