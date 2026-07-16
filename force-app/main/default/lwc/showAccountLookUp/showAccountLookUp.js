import { LightningElement } from 'lwc';

export default class ShowAccountLookUp extends LightningElement {

     filter={
          criteria:[
               {
                    fieldPath:'CreatedDate',
                    operator:'eq',
                    value:{literal:'TODAY'}
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