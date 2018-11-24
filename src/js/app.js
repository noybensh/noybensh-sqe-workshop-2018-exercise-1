import $ from 'jquery';
import {parseCode} from './code-analyzer';
import {first} from './code-analyzer';

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        let tblArray = first(parsedCode);
        //let tblArray = first(codeToParse);
        document.getElementById('tbl').innerHTML = makeTableHTML (tblArray);
        //document.getElementById('tbl').innerHTML = tblArray;
        $('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
    });

});

function makeTableHTML (myArray){
    let result = '<table border=1>' ;
    for (let i = 0 ; i < myArray.length ; i++){
        result += '<tr>' ;
        for (let j = 0 ; j < myArray[i].length ; j++){
            result+= '<td>'+myArray[i][j]+'</td>';}
        result += '</tr>' ;}
    result += '</table>' ;
    return result ;
}


