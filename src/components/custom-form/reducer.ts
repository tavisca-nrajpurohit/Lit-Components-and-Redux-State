import { customFormState } from './custom-form-state';
//import {} from './actions';

const initialState: customFormState = {
        isSubmitted : false
};

export const reducer = (propPath) => (state = initialState, action)=>{
    switch(action.type){
        default:
            return state;
    };
}