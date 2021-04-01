const COLOR_ARRAY = ["red","blue","green","yellow","orange","indigo","violet"];
        const COLOR_INDEX = Math.floor(Math.random() * 7);
        const COLOR_TARGET = COLOR_ARRAY[COLOR_INDEX];
        const TOP_ROW = [0,1,2,0,1,2];
        const BOTTOM_ROW = [0,1,2];
        const CAPT_AMERICA = 0;
        const IRON_MAN = 1;
        const THOR_GOD_OF_THUNDER = 2;
        const WINNING_COMBO = ["012","345","678","036","147","258","048","246"];
        let xCombo = false;
        let oCombo = false;
        let flippedList = [false, false, false, false, false, false];
        let matchedList = [false, false, false, false, false, false];
        let lastFlipped = -1;
        let lastFlippedIndex = -1;
        let flipCount = 0;
        let myMark = "O";
        let yourMark = "X";
        let winner = false;
        let myScore = 0;
        let yourScore = 0;
        shuffle(TOP_ROW);
        function startTicTacToe(me)
        {
            console.log(me.innerHTML);
            let divs = document.getElementsByClassName( 'ticTacDiv' );
            winner = false;
            [].slice.call( divs ).forEach(function ( div ) {
                div.innerHTML = " ";
            });
            
            if (me.innerHTML ==="Start Playing!") {
                document.getElementById("setUp1").disabled = true;
                document.getElementById("setUp2").disabled = true;
                document.getElementById("setUp3").disabled = true;
                me.innerHTML ="Reset Game!";
                // make first move
            if (document.getElementById("setUp3").checked === true)
            {
                myMove(myMark);     
            }
            } else
            {
                document.getElementById("setUp1").disabled = false;
                document.getElementById("setUp2").disabled = false;
                document.getElementById("setUp3").disabled = false;
                oCombo = false;
                xCombo = false;
                me.innerHTML ="Start Playing!";
            }
            
        }
        function myMove(mark){
            if ((xCombo) || (oCombo)) {
                alert("game is already over, click button to reset a new game");
                return
            };
            let divs = document.getElementsByClassName( 'ticTacDiv' );
            let x = 0;
            // count how many empty space is left
            [].slice.call( divs ).forEach(function ( div ) {
                if (div.innerHTML !== " "){
                    x += 1;
                }
            });
            
            // use random to pick spots during the first 4 moves
            if (x < 2){
                console.log("random move");
                makeRandomMove(mark);
                
            } else // after the 4th, look for the winning / defensive move 
            {
                
                console.log("winning move");
                // winning combo
                makeWinningMove(mark,"W");
            }
            checkWinner(mark);
        
            return false;
            
        }
        function makeWinningMove(mark, moveType){
            let divs = document.getElementsByClassName( 'ticTacDiv' );
            //divs.    
            let board = []
                let x = 0;
                // count how many empty space is left
                [].slice.call( divs ).forEach(function ( div ) {
                    
                        board.push(div.innerHTML);
                    
                });
                console.log(board.join("-"));
                let myCombo = "";
                let foundAMove = false;
                let myWinningCombo1 = " -" + mark + "-" + mark;
                let myWinningCombo2 = mark + "- -" + mark;
                let myWinningCombo3 = mark + "-" + mark + "- ";
                let i = 0;
                let combo = "";
                for (i = 0; i <= 7; i++) {
                    if (foundAMove === false){
                        combo = WINNING_COMBO[i];
                        myCombo = board[combo.substring(0,1)] + "-" + 
                                board[combo.substring(2,1)] + "-" + 
                                board[combo.substring(2)];
                        switch (myCombo){
                            case myWinningCombo1:
                                //alert("Afound a winning move!" + combo + " = " + myCombo + " , marking :" + combo.substring(0,1));
                                document.getElementById("ticTac"+combo.substring(0,1)).innerHTML=mark;
                                foundAMove = true;
                                break;
                                
                            case myWinningCombo2:
                                //alert("Afound a winning move!" + combo + " = " + myCombo + " , marking :" + combo.substring(2,1));
                                document.getElementById("ticTac"+combo.substring(2,1)).innerHTML=mark;
                                foundAMove = true;
                                break;
                                
                            case myWinningCombo3:
                                //alert("Afound a winning move!" + combo + " = " + myCombo + " , marking :" + combo.substring(2));
                                document.getElementById("ticTac"+combo.substring(2)).innerHTML=mark;
                                foundAMove = true;
                                break;
                            
                            default :
                                break;
                        }
                        
                    }
                }
                if (!checkWinner(mark)){
                    if (foundAMove === false){
                    
                        console.log("defensive move");
                        makeDefensiveMove(yourMark);
                        //makeRandomMove(mark);
                    }
                    return;
                }
                
            }
        
            function makeDefensiveMove(mark){
                let divs = document.getElementsByClassName( 'ticTacDiv' );
                let board = []
                let x = 0;
                // count how many empty space is left
                [].slice.call( divs ).forEach(function ( div ) {
                    
                        board.push(div.innerHTML);
                    
                });
                console.log(board.join("-"));
                let myCombo = "";
                let foundAMove = false;
                let myWinningCombo1 = " -" + mark + "-" + mark;
                let myWinningCombo2 = mark + "- -" + mark;
                let myWinningCombo3 = mark + "-" + mark + "- ";
                let i = 0;
                let combo = "";
                for (i = 0; i <= 7; i++) {
                    if (foundAMove === false){
                        combo = WINNING_COMBO[i];
                        myCombo = board[combo.substring(0,1)] + "-" + 
                                board[combo.substring(2,1)] + "-" + 
                                board[combo.substring(2)];
                        switch (myCombo){
                            case myWinningCombo1:
                                //alert("Afound a defensive move!" + combo + " = " + myCombo + " , marking :" + combo.substring(0,1));

                                document.getElementById("ticTac"+combo.substring(0,1)).innerHTML=myMark;
                                foundAMove = true;
                                break;
                                
                            case myWinningCombo2:
                                //alert("Afound a defensive move!" + combo + " = " + myCombo + " , marking :" + combo.substring(2,1));
                                document.getElementById("ticTac"+combo.substring(2,1)).innerHTML=myMark;
                                foundAMove = true;
                                break;
                                
                            case myWinningCombo3:
                                //alert("Afound a defensive move!" + combo + " = " + myCombo + " , marking :" + combo.substring(2));
                                document.getElementById("ticTac"+combo.substring(2)).innerHTML=myMark;
                                foundAMove = true;
                                break;
                            
                            default :
                                break;
                        }
                        
                    }
                }
 
                if (foundAMove === false){
                        console.log("random move");
                        makeRandomMove(myMark);
                }
                
            }
        
        function checkWinner(mark){
            WINNING_COMBO.forEach(function ( combo ) {
                if (document.getElementById("ticTac"+combo.substring(0,1)).innerHTML === mark &&
                    document.getElementById("ticTac"+combo.substring(2,1)).innerHTML === mark &&
                    document.getElementById("ticTac"+combo.substring(2)).innerHTML === mark)
                     {
                        if (winner === false){
                            winner = true;
                            if (mark === yourMark){
                                let x = document.getElementById("yourScore").innerHTML;
                                if (x===""){x="0";}
                                yourScore = parseInt(x);
                                yourScore += 1;
                                document.getElementById("yourScore").innerHTML = yourScore;
                                alert("Congratulations, you won!")
                            }
                            else{
                                let x = document.getElementById("myScore").innerHTML;
                                if (x===""){x="0";}
                                myScore = parseInt(x);
                                myScore += 1;
                                document.getElementById("myScore").innerHTML = myScore;
                                alert("Sorry, I won, better luck next time.")
                            }
                            return true;
                        }
                    }
            });
            return winner;
        }
        function makeRandomMove(mark){
            let divs = document.getElementsByClassName( 'ticTacDiv' );
            
            let x = 0;
            // count how many empty space is left
            [].slice.call( divs ).forEach(function ( div ) {
                if (div.innerHTML === " "){
                    x += 1;
                }
            });
            if (x > 0){
                let firstMoveIndex = Math.floor(Math.random() * 9);
                if (document.getElementById("ticTac4").innerHTML === " "){
                    firstMoveIndex = 4;
                }

                console.log(document.getElementById("ticTac"+firstMoveIndex).innerHTML);
                if (document.getElementById("ticTac"+firstMoveIndex).innerHTML !== " "){
                    do{
                    console.log("make my move: " + firstMoveIndex + "tick is :"+mark);
                    firstMoveIndex = Math.floor(Math.random() * 9);
                    }while(document.getElementById("ticTac"+firstMoveIndex).innerHTML !== " ");
                    document.getElementById("ticTac"+firstMoveIndex).innerHTML=mark; 
                } else {
                    document.getElementById("ticTac"+firstMoveIndex).innerHTML=mark; 
                }
            }
         }
        function playTicTacToe(elem){
            if ((xCombo) || (oCombo)) {
                alert("game is already over, click button to reset a new game");
                return
            };
            let mark = yourMark;
            let me = document.getElementById(elem);
            
            // if empty spot, it's a valid move, check if you won, if not, I'll make my move
            if (me.innerHTML === " ") {
                me.innerHTML = mark;
                if(!checkWinner(mark)){
                    myMove(myMark);
                }
            } else {
                alert("pick a different spot!");
            }
        }
        function findMyMark(mark){
            myMark = mark;
            //alert(mark);
            if (myMark === "O"){
                yourMark = "X";
            }else{yourMark = "O";}
        }

        function runMatch(elem){
            let clickedImage = document.getElementById(elem);
            let imgS = clickedImage.getAttribute('src');
            let imgArrayIndex = -1;
            imgArrayIndex = parseInt(elem.substring(3));
            
            //console.log(imgArrayIndex);
            if (imgS == "image/avengers.png" )
            {
                
                switch (TOP_ROW[imgArrayIndex]) {
                    case 0:
                        clickedImage.src = "image/capt_america.jpg";
                        break;
                    case 1:
                        clickedImage.src = "image/iron_man.jpg";
                        break;
                    case 2:
                        clickedImage.src = "image/thor.jpg";
                        break;
                    default:  
                        clickedImage.src = "image/avengers.png";
                        break;  
                        
                }
                flipCount += 1;
                flippedList[imgArrayIndex] = true;
                if (flipCount === 1){
                    lastFlipped = TOP_ROW[imgArrayIndex];
                    lastFlippedIndex = imgArrayIndex;
                }
                else if (TOP_ROW[imgArrayIndex] == lastFlipped && flipCount === 2)
                {
                    matchedList[imgArrayIndex] = true;
                    matchedList[lastFlippedIndex] = true;
                    lastFlipped = -1;
                    flipCount = 0;
                    alert("this is a match!");
                } else if (flipCount === 2) {
                    matchedList[imgArrayIndex] = false;
                    matchedList[lastFlippedIndex] = false;
                    lastFlipped = -1;
                    alert("this is not a match!");
                    let i;
                    for (i = 0; i < 6; i++) {
                        let elemNm =  "arr" + i;
                        //console.log(elemNm + " flipcount: " + flipCount + " sts:" + matchedList[i]);
                        if (matchedList[i] === false && flipCount === 2)   
                        {
                            let matchedImage = document.getElementById(elemNm);
                            let imgS = matchedImage.getAttribute('src');
                            matchedImage.src = "image/avengers.png";
                            
                        }
                    }
                    flipCount = 0;
                    
                }
                //console.log("flip count:"+flipCount + " imgindex:" + TOP_ROW[imgArrayIndex] + " lastFlipped:"+lastFlipped);
                      
            }
            else{
                alert("already flipped!");
            }
            let i;
            for (i = 0; i < 5; i++) {
                if (matchedList[i] === false){
                    break;
                }
            }
            console.log(matchedList.join(", "));
            if (i === 5) {
                document.getElementById('message').innerHTML = "You matched them all! Click here to restart.";
                x = document.getElementById("rightGuess");
                x.autoplay =true;
                x.currentTime = 13;
                x.load(); 
            } 

        }
        function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
        }


        function runGame(guess){
            //alert(guess);
            //alert(COLOR_INDEX);
            //alert(COLOR_TARGET);
            if (guess === COLOR_TARGET)
            {
                document.getElementById('message').innerHTML = "You are correct! Click here to restart.";
                x = document.getElementById("rightGuess");
                x.autoplay =true;
                x.currentTime = 13;
                x.load();    
            } else {
                document.getElementById('message').innerHTML = "Sorry " + guess + " is not right, please try again!";
            }
        }
