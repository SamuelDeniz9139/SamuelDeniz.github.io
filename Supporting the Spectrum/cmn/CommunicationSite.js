function page(index){//changes the page
    window.location.href=index;
}
let quests=["How are you?","What are you doing?","I'm doing well, too.","You're not looking at me.",
"Okay, then.","Why don't you want to tell me?","That was very rude of you.","It's expected of people.",
"Please tone down your voice.","That's how it felt to me.","I'm not mad at you.","It's okay.",
"Are you embarassed?","Sorry about that.","I'll leave you alone, then.","I won't judge you."];
function talk(htmElement){//based on the user's input from the page
    var btn=document.getElementById(htmElement);
    let go=true;//this prevents the switch statement from accidentally triggering twice
    for(let phrs=0;phrs<quests.length;phrs++){
        if(btn.innerHTML==quests[phrs]&&go){//looks for the button's innerHTML in the quests array
            go=false;
            switch(phrs){
                case 0://how are you
                    respond(1,"Good, I guess.");
                    break;
                case 1://what are you doing
                    respond(2,"I don't want to talk about it.");
                    break;
                case 2://i'm doing well
                    respond(-1,"Have fun.");
                    break;
                case 3://you're looking away
                    respond(3,"Why do I NEED to look at you?");
                    break;
                case 4://okay then
                    respond(-1,"Have a good day.");
                    break;
                case 5://why don't you wanna tell me
                    respond(4,"I like keeping to myself, that's all.");
                    break;
                case 6://that was rude
                    respond(5,"I didn't know I was being rude!");
                    break;
                case 7://it's expected
                    respond(0,"I just don't see a reason to.");
                    break;
                case 8://quiet down
                    respond(-1,"UGH! I'm DONE talking with you!");
                    break;
                case 9://that's how it felt to me
                    respond(6,"I'm sorry.");
                    break;
                case 10://not mad
                    respond(0,"Thanks. I feel relieved.");
                    break;
                case 11://it's ok
                    respond(8,"Thanks. I'm going to leave now. Have a nice day.");
                    break;
                case 12://embarassed?
                    respond(7,"N-no! I just...");
                    break;
                case 13://sorry
                    respond(-1,"It's okay. I'll just be on my way, then...");
                    break;
                case 14://leave alone
                    respond(-1,"Wait, where are you going? Come back!");
                    break;
                case 15://not judging you
                    respond(8,"Oh, that's a relief! Now, where do I start...");
                    break;
                default://failsafe that reverts it to the base
                    respond(0,"Uh, hi.");
                    break;
            }
        }
    }
}
function respond(resVar,dlg){//creates new responses based on the face of the program
    document.getElementById("dialogue").innerHTML=dlg;//gives the program's response
    const faces=["NeutralFace","LookingAway","PuzzledFace","EyeRoll","NervousFace","AngerFace","StressFace","ShockFace","HappyFace"];
    if(resVar<faces.length&&resVar>=0)//selects face from array
        document.getElementById("indicator").src="/src/Images/"+faces[resVar]+".png";
    switch(resVar){
        case 0://NeutralFace
            document.getElementById("oneChoice").innerHTML="How are you?";
            document.getElementById("otherChoice").innerHTML="What are you doing?";
            break;
        case 1://LookingAway
            document.getElementById("oneChoice").innerHTML="You're not looking at me.";
            document.getElementById("otherChoice").innerHTML="I'm doing well, too.";
            break;
        case 2://PuzzledFace
            document.getElementById("oneChoice").innerHTML="Okay, then.";
            document.getElementById("otherChoice").innerHTML="Why don't you want to tell me?";
            break;
        case 3://EyeRoll
            document.getElementById("oneChoice").innerHTML="That was very rude of you.";
            document.getElementById("otherChoice").innerHTML="It's expected of people.";
            break;
        case 4://NervousFace
            document.getElementById("oneChoice").innerHTML="Are you embarassed?";
            document.getElementById("otherChoice").innerHTML="Sorry about that.";
            break;
        case 5://AngerFace
            document.getElementById("oneChoice").innerHTML="Please tone down your voice.";
            document.getElementById("otherChoice").innerHTML="That's how it felt to me.";
            break;
        case 6://StressFace
            document.getElementById("oneChoice").innerHTML="I'm not mad at you.";
            document.getElementById("otherChoice").innerHTML="It's okay.";
            break;
        case 7://if you embarass them
            document.getElementById("oneChoice").innerHTML="I'll leave you alone, then.";
            document.getElementById("otherChoice").innerHTML="I won't judge you.";
            break;
        default://end of conversation; failsafe
            document.getElementById("oneChoice").style.display="none";
            document.getElementById("otherChoice").style.display="none";
            break;
    }
}