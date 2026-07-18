import { LightningElement,track } from 'lwc';
import Email_Name  from '@salesforce/apex/LifeCycleHooksHelper.getEmail';


//----------------------------------------------------------------------------------
export default class LwcLifeCycleHook extends LightningElement {
     //---------------------------------------------------------
     @track emailInput ;
     @track message;
     //-----------------------------------------------------------



     //-----------------------------------------------------------
     constructor(){
          super();
          console.log('Inside Constructor');
     }
     connectedCallback(){
          console.log('InsideConnected Callback');
     }

     renderedCallback(){
          console.log('Inside the render callback');
     }

     disconnectedCallback(){
          console.log('Inside disconnected callback');
     }

     errorCallback({error,data}){
          console.log('Inside error callback');
          console.log(`Error in my lifecycle ${error}`);
          console.log(`LifeCycle stack trace : ${data})`);
     }
     //---------------------------------------------------------------
     
     getData(evt){
          this.emailInput=this.template.querySelector('lightning-input').value;
          console.log('Entered email:',this.emailInput);

          getEmail({contactEmail:this.emailInput})
               .then((result)=>{
                    this.message=JSON.stringify(result);
               })
               .catch(err=>{
                    console.log('Error fetching Message:',err);
                    this.errorCallback(err,err.stack);
               })
     }
}