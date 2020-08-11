 {/* <div className={classes.images} >
                  {loading ? <Spinner text='Chargement de votre film veuillez patientez !'/> : null}
                  <img className={classes.img} style={{width:'75%'}}src={`https://image.tmdb.org/t/p/original/${moviedetail.backdrop_path}`} alt={moviedetail.id}/>
                  <FontAwesomeIcon className={classes.buttonPlay} style ={{position:'absolute',color:'gold',height:'100px',width:'100px',top:'38%'}} icon={faPlayCircle} />
                </div> */}
             

                <div className={classes.container}>
                <img className={classes.image} src={`https://image.tmdb.org/t/p/original/${moviedetail.backdrop_path}`} alt={moviedetail.id}/>
                <div className={classes.overlay}>
                  <div className={classes.icon}>
                    <FontAwesomeIcon icon={faPlayCircle} />
                  </div>
                </div>
              </div>