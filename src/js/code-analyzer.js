import * as esprima from 'esprima';
import * as escodegen from 'escodegen';


let line=[];
let type=[];
let name=[];
let condition=[];
let value=[];
let returnArray=[];
//let i ;
let j ;
let myBody = [];
let myParams = [];
let myFunctions = [];

function constructor(){
    j = 1 ;
    line = new Array();
    type = new Array();
    name = new Array ();
    condition = new Array();
    value = new Array();
    returnArray= new Array();
    myBody = new Array();
    myParams = new Array();
    myFunctions = new Array();
    line [0] = 'Line';
    type [0] = 'Type';
    name [0] = 'name';
    condition [0] = 'Condition';
    value [0] = 'Value' ;
    let k;
    for(k=0;k<5;k++) {
        returnArray[k]= new Array();}
}




const parseCode = (codeToParse) => {
    return esprima.parseScript(codeToParse, {loc:true});
};

const first = (parseCode)=>{
    constructor();
    //if (parseCode.body != null){
        if(parseCode.body.length > 0 && parseCode.body[0].type == 'FunctionDeclaration'){
            myBody = parseCode.body[0].body.body;
            myParams = parseCode.body[0].params;
            myFunctions = parseCode.body[0];
            FunctionDec (myFunctions);
            paramsDec (myParams);
            myParse(myBody, 0);}
        else{myBody = parseCode.body;
            myParse(myBody, 0);}//}
    arrrayForTBL();
    /*return makeTableHTML (returnArray);*/return returnArray ; };


const myParse = (parseCode, i) => {
    for (i ; i <parseCode.length ; i++){
        let statment =  parseCode[i].type;
        if (statment == 'VariableDeclaration'){
            VariableDec(parseCode, i);
            continue;}
        else if (statment == 'ExpressionStatement'){
            AssignmentExp (parseCode[i].expression);
            continue;}
        else{
            myParse2(parseCode, i);
            continue; }
    }};


const myParse2 = (parseCode, i) => {
    let statment =  parseCode[i].type;
    if (statment == 'IfStatement'){
        IfState(parseCode[i], i);
        return;}
    //else if (statment == 'UpdateStatement'){
        //updateState (parseCode[i].expression());
        //return ;}
    else{
        myParse3(parseCode, i);
        return ; }
};


const myParse3 = (parseCode, i) => {
    let statment =  parseCode[i].type;
    if (statment == 'WhileStatement'){
        WhileState(parseCode[i], i);
        return;}
    else if (statment == 'ForStatement'){
        ForState(parseCode, i);
        return ;}
    else if (statment == 'ReturnStatement'){
        ReturnState(parseCode, i);
        return;}
    //else{
        //return ; }
};


//function declaration
function FunctionDec(parseCode) {
    line [j] = parseCode.body.loc.start.line;
    type [j] = 'function declaration';
    name [j] = parseCode.id.name;
    condition [j] = null;
    value [j] = null;
    j++ ;
}

function paramsDec(myParams) {
    let k = 0 ;
    while (k < myParams.length) {
        line [j] = myParams[k].loc.start.line;
        type [j] = 'variable declaration';
        name [j] = myParams[k].name;
        condition [j] = null;
        value [j] = null;
        j++;
        k++;
    }
}

//variable declaration
function VariableDec (parseCode, i) {
    let k = 0 ;
    while (k < parseCode[i].declarations.length) {
        line [j] = parseCode[i].loc.start.line;
        type [j] = 'variable declaration';
        name [j] = parseCode[i].declarations[k].id.name;
        condition [j] = null;
        if (parseCode[i].declarations[k].init == null){
            value [j] = null; }
        else {value[j] = rigth(parseCode[i].declarations[k].init) ; }
        j++;
        k++;
    }
}

//assignment expression
function AssignmentExp (parseCode) {
    if (parseCode.type == 'UpdateExpression'){
        updateState(parseCode);
        return;
    }
    line [j] = parseCode.loc.start.line;
    type [j] = 'assignment expression';
    name [j] =parseCode.left.name;
    condition [j] = null;
    if (parseCode.operator == '+='){
        value [j] = name[j]+' + '+  rigth (parseCode.right) ;}
    else if (parseCode.operator == '-=')   {
        value [j] = name[j]+' - '+  rigth (parseCode.right) ;}
    else{ value [j] = rigth (parseCode.right);}
    j++;
}

function updateState(parseCode) {
    line[j] = parseCode.loc.start.line;
    type[j] = 'update expression';
    name[j] = parseCode.argument.name;
    condition[j] = null ;
    value[j] = updateVal(parseCode);
    j++ ;

}

