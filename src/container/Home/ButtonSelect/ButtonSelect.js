import React, {Component} from 'react';
import Select from 'react-select';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index'
import './ButtonSelect.css'

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
    for (let i = 1950; i <= 2020; i++)
       Years.push({ value: i, label: i });


class ButtonSelect extends Component{

    state={
        selectedOption: {
            Genre: {value: null, label: 'Genre'}, 
            Years: {value: null , label:'Years'},
            SortBy: {value: null, label: 'SortBy'}
        }
    }

    componentDidMount () {
        this.setState({selectedOption : this.props.selectedOption})
        
    }

    componentDidUpdate (prevProps) {
        if (this.props.inputValue !== prevProps.inputValue)
            {this.setState({selectedOption:{ Genre: {value: null, label: 'Genre'}, Years: {value: null , label: 'Years'},SortBy: {value: null, label: 'SortBy'}}})}}


    handleInput = (value,id) => {
        let copy = {...this.state.selectedOption}
        copy[id] = value 
       this.setState({selectedOption:copy}, () => {
           
        this.props.clearMovie();
        this.props.pageInitial()
           this.props.movieFiltres(this.state.selectedOption)
       }) 
    }

  

    render() {

        let text;
        
        if (this.state.selectedOption.Genre.value !==null || this.state.selectedOption.SortBy.value !==null  || this.state.selectedOption.Years.value !==null ){
            text =(<button onClick={()=>window.location.reload(false)}> X </button>)
        }

        return (
            <div style={{marginTop:'50px'}}> 
                <div className='blockButtonSelect'>
                    <div style={{width:'230px', margin:'20px'}}>
                        <Select options={Genre} 
                            isSearchable={false}
                            placeholder='Genre'
                            value={this.state.selectedOption.Genre}
                            onChange={(value) => this.handleInput(value, 'Genre')}
                        />
                    </div> 
                    <div style={{width:'230px', margin:'20px'}}>
                        <Select options={SortBy} 
                            isSearchable={false}
                            placeholder='Trier par'
                            value={this.state.selectedOption.SortBy}
                            onChange={(value) => this.handleInput(value, 'SortBy')}
                        />
                    </div> 
                    <div style={{width:'230px', margin:'20px'}}>
                        <Select options={Years} 
                            isSearchable={false}
                            placeholder='Annees'
                            value={this.state.selectedOption.Years}
                            onChange={(value) => this.handleInput(value, 'Years')}
                        />
                    </div>
                    <div className='blockButtonSelect'>
                       {text}
                    </div>
                </div>
               
          </div>

        )

    }
}

const mapStateToProps = state => {
    return {
        inputValue: state.movie.inputValue,
        selectedOption: state.movie.selectedOption
    };
  };


const mapDispatchToProps = dispatch => {
    return {
      movieFiltres: (value) => dispatch(actions.movieFiltres(value)), 
      clearMovie: () => dispatch(actions.clearMovie()),
      pageInitial:() =>  dispatch(actions.pageInitial()),
    };
  };
  

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (ButtonSelect));
