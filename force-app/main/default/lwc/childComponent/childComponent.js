import { LightningElement ,api} from 'lwc';

export default class ChildComponent extends LightningElement {
     @api contactData;
     columnData=[
          {label:'Name',fieldName:'Name'},
          {label:'Phone',fieldName:'Phone'}
     ]


}