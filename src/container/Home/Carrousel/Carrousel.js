import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import '../Home.css'




class DemoCarousel extends Component {
  render() {
    
      return (
  
            <Carousel indicators={false}  controls={false} style={{width:'100%',height:'500px',margin:'auto'}}>

              <Carousel.Item style={{ height:'520px'}}>
              <Carousel.Caption style={{top:'0',right:'0px'}}>
                  <h3  className='font' style={{fontWeight:'bold'}}>Films en exclusivite mondial </h3>
                </Carousel.Caption>
                <img style={{ height:'520px'}}
                  className="d-block w-100"
                  src="https://images3.alphacoders.com/837/thumb-1920-837671.jpg"
                  alt="Third slide"
                />

                
              </Carousel.Item>

              <Carousel.Item style={{ height:'520px'}}>
                <img style={{ height:'520px'}}
                  className="d-block w-100"
                  src="https://wallpapermemory.com/uploads/505/itachi-uchiha-background-hd-1920x1200-396200.jpg"
                  alt="First slide"
                />
                <Carousel.Caption style={{top:'0',right:'0px'}}>
                  <h3 style={{fontWeight:'bold'}} className='font'>Profiter des meilleur dessins animé et manga </h3>
                </Carousel.Caption>
              </Carousel.Item>



              <Carousel.Item style={{ height:'520px',right:'0px'}} >
                <img style={{ height:'520px'}}
                  className="d-block w-100"
                  src="https://images3.alphacoders.com/837/thumb-1920-837671.jpg"
                  alt="Third slide"
                />

                <Carousel.Caption style={{top:'0',right:'-20'}}>
                  <h3  className='font'style={{fontWeight:'bold'}}>Toute les derniere series  en exclu</h3>
              
                </Carousel.Caption>
              </Carousel.Item>

              </Carousel>
          
      );
  }
};

export default DemoCarousel;