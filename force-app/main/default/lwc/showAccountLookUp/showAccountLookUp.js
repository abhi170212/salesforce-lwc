import { LightningElement,wire,api } from 'lwc';
import callApex from '@salesforce/apex/LookUPHelper.getContacts';
import deleteContacts from '@salesforce/apex/LookUPHelper.deleteContact'
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class ShowAccountLookUp extends LightningElement {
     accountId;
     contactList;
     showContactTable=false;
     selectedContactIds=[]
     @api showPinner=false;

     columns=[{label:'Name',fieldName:'Name'},
          {label:'Phone',fieldName:'Phone'}
     ]
     handleChange(evt){
          this.accountId= evt.detail.recordId;
          console.log(this.accountId); // debug ke liye
          this.contactList=[];
           this.showContactTable=true; 
           if(this.accountId){
               this.callImperative(evt);
           }
     }
     //------------------------------------------------------------------------------------------------
     handleRowSelection(evt){
          this.selectedContactIds = evt.detail.selectedRows.map(row => row.Id);
          console.log("selected Ids++",this.selectedContactIds);
     }
     handleDelete(evt){
           console.log("Delete button clicked");
           this.showPinner=true;
          if(this.selectedContactIds.length >0){
               deleteContacts({ contactIds: this.selectedContactIds })
               .then(res=>{
                    this.dispatchEvent(
                         new ShowToastEvent({
                              title:'Success',
                              message:'Contacts deleted successfully',
                              variant:'success'
                         })
                    );
                    this.contactList = this.contactList.filter(row => !this.selectedContactIds.includes(row.Id));
                    this.selectedContactIds = [];
               })
               .catch(err=>{
                    this.dispatchEvent(
                         new ShowToastEvent({
                              title:'Error',
                              message:`${err.body ? err.body.message : err.message}`,
                              variant:'error',
                         })
                    )
               }).finally(a=>{
                    this.showPinner=false;
               })
          }
     }
     //----------------------------------------------------------------------------------------------------
     // IMPERATIVE CODE -----------------------------------------------------------------------------------
/*

     callImperative(evt){
          callApex({accId:this.accountId})
          .then(result=>{
               this.contactList=result;
               this.showContactTable=true;
          })
          .catch(error=>{
               console.error(error);
               this.showContactTable=false;
               this.contactList=undefined;
          });
     } 

*/
//----------another way of imperative code ------------------------------------------------------------
async callImperative(evt){
     try{
          const result= await callApex({accId:this.accountId});
          this.contactList = result;
          this.showContactTable = true;
     }catch(err){
          this.contactList=undefined;
          console.log(err);
          this.showContactTable = false;
     }
}

//---------------------------------------------------------------------------------------------------
/*
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
*/

     filter={
          criteria:[
               {
                    fieldPath:'CreatedDate',
                    operator:'eq',
                    value:{literal:'THIS_WEEK'}
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