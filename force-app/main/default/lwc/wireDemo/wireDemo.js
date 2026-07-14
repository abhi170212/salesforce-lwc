import { LightningElement,wire,api } from 'lwc';
import ApexClass from '@salesforce/apex/wireDecorator.showMessage';

//---------------------------------------------------------------
import {getRecord,getFieldValue} from 'lightning/uiRecordApi';
// import Contact_Name from '@salesforce/schema/Contact.Name';
import Contact_Title from '@salesforce/schema/Contact.Title';
//---------------------------------------------------------------
export default class WireDemo extends LightningElement {
     @api message;
     //---------------------
     @api recordId;
     //----------------------
     @wire(ApexClass)
     wireData({error,data}){
          if(data){
               this.message = data;
          }else if(error){
               this.message='We hit an error!';
          }
     }
     //-----------------------------------------------------
     @wire(getRecord,{recordId:'$recordId',fields:['Contact.Name',Contact_Title,'Contact.Department']})
     record;

     get name(){
          return this.record.data ? getFieldValue(this.record.data,'Contact.Name') : 'Empty_Name';
     }

     get title(){
          return  this.record.data ? getFieldValue(this.record.data,Contact_Title) : 'Empty_Title';
     }
     get department(){
          return this.record.data.fields.Department.value;
     }
     //------------------------------------------------------

}