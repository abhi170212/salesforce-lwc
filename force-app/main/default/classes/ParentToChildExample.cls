public with sharing class ParentToChildExample {
    @AuraEnabled(cacheable=true)
  public static List<Contact> getContacts(ID accountId){
    try{
        return [select id,name,phone from Contact where accountId= :accountId];
    }catch(Exception e){
        throw new AuraHandledException('ExceptionText++'+e.getMessage());
    }
  }
}