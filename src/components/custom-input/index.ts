import { connect } from 'pwa-helpers/connect-mixin';
import {store} from './../../store/store';
import {LitElement, html, customElement, property} from 'lit-element';
import {ACTION_CUSTOM_INPUT_NOT_FOCUSSED,ACTION_CUSTOM_INPUT_VALUE_CHANGED,ACTION_CUSTOM_INPUT_IS_FOCUSSED} from './actions';
import {get} from '@rakoon-badshah/dynamic-redux';
import {reducer as customReducer} from './reducer';
import {customInputState} from './custom-input-state';

export class CustomInput extends connect(store)(LitElement) {

  @property({type : String})  label = 'Default Label';
  @property({type : String})  propPath = 'app';
  @property({type : String})  value = '';
  localState:customInputState = {
    value: "",
    isTouched: false,
    hasFocus: false
};
  
  render(){
    store.attachReducers({ [this.propPath]:customReducer(this.propPath)});

    return html`
    <link rel="stylesheet" href="./custom-input.css">
    <div class="customInput">
    <label>${this.label}</label>
    <input
        type="text" 
        placeholder="${this.label}"
        required 
        name="${this.propPath}"
        @focusin = "${this.CustomInputIsFocussed}"
        @focusout = "${this.CustomInputIsNotFocussed}"
        @keyup = "${this.CustomInputValueChanged}"
     >
      </div>
    `;
  }

  CustomInputIsFocussed(){
    store.dispatch(ACTION_CUSTOM_INPUT_IS_FOCUSSED(this.propPath));
  }
  CustomInputIsNotFocussed(){
    store.dispatch(ACTION_CUSTOM_INPUT_NOT_FOCUSSED(this.propPath));
  }
  CustomInputValueChanged(e){
    store.dispatch(ACTION_CUSTOM_INPUT_VALUE_CHANGED(this.propPath,e.target.value));
  }

  stateChanged(state){
    (this.localState as customInputState) = get(state,this.propPath);
    this.value = this.localState?this.localState.value:"";
  }
}
customElements.define('custom-input', CustomInput);
