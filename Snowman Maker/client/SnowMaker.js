var snowDex = 0;
var snowNames = [];
var snowVals = [];
const buildSnowman = (name, vals) => {
    const canvas=document.getElementById('snowMan');
    document.querySelector('#content').innerHTML = "<h4>This snowman's name is "+name+"!</h4>";
    canvas.classList.remove("hid");
    const ctx=canvas.getContext('2d');
    let varibs=vals.split(",")
    ctx.beginPath();
    ctx.rect(0, 0, 500, 500);
    ctx.fillStyle="#00cfdf";
    ctx.fill();
    ctx.fillStyle="white";
    ctx.strokeStyle="snow";
    let hat=varibs[0].slice(1,varibs[0].length-1);
    let eye=varibs[1].slice(1,varibs[1].length-1);
    let nos=varibs[2].slice(1,varibs[2].length-1);
    let arm=varibs[4].slice(1,varibs[4].length-1);
    let but=varibs[5].slice(1,varibs[5].length-1);
    var larm="left"+arm;
    var rarm="right"+arm;
    if(arm!="none"){
        var leftImg=document.getElementById(larm);
        var riteImg=document.getElementById(rarm);
        var leftX=leftImg.getAttribute('data-x');
        var leftY=leftImg.getAttribute('data-y');
        var riteX=riteImg.getAttribute('data-x');
        var riteY=riteImg.getAttribute('data-y');
        ctx.drawImage(leftImg,leftX,leftY);
        ctx.drawImage(riteImg,riteX,riteY);
    }
    ctx.save();
    ctx.beginPath();
    ctx.fillRect(0, 450, 500, 50);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(250, 360, 100, 0, 2*Math.PI, false);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    if(but!='none'){//draws buttons
        var butImg=document.getElementById(but);
        for(let bts=0;bts<3;bts++){
            ctx.drawImage(butImg,240,320+(bts*40));
        }
    }
    ctx.save();
    if(varibs[3].slice(1,varibs[3].length-1)!="none"){
        ctx.fillStyle=varibs[3].slice(1,varibs[3].length-1);
        ctx.strokeStyle=varibs[3].slice(1,varibs[3].length-1);
        ctx.scale(1, 0.7);
        ctx.beginPath();
        ctx.arc(250, 400, 85, 0, 2*Math.PI, false);
        ctx.fill();
        ctx.stroke();
    }//draws head
    ctx.restore();
    ctx.save();
    ctx.fillStyle="white";
    ctx.strokeStyle="snow";
    ctx.beginPath();
    ctx.arc(250, 220, 80, 0, 2*Math.PI, false);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    ctx.save();
    if(eye!='none'){//draws eyes
        var eyeImg=document.getElementById(eye);
        ctx.drawImage(eyeImg,205,200);
        ctx.drawImage(eyeImg,275,200);
    }
    ctx.restore();
    ctx.save();
    if(nos!='none'){//draws nose
        var nosImg=document.getElementById(nos);
        ctx.drawImage(nosImg,240,230);
    }
    ctx.restore();
    ctx.save();
    if(hat!="none"){
        var hatImg=document.getElementById(hat);
        var hatX=hatImg.getAttribute('data-x');
        var hatY=hatImg.getAttribute('data-y');
        ctx.drawImage(hatImg,hatX,hatY);
    }
    ctx.restore();
};
const prevSnowman = () =>{
    snowDex -=1;
    if (snowDex < 0){
        snowDex=snowVals.length-1;
    }//builds the previously created snowman
    buildSnowman(snowNames[snowDex],snowVals[snowDex]);
};
const handleResponse = async (response, parseResponse) => {
    const getHead = document.querySelector('#methodSelect').value;
    const content = document.querySelector('#content');
    let vals = [];
    switch(response.status) {
        case 200:
            content.innerHTML = `<h4>Here are your snowmen!</h4>`;
            break;
        case 201:
            content.innerHTML = `<h4>Your snowman has been built.</h4>`;
            document.getElementById("viewForm").classList.remove("hid");
            break;
        case 204:
            content.innerHTML = `<h4>Updated snowman.</h4>`;
            document.getElementById("viewForm").classList.remove("hid");
            break;
        case 400:
            content.innerHTML = `<h4>Your request failed. Maybe you forgot to name it?</h4>`;
            break;
        case 404:
            content.innerHTML = `<h4>Not found.</h4>`;
            break;
        default:
            content.innerHTML = `<h4>Client has no such error code.</h4>`;
            break;
    }
    if(parseResponse) {//gets snowman data
        let obj = await response.json();
        let val1 = Object.values(obj);
        let str1 = JSON.stringify(val1);
        let obj2 = JSON.parse(str1.slice(1,str1.length-1));
        let names = Object.keys(obj2);
        let val2 = Object.values(obj2);
        for(let pars=0;pars<val2.length;pars++){
            let obj3 = JSON.parse(JSON.stringify(val2[pars]));
            let things = Object.values(obj3);
            let objs = JSON.stringify(things);
            vals.push(objs.slice(1,objs.length-1));
        }
        snowNames=names;
        snowVals=vals;
        document.getElementById("prevButton").classList.remove("hid");
        document.getElementById("prevButton").addEventListener("click",prevSnowman);
        if(vals.length!=0){
            snowDex = names.length-1;
            buildSnowman(names[snowDex], vals[snowDex]);
        }
    }
};
const requestUpdate = async (userForm) => {
    const url = userForm.querySelector('#urlField').value;
    const method = userForm.querySelector('#methodSelect').value;
    let response = await fetch(url, {
        method,
        headers: {
            'Accept': 'application/json'
        },
    });
    handleResponse(response, method === 'get');
};
const sendPost = async (snowForm) => {
    const snowAction = snowForm.getAttribute('action');
    const snowMethod = snowForm.getAttribute('method');
    const nameField = snowForm.querySelector('#nameField');
    const hatField = snowForm.querySelector('#hatField');
    const eyeField = snowForm.querySelector('#eyeField');
    const noseField = snowForm.querySelector('#noseField');
    const scarField = snowForm.querySelector('#scarField');
    const armField = snowForm.querySelector('#armField');
    const buttField = snowForm.querySelector('#buttField');
    const formData = `name=${nameField.value}&hat=${hatField.value}&eye=${eyeField.value}&nose=${noseField.value}&scarf=${scarField.value}&arm=${armField.value}&buttons=${buttField.value}`;
    let response = await fetch(snowAction, {
        method: snowMethod,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        },
        body: formData,
    });
    handleResponse(response);
};
const init = () => {
    const snowForm = document.querySelector('#snowForm');
    const viewForm = document.querySelector('#viewForm');
    const getSnowmen = (e) => {
        e.preventDefault();
        requestUpdate(viewForm);
        return false;
    }
    const makeSnowman = (e) => {
        e.preventDefault();
        sendPost(snowForm);
        return false;
    }
    snowForm.addEventListener('submit', makeSnowman);
    viewForm.addEventListener('submit', getSnowmen);
};
window.onload = init;