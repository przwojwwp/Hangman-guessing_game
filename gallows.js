var passwords = new Array(10);

passwords[0] = "Bez pracy nie ma kołaczy";
passwords[1] = "cel uświęca środki";
passwords[2] = "ciągnie wilka do lasu";
passwords[3] = "chcieć to móc";
passwords[4] = "apetyt rośnie w miarę jedzeni";
passwords[5] = "biednemu zawsze wiatr w oczy";
passwords[6] = "ciekawość to pierwszy stopień do piekła";
passwords[7] = "Ten się śmieje kto się śmieje ostatni";
passwords[8] = "Gdzie diabeł nie może tam babę pośle";
passwords[9] = "Wiara czyni cuda";

passwords = passwords.map(function (x)
{
    return x.toUpperCase();
});

function randomInt(n)
{
    return Math.floor(Math.random() * n);
}

function randomElement(passwords)
{
    return passwords[randomInt(passwords.length)];
}

var drawPassword = randomElement(passwords);

var length = drawPassword.length;
console.log(drawPassword.length);

var tries = 0;

var yes = new Audio("yes.wav");
var no = new Audio("no.wav");

window.onload = start;

function uptade_password()
{
    document.getElementById("board").innerHTML = hidden_password;
}

/////////////////////////////////////////////////////////////////

function start()
{
    hidden_password = "";

    for (i = 0; i < length; i++)
    {
        if (drawPassword.charAt(i) == " ") hidden_password = hidden_password + " ";
        else hidden_password = hidden_password + "-";
    }

    var letters_div = "";

    for (i = 0; i <= 34; i++)
    {
        var letterId = "letter" + i;
        letters_div =
            letters_div + '<div class="letter" onclick="check(' + i + ')" id="' + letterId + '">' + letters[i] + "</div>";
        if ((i + 1) % 7 == 0)
            letters_div = letters_div + '<div style="clear:both"></div>';
    }

    document.getElementById("alphabet").innerHTML = letters_div;

    uptade_password();
}



var letters = new Array(35);

letters[0] = "A";
letters[1] = "Ą";
letters[2] = "B";
letters[3] = "C";
letters[4] = "Ć";
letters[5] = "D";
letters[6] = "E";
letters[7] = "Ę";
letters[8] = "F";
letters[9] = "G";
letters[10] = "H";
letters[11] = "I";
letters[12] = "J";
letters[13] = "K";
letters[14] = "L";
letters[15] = "Ł";
letters[16] = "M";
letters[17] = "N";
letters[18] = "Ń";
letters[19] = "O";
letters[20] = "Ó";
letters[21] = "P";
letters[22] = "Q";
letters[23] = "R";
letters[24] = "S";
letters[25] = "Ś";
letters[26] = "T";
letters[27] = "U";
letters[28] = "V";
letters[29] = "W";
letters[30] = "X";
letters[31] = "Y";
letters[32] = "Z";
letters[33] = "Ż";
letters[34] = "Ź";



//
//
//

String.prototype.setChar = function (spot, char)
{
    if (spot > this.length - 1) return this.toString();
    else return this.substring(0, spot) + char + this.substring(spot + 1);
}

function check(nr)
{
    var hit = false;

    for (i = 0; i < length; i++)
    {
        if (drawPassword.charAt(i) == letters[nr])
        {
            hidden_password = hidden_password.setChar(i, letters[nr]);
            hit = true;
        }
    }

    if (hit == true)
    {
        yes.play()
        var letterId = "letter" + nr;
        document.getElementById(letterId).style.background = "#003300";
        document.getElementById(letterId).style.color = "#00C000";
        document.getElementById(letterId).style.border = "3px solid #00C000";
        document.getElementById(letterId).style.cursor = "default";

        uptade_password();
    }
    else
    {
        no.play()
        var letterId = "letter" + nr;
        document.getElementById(letterId).style.background = "#330000";
        document.getElementById(letterId).style.color = "#C00000";
        document.getElementById(letterId).style.border = "3px solid #C00000";
        document.getElementById(letterId).style.cursor = "default";
        document.getElementById(letterId).setAttribute("onclick", ";");

        //
        //try
        //
        tries++;
        var picture = "img/s" + tries + ".jpg";
        document.getElementById("gallows").innerHTML = '<img src="' + picture + '"alt=""/>'

    }

    //
    //win
    //
    if (drawPassword == hidden_password)
        document.getElementById("alphabet").innerHTML = "<br><br>Tak jest! Podano prawidłowe hasło: " + drawPassword + "." + '<br><br><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>'


    //
    //loss
    //
    if (tries >= 9)
        document.getElementById("alphabet").innerHTML = "<br><br>Niepoprawne hasło. <br> Przegrana! " + '<br><br><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>'
}