function rigth (parseCode){
    let state = parseCode.type ;
    if (state =='Literal'){
        return parseCode.value;}
    else if (state =='Identifier'){
        return parseCode.name ;}
    else if (state == 'BinaryExpression'){
        return escodegen.generate(parseCode);}
    //else if (state == 'MemberExpression'){
    else
        return parseCode.object.name + '[' + rigth(parseCode.property) + ']' ;
    //}
}

function IfState (parseCode, i){
    line [j] = parseCode.loc.start.line;
    type [j] = 'if statement';
    name [j] = null;
    condition [j] = escodegen.generate(parseCode.test);
    value [j] = null;
    j++;
    let a=[];
    a.push(parseCode.consequent);
    if (parseCode.type == 'BlockStatement'|| a[0].type == 'BlockStatement'){
        myParse(a[0].body, 0);}
    else {myParse(a, i);}
    if (parseCode.alternate!= null){
        elseState(parseCode.alternate, 0);}
}

function elseState (parseCode){
    let a=[];
    line [j] = parseCode.loc.start.line;
    if (parseCode.type =='IfStatement'){
        type [j] = 'else if statement';
        condition [j] = escodegen.generate(parseCode.test);
        a.push(parseCode.consequent);}
    else{
        type [j] = 'else statement';
        condition [j] = null;
        a.push(parseCode);}
    name [j] = null;
    value [j] = null;
    j++;
    if (parseCode.alternate != null){
        a.push(parseCode.alternate);}
    if (a[0].type == 'BlockStatement'){
        myParse(a[0].body, 0);}
    else {myParse(a, 0);}
}

function WhileState (parseCode) {
    line [j] = parseCode.loc.start.line;
    type [j] = 'while statement';
    name [j] = null;
    condition [j] = escodegen.generate(parseCode.test);
    value [j] = null;
    j++;
    let a = [];
    for (let k = 0 ; k < parseCode.body.body.length ; k++)
        a.push(parseCode.body.body[k]);
    myParse(a, 0);
}

function ForState (parseCode, i) {
    line [j] = parseCode[i].loc.start.line;
    type [j] = 'for statement';
    name [j] = null;
    condition [j] = escodegen.generate(parseCode[i].test);
    value [j] = null;
    j++;
    if (parseCode[i].init != null) {
        if (parseCode[i].init.type == 'VariableDeclaration') {
            forVariableDec(parseCode[i].init);
        }
        else if (parseCode[i].init.type == 'ExpressionStatement' || parseCode[i].init.type == 'AssignmentExpression') {
            AssignmentExp(parseCode[i].init);
        }
    }
    forUpdate(parseCode[i].update);
    ForState2(parseCode, i);
}

function ForState2(parseCode, i) {
    let a = [];
    for (let k = 0; k < parseCode[i].body.body.length; k++)
        a.push(parseCode[i].body.body[k]);
    myParse(a, 0);
}


function forVariableDec(parseCode){
    line [j] = parseCode.loc.start.line;
    type [j] = 'variable declaration';
    name [j] = parseCode.declarations[0].id.name;
    condition [j] = null;
    /*if (parseCode.declarations[0].init == null){
        value [j] = null; }
    else {*/value[j] = rigth(parseCode.declarations[0].init) ;// }
    j++;
}


function forUpdate(parseCode) {
    line [j] = parseCode.loc.start.line;
    type [j] = 'update expression';
    name[j] = name[j-1];
    condition [j] = null ;
    value[j] = updateVal(parseCode);
    j++ ;
}

function updateVal(parseCode){
    if (parseCode.operator == '++'){
        value[j] = name[j] + ' + 1'; }
    else if (parseCode.operator == '--'){
        value[j] = name[j] + ' - 1'; }
}

function ReturnState (parseCode, i) {
    line [j] = parseCode[i].loc.start.line;
    type [j] = 'return statement';
    name [j] = null;
    condition [j] = null;
    value [j] = rigth(parseCode[i].argument);
    j++;
}

function arrrayForTBL(){
    returnArray [0] = line ;
    returnArray [1] = type ;
    returnArray [2] = name ;
    returnArray [3] = condition ;
    returnArray [4] = value ;
}

function deleteResults() {
    returnArray = new Array();
    line= new Array ();
    type= new Array();
    name=new Array();
    condition=new Array();
    value=new Array();
    myBody = new Array();
    myParams = new Array();
    myFunctions = new Array();
}

export {parseCode};
export {first};
export {deleteResults} ;
export {returnArray};
