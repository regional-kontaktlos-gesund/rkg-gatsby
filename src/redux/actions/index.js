import axios from 'axios'

export function instancesError(bool) {
    return {
        type: 'INSTANCES_ERROR',
        error: bool
    };
}
export function instancesLoading(bool) {
    return {
        type: 'INSTANCES_LOADING',
        loading: bool
    };
}

export function stores(stores) {
    return {
        type: 'SET_INSTANCE',
        stores
    };
}

export const getStores = () => {    

    return (dispatch) => {
        dispatch(loading(true))
        const options = {
            method: 'GET',
            url: 'api'
        };
        axios(options)
            .then(function (response) {     
                console.log(response);
                dispatch(stores(false))
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                dispatch(loading(false))
            })
    }
}