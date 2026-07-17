import { LightningElement,wire } from 'lwc';
import callApex from '@salesforce/apex/LookUPHelper.getContacts';



export default class ShowAccountLookUp extends LightningElement {
     accountId;
     contactList;
     showContactTable=false;

     columns=[{label:'Name',fieldName:'Name'},
          {label:'Phone',fieldName:'Phone'}
     ]
     handleChange(evt){
          this.accountId= evt.detail.recordId;
          console.log(this.accountId); // debug ke liye
          this.contactList=[];
           this.showContactTable=true; 
     }

     @wire(callApex,{accId:'$accountId'})
     wireData({error,data}){
          if(data){
               this.contactList=data;
               this.showContactTable=true; 
          }else if(error){
               this.contactList=undefined;
               this.showContactTable = false;
               console.error(error);

          }
     }





     filter={
          criteria:[
               {
                    fieldPath:'CreatedDate',
                    operator:'eq',
                    value:{literal:'THIS WEEK'}
               }
          ]
     }
     displayInfo={
          additionalFields:['Phone']
     }
     matchingInfo={
          primaryField:{fieldPath:'Name'},
          additionalFields:[{fieldPath:'Industry'}]
     }
     
}