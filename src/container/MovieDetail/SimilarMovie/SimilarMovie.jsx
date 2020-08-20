import React from 'react';
import Coverflow from 'react-coverflow';
import photo from '../../../assets/images/film.jpg'


const SimilarMovie = (props) => {

   
  

      return (
      <div style={{width:'69%',margin:'auto',marginTop:'20px',paddingBottom:'15px',height:'600px',marginBottom:'15px'}} >
          <h5 style={{color:'white'}}> Films similaires: </h5>
        <Coverflow width="300" height="400"
            displayQuantityOfSide={3}
            navigation={false}
            enableScroll={true}
            clickable={true}
            active={2}
            infiniteScroll={true}>
                 <img
        src={photo}
        alt='title or description'
        style={{
          display: 'block',
          width: '100%',
        }}
      />
            <img src={photo} alt='title or description' />
            <img src={photo} alt='title or description' />
            <img src={photo} alt='title or description'/>
            <img src={photo} alt='title or description' />
            <img src={photo} alt='title or description' />
            <img src={photo} alt='title or description' />
            <img src={photo} alt='title or description' />
            <img src={photo} alt='title or description' />

        </Coverflow>
      
      </div>
          )
  }
  
  export default (SimilarMovie);