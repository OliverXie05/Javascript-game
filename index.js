var table = document.getElementById("table");
var move = document.getElementById("move");
var win = document.getElementById("win");
var printmove = document.getElementById("bestmove");
var printtime = document.getElementById("besttime");
var printlevel = document.getElementById("bestlevel");
var empty_x = 1;
var empty_y = 1;
var nums = [1,2,3,4,5,6,7,8,""];
var count = 0;
var bestmove = 'N/A';
var besttime = 'N/A';
var bestlevel = 'N/A';
var curlevel = 'N/A';
var bestminute = 'N/A';
var bestsec = 'N/A';
printmove.innerHTML = 'N/A';
printtime.innerHTML = 'N/A';
printlevel.innerHTML = 'N/A';
win.innerHTML = 'Go!';
var tempclass;
var c1 = document.getElementById("c1");
var c2 = document.getElementById("c2");
var c3 = document.getElementById("c3");
var c4 = document.getElementById("c4");
var c5 = document.getElementById("c5");
var c6 = document.getElementById("c6");
var c7 = document.getElementById("c7");
var c8 = document.getElementById("c8");
var c9 = document.getElementById("c9");
var imglist = ["img1","img2","img3","img4","img5","img6","img7","img8","img9"];

window.onload = function() {
if (window.localStorage){
        localStorage.setItem('bestmove',100);
        localStorage.setItem('besttime',"100:100");
        localStorage.setItem('bestlevel',"N/A");
        localStorage.setItem('bestminute',100);
        localStorage.setItem('bestsec',100);
    }
    move.innerHTML = 0;
    if (table != null) {
        for (var i = 0; i < table.rows.length; i++) {
            for (var j = 0; j < table.rows[i].cells.length; j++) {
                table.rows[i].cells[j].onclick = function () {
                    swap(this, this.parentNode.rowIndex, this.cellIndex);
                };
            }
        }
    }
}


var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

function validateSwap(i, j)
{
    if(
        (i == (empty_x+1) && j == empty_y) ||
        (i == (empty_x-1) && j == empty_y) ||
        (i == empty_x && j == (empty_y+1)) ||
        (i == empty_x && j == (empty_y-1))

        )
    {
        return true;
    }
    else
    {
        return false;
    }
}

function swap(tableCell, i , j)
{
    if(validateSwap(i, j))
    {
        table.rows[empty_x].cells[empty_y].innerHTML = table.rows[i].cells[j].innerHTML;
        table.rows[i].cells[j].innerHTML = "";
        tempclass = table.rows[i].cells[j].className;
        table.rows[i].cells[j].className = table.rows[empty_x].cells[empty_y].className;
        table.rows[empty_x].cells[empty_y].className = tempclass;
        empty_x = i;
        empty_y = j;
        count += 1;
        move.innerHTML = count;
    }

    var check = false;
    if (table.rows[0].cells[0].innerHTML === '1' &&table.rows[0].cells[1].innerHTML === '2' &&table.rows[0].cells[2].innerHTML === '3' &&
        table.rows[1].cells[0].innerHTML === '8' &&table.rows[1].cells[1].innerHTML === '' &&table.rows[1].cells[2].innerHTML === '4' &&
        table.rows[2].cells[0].innerHTML === '7' &&table.rows[2].cells[1].innerHTML === '6' &&table.rows[2].cells[2].innerHTML === '5' ){
        check = true;
    }
    if(check === true){
    win.innerHTML = 'YOU WIN!!!';
    table.rows[empty_x].cells[empty_y].className = 'img5finish'

    bestmove = localStorage.getItem('bestmove');
    besttime = localStorage.getItem('besttime');
    bestlevel = localStorage.getItem('bestlevel');
    bestminute = localStorage.getItem('bestminute');
    bestsec = localStorage.getItem('bestsec');
    if (bestmove>count){
    bestmove = count;}
    if (bestminute>parseInt(minutesLabel.innerHTML) ){
        besttime = minutesLabel.innerHTML +':' +secondsLabel.innerHTML;
        bestminute = parseInt(minutesLabel.innerHTML);
        bestsec=parseInt(secondsLabel.innerHTML);
    }
    
    if(bestminute==parseInt(minutesLabel.innerHTML)&&bestsec>parseInt(secondsLabel.innerHTML)){
        besttime = minutesLabel.innerHTML +':' +secondsLabel.innerHTML;
        bestminute = parseInt(minutesLabel.innerHTML);
        bestsec=parseInt(secondsLabel.innerHTML);
    }
    if(curlevel === 'Hard'){
    bestlevel = curlevel;}
    if(curlevel ==='Random'){
        if (bestlevel ==='Easy' || bestlevel ==='N/A'){
            bestlevel = curlevel;
        }
    }
    if(curlevel ==='Medium'){
        if (bestlevel ==='Easy' || bestlevel ==='N/A'){
            bestlevel = curlevel;
        }
    }
    if(curlevel ==='Easy'){
        if (bestlevel ==='N/A'){
            bestlevel = curlevel;
        }
    }
    if (window.localStorage){
        localStorage.setItem('bestmove',bestmove);
        localStorage.setItem('besttime',besttime);
        localStorage.setItem('bestlevel',bestlevel);
        localStorage.setItem('bestminute',bestminute);
        localStorage.setItem('bestsec',bestsec);
    }

    bestmove = localStorage.getItem('bestmove');
    besttime = localStorage.getItem('besttime');
    bestlevel = localStorage.getItem('bestlevel');
    printmove.innerHTML = bestmove;
    printtime.innerHTML = besttime;
    printlevel.innerHTML = bestlevel;
    }
}

