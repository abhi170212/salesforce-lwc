import { LightningElement,track,api } from 'lwc';

export default class DecoratorDemo extends LightningElement {

     @api recordID;
     @track myMessage='This is my Private Message';


     handleInputChange(evt){
          this.myMessage = evt.target.value;
     }
}