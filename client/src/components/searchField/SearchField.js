import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getProductList} from '../../store/actions/projectActions';
import './searchField.css';
import classnames from 'classnames';

const gramPerKilo = 1000;

class SearchField extends Component {
    state = {
        ageFromyy: '',
        ageFrommm: '',
        ageFromdd: '',
        ageToyy: '',
        ageTomm: '',
        ageTodd: '',
        weightFrom: '',
        weightTo: '',
        location: '',
        breed: '',
        pageNumber: 1,
    };

    handleChange = e => {
        this.setState({[e.target.id]: e.target.value});
    };

    handleSubmit = e => {
        e.preventDefault();
        const {
            ageFromyy,
            ageFrommm,
            ageFromdd,
            ageToyy,
            ageTomm,
            ageTodd,
            weightFrom,
            weightTo,
            location,
            breed,
            pageNumber,
        } = this.state;

        const currentDate = new Date();
        const ageFrom =
            ageFromyy || ageFrommm || ageFromdd
                ? new Date(
                      currentDate.getFullYear() - ageFromyy,
                      currentDate.getMonth() - ageFrommm,
                      currentDate.getDate() - ageFromdd,
                  )
                : '';
        const ageTo =
            ageToyy || ageTomm || ageTodd
                ? new Date(
                      currentDate.getFullYear() - ageToyy,
                      currentDate.getMonth() - ageTomm,
                      currentDate.getDate() - ageTodd,
                  )
                : '';

        this.props.getProductList(
            ageFrom,
            ageTo,
            weightFrom ? weightFrom * gramPerKilo : '',
            weightTo ? weightTo * gramPerKilo : '',
            location,
            breed,
            pageNumber,
        );
    };
    render() {
        const {productLIst} = this.props;
        return (
            <form
                id='searchBar'
                className={classnames(
                    productLIst.length === 0 ? 'searchBarMargin' : '',
                )}
                onSubmit={this.handleSubmit}
            >
                <div>
                    <h5>Age</h5>
                    <div className='age'>
                        <p>From</p>
                        <div className='ageInput'>
                            <input
                                type='number'
                                className='ageInputChild'
                                id='ageFromyy'
                                placeholder='Year'
                                onChange={this.handleChange}
                            />
                            <input
                                type='number'
                                className='ageInputChild'
                                id='ageFrommm'
                                placeholder='Month'
                                onChange={this.handleChange}
                            />
                            <input
                                type='number'
                                className='ageInputChild'
                                id='ageFromdd'
                                placeholder='Day'
                                onChange={this.handleChange}
                            />
                        </div>

                        <p>To</p>
                        <div className='ageInput'>
                            <input
                                type='number'
                                className='ageInputChild'
                                id='ageToyy'
                                placeholder='Year'
                                onChange={this.handleChange}
                            />
                            <input
                                type='number'
                                className='ageInputChild'
                                id='ageTomm'
                                placeholder='Month'
                                onChange={this.handleChange}
                            />
                            <input
                                type='number'
                                className='ageInputChild'
                                id='ageTodd'
                                placeholder='Day'
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <h5>Weight</h5>
                    <div className='weight'>
                        <label htmlFor='weightfrom'>From</label>
                        <input
                            type='number'
                            className='form-control m-auto'
                            id='weightFrom'
                            onChange={this.handleChange}
                            placeholder='Weights in kg'
                        />

                        <label htmlFor='weightTo'>To</label>
                        <input
                            type='number'
                            className='form-control m-auto'
                            id='weightTo'
                            onChange={this.handleChange}
                            placeholder='Weights in kg'
                        />
                    </div>
                </div>
                <div>
                    <h5>
                        <label htmlFor='location'>Location</label>
                    </h5>
                    <input
                        type='text'
                        className='form-control m-auto'
                        id='location'
                        onChange={this.handleChange}
                        placeholder='E.g Belgrade'
                    />
                </div>
                <div>
                    <h5>
                        <label htmlFor='breed'>Breed</label>
                    </h5>
                    <input
                        type='text'
                        className='form-control m-auto'
                        id='breed'
                        onChange={this.handleChange}
                        placeholder='E.g Angus'
                    />
                </div>
                <button className='btn searchButton' type='submit'>
                    Search
                </button>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        productLIst: state.project.productsList,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProductList: (
            ageFrom,
            ageTo,
            weightFrom,
            weightTo,
            location,
            breed,
            pageNumber,
        ) =>
            dispatch(
                getProductList(
                    ageFrom,
                    ageTo,
                    weightFrom,
                    weightTo,
                    location,
                    breed,
                    pageNumber,
                ),
            ),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchField);
