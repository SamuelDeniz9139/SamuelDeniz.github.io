function page(index){//changes the page
    window.location.href=index;
}
let sensoryDisorder="hypersensitivity";
function senDemo(type){//activates the demo for sensory processing disorder
    const spd=["hypersensitivity","hyposensitivity"]
    const intros=["I'm very sensitive to touch.","I don't respond to stimuli much."];
    document.getElementById("begin").classList.add("hyde");
    document.getElementById("touchDemo").classList.remove("hyde");
    document.getElementById("touchButtons").classList.remove("hyde");
    document.getElementById("dialogue").innerHTML="Hello! I have "+spd[type]+", so "+intros[type];
    sensoryDisorder=spd[type];
}
function touch(touchVal){//part of the sensory demo, when activated it "touches" the character
    var face=document.getElementById("indicator");
    var dlg=document.getElementById("dialogue");
    if(sensoryDisorder=="hypersensitivity"){//hypersensitive reactions
        switch(touchVal){
            case 0://when the user chooses not to "touch"
                dlg.innerHTML="Thank you for not touching me. I didn't want to suffer sensory overload.";
                face.src="/src/Images/HappyFace.png";
                break;
            case 1://when the user chooses to "touch" lightly
                dlg.innerHTML="Hey! Keep your hands to yourself! I need my personal space!";
                face.src="/src/Images/AngerFace.png";
                break;
            default:
                dlg.innerHTML="Gah! Please don't scare me like that. Also, remember to let go.";
                face.src="/src/Images/ShockFace.png";
                break;
        }
    } else if(sensoryDisorder=="hyposensitivity"){//hyposensitive reactions
        switch(touchVal){
            case 0://when the user chooses not to "touch"
                dlg.innerHTML="I really want to feel something right now.";
                face.src="/src/Images/NeutralFace.png";
                break;
            case 1://when the user chooses to "touch" lightly
                dlg.innerHTML="I see that you touched me, but I didn't really feel anything.";
                face.src="/src/Images/PuzzledFace.png";
                break;
            default://when the user chooses to "hug" the program
                dlg.innerHTML="I quite like that. Thank you very much!";
                face.src="/src/Images/HappyFace.png";
                break;
        }
    }
}