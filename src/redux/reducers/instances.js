export function instancesError(state = false, action) {
    switch (action.type) {
        case 'INSTANCES_ERROR':
            return action.error;
        default:
            return state;
    }
}
export function instancesLoading(state = false, action) {
    switch (action.type) {
        case 'LOADING':
            return action.loading;
        default:
            return state;
    }
}
