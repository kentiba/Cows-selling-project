import {
    SUBMIT_REQUEST,
    GET_PRODUCT_LIST,
    ADD_TO_CART,
    GET_CHECKOUT_LIST,
    REMOVE_PRODUCT,
    GET_ERRORS,
    GET_ORDERS_LIST,
    GET_CLIENTS_LIST,
    POST_LOADING,
    SUBMIT_MESSAGE,
} from './actionTypes';
import axios from 'axios';

// to get the list of products

export const getProductList = (
    ageFrom,
    ageTo,
    weightFrom,
    weightTo,
    location,
    breed,
    pageNumber,
) => dispatch => {
    axios
        .get('/products', {
            params: {
                ageFrom,
                ageTo,
                weightFrom,
                weightTo,
                location,
                breed,
                pageNumber,
            },
        })
        .then(res =>
            dispatch({
                type: GET_PRODUCT_LIST,
                payload: {
                    data: res.data.data,
                    currentPage: res.data.currentPage,
                    lastPage: res.data.lastPage,
                    hasNextPage: res.data.hasNextPage,
                    hasPreviousPage: res.data.hasPreviousPage,
                    nextPage: res.data.nextPage,
                    previousPage: res.data.previousPage,
                    firstPageBox: res.data.firstPageBox,
                    lastPageBox: res.data.lastPageBox,
                    ageFrom: res.data.ageFrom,
                    ageTo: res.data.ageTo,
                    weightFrom: res.data.weightFrom,
                    weightTo: res.data.weightTo,
                    location: res.data.location,
                    breed: res.data.breed,
                },
            }),
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

//to get the list of checkout products
export const getCheckoutList = () => dispatch => {
    dispatch({
        type: GET_CHECKOUT_LIST,
    });
};

// to update a certain product
export const updateProduct = (product, history) => dispatch => {
    axios
        .put('/products', product)
        .then(() => history.push('/'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

// to delete a certain product
export const deleteProduct = (id, history) => dispatch => {
    axios
        .delete('/products', {
            data: {id},
        })
        .then(() => history.push('/'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

// to create a new product
export const createProduct = (product, history) => dispatch => {
    axios
        .post('/products', product)
        .then(() => {
            window.location.reload(true);
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

// to add product to the cart
export const addToCart = product => dispatch => {
    dispatch({
        type: ADD_TO_CART,
        payload: product,
    });
};
// to remove a product from the cart
export const removeProduct = id => dispatch => {
    dispatch({
        type: REMOVE_PRODUCT,
        payload: id,
    });
};

//to submit an order request
//&&
//to remove all the products from the checkoutlist after submitting the order

export const submitRequest = (info, history) => dispatch => {
    dispatch(setPostLoading());
    axios
        .post('/orders', info)
        .then(() => {
            dispatch({
                type: SUBMIT_REQUEST,
            });
            history.push('/sent');
            window.location.reload(true);
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

// to get the list of orders
export const getOrdersList = () => dispatch => {
    axios
        .get('/orders')
        .then(res =>
            dispatch({
                type: GET_ORDERS_LIST,
                payload: res.data.data,
            }),
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

// to get the list of clients
export const getClientsList = () => dispatch => {
    axios
        .get('/clients')
        .then(res =>
            dispatch({
                type: GET_CLIENTS_LIST,
                payload: res.data.data,
            }),
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

//Submit a message from the user

export const submitMessage = info => dispatch => {
    dispatch(setPostLoading());
    axios
        .post('/messages', info)
        .then(() => {
            dispatch({
                type: SUBMIT_MESSAGE,
            });
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

// Set loading state
export const setPostLoading = () => {
    return {
        type: POST_LOADING,
    };
};
