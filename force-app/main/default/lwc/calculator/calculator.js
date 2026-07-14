import { LightningElement,track} from 'lwc';

export default class Calculator extends LightningElement {
     @track firstNumber;
     @track secondNumber;
     @track result;
     @track calArray=[];
     @track isShowAllChecked=false;

     handleChange(evt){
          const fieldValue = evt.target.name;
          if(fieldValue === 'fnum'){
               this.firstNumber=evt.target.value;
          }else if(fieldValue === 'snum'){
               this.secondNumber = evt.target.value;
          }
     }
     calculation(evt){
          //-----------------------------------------------
          this.firstNumber = parseInt(this.firstNumber);
          this.secondNumber=Number(this.secondNumber);
          //-------------------------------------------------
          const fieldName=evt.target.name;
          if(fieldName==='add'){
               this.result = this.firstNumber+this.secondNumber;
               this.calArray.push(this.result);
          }else if(fieldName==='sub'){
               this.result = this.firstNumber-this.secondNumber;
               this.calArray.push(this.result);
          }else if(fieldName === 'mul'){
               this.result = this.firstNumber * this.secondNumber;
               this.calArray.push(this.result);
          }else if(fieldName==='div'){
               this.result = this.firstNumber / this.secondNumber;
               this.calArray.push(this.result);
          }
     }

     showCalculation(evt){
          if(evt.target.name==='all'){
               this.isShowAllChecked=true;
     }
}
}