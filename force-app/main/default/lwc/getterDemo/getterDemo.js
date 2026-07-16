import { LightningElement ,track} from 'lwc';

export default class GetterDemo extends LightningElement {
     @track message ={
          mainMessage:'I am enjoying learning LWC',
          ownerName:'Abhishek Singh'
     }

     get showresult(){
          return this.message.mainMessage.toUpperCase();
     }
}