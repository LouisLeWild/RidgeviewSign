
function submitSign(){
    let face1 = [], face2 = [];
    face1.push($('input#L1').val());
    face1.push($('input#L2').val());
    face1.push($('input#L3').val());
    
    face2.push($('input#L4').val());
    face2.push($('input#L5').val());
    face2.push($('input#L6').val());

    
    
    $.post("/verify", {"L1": face1[0], "L2": face1[1], "L3": face1[2], "L4": face2[0], "L5": face2[1], "L6": face2[2]}, function(res){ console.log('wee!', res);})
}

function initializePage(){
    $('button#submit').click(function(){ submitSign(); });
}

$('document').ready(function(){initializePage();});
