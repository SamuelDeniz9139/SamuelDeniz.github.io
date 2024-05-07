function page(index){//changes the page
    window.location.href=index;
}
function action(){//when activated the character's action changes
    var narrator=document.getElementById("narration");
    const actions=["They're currently deeply involved in their special interest.",
    "They're eating the same thing they always do.","They're figeting with their hands.",
    "They're keenly focused on the details of something in the distance.",
    "They were heavily alarmed by a sudden stimulus."];
    const exp=["LookingAway","ChewingFace","StressFace","PuzzledFace","ShockFace","NeutralFace"];
    let go=true;
    narrator.innerHTML=actions[Math.floor(Math.random() * actions.length)];
    for(let move=0;move<actions.length;move++){
        if(narrator.innerHTML==actions[move]&&go){
            go=false;
            document.getElementById("indicator").src="src/Images/"+exp[move]+".png";
        }
    }
}