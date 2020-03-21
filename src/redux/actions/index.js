import axios from 'axios'

export function loading(bool) {
    return {
        type: 'LOADING',
        error: bool
    };
}

export function setStores(stores) {
    return {
        type: 'SET_STORES',
        stores
    };
}

export const getStores = () => {    

    return (dispatch) => {
        dispatch(loading(true))
        const options = {
            method: 'GET',
            url: 'https://rkg-api-602.herokuapp.com/api/stores'
        };
        axios(options)
            .then(function (response) {     
                dispatch(setStores(response))
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                dispatch(loading(false))
            })
    }
}