function shuffle() {
    curlevel = 'Random'
    win.innerHTML = 'Go!';
    totalSeconds = 0;
    count = 0;
    secondsLabel.innerHTML = '00';
    minutesLabel.innerHTML = '00';
    var j, x, i;
    var z = 0;
    move.innerHTML = 0;

    for (i = nums.length - 1; i >= 0; i--) 
    {
        j = Math.floor(Math.random() * (i + 1));
        x = nums[i];
        nums[i] = nums[j];
        nums[j] = x;

        
    }


    for(i=0; i < 3; i++)
    {
        for(j=0; j < 3; j++)
        {
            if(nums[z] == "")
            {
               empty_x = i;
               empty_y = j;
            }

            table.rows[i].cells[j].innerHTML = nums[z];
            if (table.rows[i].cells[j].innerHTML ==='1'){
                table.rows[i].cells[j].className = 'img1';
            }
            table.rows[i].cells[j].innerHTML = nums[z];
            if (table.rows[i].cells[j].innerHTML ==='2'){
                table.rows[i].cells[j].className = 'img2';
            }
            table.rows[i].cells[j].innerHTML = nums[z];
            if (table.rows[i].cells[j].innerHTML ==='3'){
                table.rows[i].cells[j].className = 'img3';
            }
            table.rows[i].cells[j].innerHTML = nums[z];
            if (table.rows[i].cells[j].innerHTML ==='8'){
                table.rows[i].cells[j].className = 'img4';
            }
            table.rows[i].cells[j].innerHTML = nums[z];
            if (table.rows[i].cells[j].innerHTML ===''){
                table.rows[i].cells[j].className = 'img5';
            }
            table.rows[i].cells[j].innerHTML = nums[z];
            if (table.rows[i].cells[j].innerHTML ==='4'){
                table.rows[i].cells[j].className = 'img6';
            }
            table.rows[i].cells[j].innerHTML = nums[z];
            if (table.rows[i].cells[j].innerHTML ==='7'){
                table.rows[i].cells[j].className = 'img7';
            }
            table.rows[i].cells[j].innerHTML = nums[z];
            if (table.rows[i].cells[j].innerHTML ==='6'){
                table.rows[i].cells[j].className = 'img8';
            }
            table.rows[i].cells[j].innerHTML = nums[z];
            if (table.rows[i].cells[j].innerHTML ==='5'){
                table.rows[i].cells[j].className = 'img9';
            }
            z++;
        }
    }


}
function easy(){
    curlevel = 'Easy'
    win.innerHTML = 'Go!';
    totalSeconds = 0;
    count = 0;
    secondsLabel.innerHTML = '00';
    minutesLabel.innerHTML = '00';
    move.innerHTML = 0;
    table.rows[0].cells[0].innerHTML = '1';
    table.rows[0].cells[1].innerHTML = '3';
    table.rows[0].cells[2].innerHTML = '4';
    table.rows[1].cells[0].innerHTML = '8';
    table.rows[1].cells[1].innerHTML = '6';
    table.rows[1].cells[2].innerHTML = '2';
    table.rows[2].cells[0].innerHTML = '7';
    table.rows[2].cells[1].innerHTML = '';
    table.rows[2].cells[2].innerHTML = '5';
    table.rows[0].cells[0].className = 'img1';
    table.rows[0].cells[1].className = 'img3';
    table.rows[0].cells[2].className = 'img6';
    table.rows[1].cells[0].className = 'img4';
    table.rows[1].cells[1].className = 'img8';
    table.rows[1].cells[2].className = 'img2';
    table.rows[2].cells[0].className = 'img7';
    table.rows[2].cells[1].className = 'img5';
    table.rows[2].cells[2].className = 'img9';
    empty_x = 2;
    empty_y = 1;

}
function medium(){
    curlevel = 'Medium'
    win.innerHTML = 'Go!';
    totalSeconds = 0;
    count = 0;
    secondsLabel.innerHTML = '00';
    minutesLabel.innerHTML = '00';
    move.innerHTML = 0;
    table.rows[0].cells[0].innerHTML = '2';
    table.rows[0].cells[1].innerHTML = '8';
    table.rows[0].cells[2].innerHTML = '1';
    table.rows[1].cells[0].innerHTML = '';
    table.rows[1].cells[1].innerHTML = '4';
    table.rows[1].cells[2].innerHTML = '3';
    table.rows[2].cells[0].innerHTML = '7';
    table.rows[2].cells[1].innerHTML = '6';
    table.rows[2].cells[2].innerHTML = '5';
    table.rows[0].cells[0].className = 'img2';
    table.rows[0].cells[1].className = 'img4';
    table.rows[0].cells[2].className = 'img1';
    table.rows[1].cells[0].className = 'img5';
    table.rows[1].cells[1].className = 'img6';
    table.rows[1].cells[2].className = 'img3';
    table.rows[2].cells[0].className = 'img7';
    table.rows[2].cells[1].className = 'img8';
    table.rows[2].cells[2].className = 'img9';
    empty_x = 1;
    empty_y = 0;
}
function hard(){
    curlevel = 'Hard';
    win.innerHTML = 'Go!';
    totalSeconds = 0;
    count = 0;
    secondsLabel.innerHTML = '00';
    minutesLabel.innerHTML = '00';
    move.innerHTML = 0;
    table.rows[0].cells[0].innerHTML = '5';
    table.rows[0].cells[1].innerHTML = '6';
    table.rows[0].cells[2].innerHTML = '7';
    table.rows[1].cells[0].innerHTML = '4';
    table.rows[1].cells[1].innerHTML = '';
    table.rows[1].cells[2].innerHTML = '8';
    table.rows[2].cells[0].innerHTML = '3';
    table.rows[2].cells[1].innerHTML = '2';
    table.rows[2].cells[2].innerHTML = '1';
    table.rows[0].cells[0].className = 'img9';
    table.rows[0].cells[1].className = 'img8';
    table.rows[0].cells[2].className = 'img7';
    table.rows[1].cells[0].className = 'img6';
    table.rows[1].cells[1].className = 'img5';
    table.rows[1].cells[2].className = 'img4';
    table.rows[2].cells[0].className = 'img3';
    table.rows[2].cells[1].className = 'img2';
    table.rows[2].cells[2].className = 'img1';
    empty_x = 1;
    empty_y = 1;
}

