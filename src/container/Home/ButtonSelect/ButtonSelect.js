import React, {Component} from 'react';
import Select from 'react-select';
//import classes from './Button.css'

const Genre = [
    { value: '28', label: 'Action'},
    { value: '16', label: 'Animation'},
    { value: '12', label: 'Aventure' },
    { value: '35', label: 'Comédie' },
    { value: '80', label: 'Crime' },
    { value: '99', label: 'Documentaire' },
    { value: '18', label: 'Drame' },
    { value: '10751', label: 'Familial' },
    { value: '14', label: 'Fantastique' },
    { value: '36', label: 'Histoire' },
    { value: '27', label: 'Horreur' },
    { value: '10402', label: 'Musique' },
    { value: '9648', label: 'Mystére'},
    { value: '10749', label: 'Romance' },
    { value: '878', label: 'Science-fiction' },
    { value: '10770', label: 'Téléfilm' },
    { value: '53', label: 'Thriller' },
    { value: '10752', label: 'Guerre' },
    { value: '37', label: 'Western'},
  ];
  const SortBy = [
    { value: 'popularity.desc', label: 'Popularité descendante' },
    { value: 'popularity.asc', label: 'Popularité ascendante' },
    { value: 'vote_average.desc', label: 'Note descendante'},
    { value: 'vote_average.asc', label: 'Note ascendante' },
  ];
  const Years = [];
    for (let i = 1960; i <= 2020; i++)
      Years.push({ value: i, label: i });




export default class ButtonSelect extends Component{

    state={
        selectedOption: null,
        Genre: []
    }


    handleInput = (e) => {
        console.log(e)
        // this.setState({selectedOption:e.target.value}, ()=>{
        //     console.log('state',this.state.selectedOption)
        // })
    }


    render() {
        return (

            <div style={{marginTop:'50px'}}> 
                <div className="row d-flex justify-content-center"  autoFocus={true}>
                    <div className="col-sm-2">
                    <Select options={Genre} 
                        isSearchable={false}
                        onSelect={(e)=>this.handleInput(e)}
                    />
                    </div> 
                    {/* <div className="col-sm-2">
                        <Select options={Countries} />
                    </div> 
                    <div className="col-sm-2">
                        <Select options={Countries} />
                    </div> 
                    <div className="col-sm-2">
                        <Select options={Countries} />
                    </div> */}
                </div>
                <p> recherche en cours....</p>
          </div>

        )

    }












}