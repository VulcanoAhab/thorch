var exports = module.exports;

function Mapper(){

  this._fields=[];
  this._parsers={};
  this._translator={};

  this.setFields=function(fieldsArray){
    this._fields=fieldsArray;
  }

  this.getFields=function(){
    return this._fields;
  }

  this.cleanFields=function(){
    this._fields=[];
  }

  this.addParser=function(fieldName, fieldParser){
    this._parsers[fieldName]=fieldParser;
  }

  this.getParsers=function(){
    return this._parsers;
  }

  this.cleanParsers=function(){
    this._parsers=[];
  }

  this.addTranslator=function(filedName, newFieldName){
    this._translator[filedName]=newFieldName;
  }

  this.getTranslators=function(){
    return this._translator;
  }

  this.cleanTranslators=function(){
    this._translator=[];
  }


  this.process=function(raw) {

    if (!raw){console.log('[-] No raw object');return undefined;}
    var baseKeys=Object.keys(raw);
    var transKeys=Object.keys(this._translator);
    var parKeys=Object.keys(this._parsers);
    var processed={};

    for (var i=0; i<baseKeys.length; ++i){

      var key=baseKeys[i];
      var proKey=key;

      if (this._fields.indexOf(key) <= -1){continue;}

      if (transKeys.indexOf(key) > -1){
        proKey=this._translator[key];
      }

      if (parKeys.indexOf(key) > -1){
        processed[proKey]=this._parsers[key](raw[key]);
      } else {
        processed[proKey]=raw[key];
      }
    }
    return processed;
  }

}

exports.Mapper=Mapper;
