import {wire,api, LightningElement } from 'lwc';
import Apex_Class from '@salesforce/apex/ParentToChildExample.getContacts'
export default class ParentComponent extends LightningElement {
     @api error;
     contactDataList=[];
     @api recordId;

     @wire(Apex_Class,{accountId:'$recordId'})
     wireData({error,data}){
          if(data){
               this.contactDataList=data;
          }else if(error){
               this.error=error;
          }
     }
}