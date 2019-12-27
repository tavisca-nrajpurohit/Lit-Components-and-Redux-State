import './../custom-input';
import { connect } from 'pwa-helpers/connect-mixin';
import {store} from './../../store/store';
import {LitElement, html, customElement, property} from 'lit-element';
import {reducer as customReducer} from './reducer';
import {customFormState} from './custom-form-state';

export class CustomForm extends connect(store)(LitElement) {

  @property({type : String})  propPath = 'app';
  formName;
  localState: customFormState = {
    isSubmitted : false
};
  
  render(){
      let path = this.propPath.split('.');
      this.formName = path[path.length-1];
    store.attachReducers({ [this.propPath]:customReducer(this.propPath)});

    return html`
    ${this.formName} :<br>
    <custom-input label="First Name" propPath="${this.propPath}.firstName"></custom-input>
    <custom-input label="Last Name" propPath="${this.propPath}.lastName"></custom-input>
    `;
  }

  
  stateChanged(state){
  }
}
customElements.define('custom-form', CustomForm);
