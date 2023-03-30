
function submitSign(){
    let face1 = [], face2 = [];
    face1.push($('input#L1').val());
    face1.push($('input#L2').val());
    face1.push($('input#L3').val());
    
    face2.push($('input#L4').val());
    face2.push($('input#L5').val());
    face2.push($('input#L6').val());
    
    $.post("/verify", {"L1": face1[0], "L2": face1[1], "L3": face1[2], "L4": face2[0], "L5": face2[1], "L6": face2[2]}
    , function(res){ 
        $('div#tablespace').html(res);
    }
    );
}

function calcLength(msg, element){ let r = 20 - msg.length; element.text(r); }

function initializeMessageLengths(){
    $('input#L1').keyup();
    $('input#L2').keyup();
    $('input#L3').keyup();
    $('input#L4').keyup();
    $('input#L5').keyup();
    $('input#L6').keyup();
}

function clearEverything(){
    $('input#L1').val('');
    $('input#L2').val('');
    $('input#L3').val('');
    $('input#L4').val('');
    $('input#L5').val('');
    $('input#L6').val('');
    
    initializeMessageLengths();

    $('div#tablespace').html('');
}



function initializePage(){
    $('button#submit').click(function(){ submitSign(); });
    
    $('input#L1').keyup(function(){ calcLength( this.value, $('span#length-1') ); });
    $('input#L2').keyup(function(){ calcLength( this.value, $('span#length-2') ); });
    $('input#L3').keyup(function(){ calcLength( this.value, $('span#length-3') ); });
    $('input#L4').keyup(function(){ calcLength( this.value, $('span#length-4') ); });
    $('input#L5').keyup(function(){ calcLength( this.value, $('span#length-5') ); });
    $('input#L6').keyup(function(){ calcLength( this.value, $('span#length-6') ); });

    $('button#clear').click(clearEverything);

    initializeMessageLengths();

}

$('document').ready(function(){initializePage();});
