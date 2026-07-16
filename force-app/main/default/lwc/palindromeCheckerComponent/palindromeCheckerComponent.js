import { LightningElement,track } from 'lwc';

export default class PalindromeCheckerComponent extends LightningElement {

     @track necObj={
          isPalindrome:false,
          rev:0,
          temp:0,
          valueToCheck:0,
          message:'',
     };
checkFunction(evt){
     if(evt.target.name==="val"){
          this.necObj.valueToCheck=Number(evt.target.value);
           this.palindromeChecker(this.necObj.valueToCheck);
          if(this.necObj.isPalindrome){
               this.necObj.message=`The number ${this.necObj.valueToCheck} is Palindrome`;
          }else{
                this.necObj.message=`The number ${this.necObj.valueToCheck} is  NOT a Palindrome`;
          }
     }
}
palindromeChecker(num){

     this.necObj.rev = 0;
     this.necObj.isPalindrome = false;
     let  num2=num;

     while(num != 0){
          this.necObj.temp = num %10;
          this.necObj.rev = this.necObj.rev *10+ this.necObj.temp;
          num = Math.floor(num / 10);
          this.necObj.temp=0;
     }

     if(this.necObj.rev === num2){
          this.necObj.isPalindrome=true;
     }
}




}