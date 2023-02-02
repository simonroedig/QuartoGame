var aiActivated = false;
let aiToggle = document.querySelector("#checkMe");
let aiButton = document.querySelector("#aiButton");

if (localStorage.getItem("aiActivatedLocal") == "true") {
    aiButton.innerHTML = "A.I. activated";
    aiToggle.checked = true;
    aiActivated = true;
} else if (localStorage.getItem("aiActivatedLocal") == "false") {
    aiButton.innerHTML = "A.I. deactivated";
    aiToggle.checked = false;
    aiActivated = false;
}

aiToggle.addEventListener("click", () => {
    if (aiActivated == false) {
        aiButton.innerHTML = "A.I. activated";
        aiToggle.checked = true;
        aiActivated = true;
        localStorage.setItem("aiActivatedLocal", "true");
    } else if (aiActivated) {
        aiButton.innerHTML = "A.I. deactivated";
        aiToggle.checked = false;
        aiActivated = false;
        localStorage.setItem("aiActivatedLocal", "false");
    }
});

//Computer functions:
//Choose next stone
function computerRandomNextStone() {

    console.log("%c In Function: computerRandomNextStone", "color: white; background-color: blue; font-weight: bold;");

    document.querySelector("#playField").replaceWith(document.querySelector("#playField").cloneNode(true));

    let startButtonGet = document.querySelector("#startButton");
    startButtonGet.innerHTML = "Place stone";
    startButtonGet.style.backgroundColor = "green";

    let randBetwOneSixteen = Math.floor(Math.random() * (16 - 1 + 1) + 1);
    let randStone = document.querySelector("#stone" + randBetwOneSixteen);
    let completeStoneField = document.querySelector("#stoneField");

    if (completeStoneField.contains(randStone)) {
        //Removes stone from stoneField and adds to nextStoneField
        document.querySelector("#nextStoneField").appendChild(randStone);
    } else {
        //If stone isn't in stoneField anymore call Function again (new random stone)
        computerRandomNextStone();
    }

}
function aiComputerNextStone() {

    console.log("%c In Function: aiComputerNextStone", "color: black; background-color: yellow; font-weight: bold;");

    document.querySelector("#playField").replaceWith(document.querySelector("#playField").cloneNode(true));

    let startButtonGet = document.querySelector("#startButton");
    startButtonGet.innerHTML = "Place stone";
    startButtonGet.style.backgroundColor = "green";

    let completeStoneField = document.querySelector("#stoneField");
    let allStonesOnStoneField = completeStoneField.childNodes.length;

    let circlePlayFieldAll = document.querySelectorAll(".circle");
    let circlePlayField = [];

    let arrCounter2 = 0;
    for (let i = 0; i < circlePlayFieldAll.length; i++) {
        if (circlePlayFieldAll[i].hasChildNodes() == false) {
            circlePlayField[arrCounter2] = circlePlayFieldAll[i];
            arrCounter2++;
        }
    }

    let allStonesOnStoneFieldList = [];

    let arrCounter3 = 0;
    for (let i = 0; i < allStonesOnStoneField; i++) {
        if (completeStoneField.contains(document.querySelector("#stone" + [i]))) {
            allStonesOnStoneFieldList[arrCounter3] = document.querySelector("#stone" + [i]);
            arrCounter3++;
        }
    }

    /*
    circlePlayField: Array of all empty circles;
    allStonesOnStoneFieldList: Array of all available stones;
    */
    let listOfStonesWHITHQuartoPossible = [];
    let listOfStonesWhithNoQuartoPossible = [];
    let counterC = 0;

    for (let i = 0; i < allStonesOnStoneFieldList.length; i++) {
        for (let j = 0; j < circlePlayField.length; j++) {

            circlePlayField[j].appendChild(allStonesOnStoneFieldList[i]);

            if (checkIfQuartoWithoutEnding() == true) {
                listOfStonesWHITHQuartoPossible[counterC] = allStonesOnStoneFieldList[i];
                counterC++;
            }

            completeStoneField.appendChild(allStonesOnStoneFieldList[i]);
        }
    }
    let listOfStonesWHITHQuartoPossibleWithoutDuplicate = [...new Set(listOfStonesWHITHQuartoPossible)];
    listOfStonesWhithNoQuartoPossible = allStonesOnStoneFieldList.filter(x => !listOfStonesWHITHQuartoPossibleWithoutDuplicate.includes(x));

    //Next stone is stone out of list: listOfStonesWhithNoQuartoPossible
    if (listOfStonesWhithNoQuartoPossible.length > 0) {
        //Random number between 0 and listOfStonesWhithNoQuartoPossible
        let ranBetwZeroListNoQuarto = Math.floor(Math.random() * listOfStonesWhithNoQuartoPossible.length);
        document.querySelector("#nextStoneField").appendChild(listOfStonesWhithNoQuartoPossible[ranBetwZeroListNoQuarto]);

    } else if (listOfStonesWhithNoQuartoPossible.length == 0) {
        computerRandomNextStone();
    }

    /*
    Falls human mit irgendwelchen steinen Quarto erreicht,
    gibt ihm steine mit denen Quarto nicht möglich ist
    */
}
//Place stone
function computerSetsNextStoneToPlayField() {

    console.log("%c In Function: computerSetsNextStoneToPlayField", "color: white; background-color: blue; font-weight: bold;");

    let allStones = document.querySelectorAll(".stone");
    for (let i = 0; i < allStones.length; i++) {
        //document.querySelector("#stone" + [i+1]).replaceWith(document.querySelector("#stone" + [i+1]).cloneNode(true));
        document.querySelector("#stone" + [i+1]).setAttribute("draggable", false);
        document.querySelector("#stone" + [i+1]).style.cursor = "default";
    }

    let startButtonGet = document.querySelector("#startButton");
    startButtonGet.innerHTML = "Computer chooses next stone...";
    startButtonGet.style.backgroundColor = "red";

    let nextStoneFieldsChild = document.querySelector("#nextStoneField").firstChild;
    let circlePlayFieldAll = document.querySelectorAll(".circle");
    let circlePlayField = [];

    let arrCounter2 = 0;
    for (let i = 0; i < circlePlayFieldAll.length; i++) {
        if (circlePlayFieldAll[i].hasChildNodes() == false) {
            circlePlayField[arrCounter2] = circlePlayFieldAll[i];
            arrCounter2++;
        }
    }

    let freeCircles = circlePlayField.length;
    let randBetwZeroFreeCirclesAmmount = Math.floor(Math.random() * freeCircles);

    circlePlayField[randBetwZeroFreeCirclesAmmount].appendChild(nextStoneFieldsChild);

    if (checkIfQuarto("You lost :(").hit == true) {
        let quartoBut = document.querySelector("#quartoButton");
        quartoBut.style.cursor = "pointer";
        quartoBut.innerHTML = "Click to play again";
        quartoBut.style.textDecoration = "underline";
        quartoBut.addEventListener("click", () => {
            location.reload(true);
        });
        //All stones are undraggable and no cursor
        let allStones = document.querySelectorAll(".stone");
        for (let i = 0; i < allStones.length; i++) {
            //document.querySelector("#stone" + [i+1]).replaceWith(document.querySelector("#stone" + [i+1]).cloneNode(true));
            document.querySelector("#stone" + [i+1]).setAttribute("draggable", false);
            document.querySelector("#stone" + [i+1]).style.cursor = "default";
        }

    } else {
        if (aiActivated == false) {
            setTimeout(computerRandomNextStone, 2000);
        } else {
            setTimeout(aiComputerNextStone, 2000);
        }
        setTimeout(dragFromNextStoneFieldToPlayField, 2100);
    }
}
function aiComputerSetsNextStoneToPlayField() {

    console.log("%c In Function: aiComputerSetsNextStoneToPlayField", "color: black; background-color: yellow; font-weight: bold;");

    let allStones = document.querySelectorAll(".stone");
    for (let i = 0; i < allStones.length; i++) {
        //document.querySelector("#stone" + [i+1]).replaceWith(document.querySelector("#stone" + [i+1]).cloneNode(true));
        document.querySelector("#stone" + [i+1]).setAttribute("draggable", false);
        document.querySelector("#stone" + [i+1]).style.cursor = "default";
    }

    let startButtonGet = document.querySelector("#startButton");
    startButtonGet.innerHTML = "Computer chooses next stone...";
    startButtonGet.style.backgroundColor = "red";

    let nextStoneFieldsChild = document.querySelector("#nextStoneField").firstChild;
    let circlePlayFieldAll = document.querySelectorAll(".circle");
    let circlePlayField = [];

    let arrCounter2 = 0;
    for (let i = 0; i < circlePlayFieldAll.length; i++) {
        if (circlePlayFieldAll[i].hasChildNodes() == false) {
            circlePlayField[arrCounter2] = circlePlayFieldAll[i];
            arrCounter2++;
        }
    }

    let bestMove = 0;
    //circlePlayField is a list of all empty circles where stone could be placed
    //If AI can quarto on next draw he will
    for (let i = 0; i < circlePlayField.length; i++) {
        circlePlayField[i].appendChild(nextStoneFieldsChild);
        if (checkIfQuarto("You lost :(").hit == true) {
            bestMove++;
            break;
        } else {
            circlePlayField[i].removeChild(nextStoneFieldsChild);
        }
    }
    if (bestMove == 0) {
        document.querySelector("#nextStoneField").appendChild(nextStoneFieldsChild);
        let freeCircles = circlePlayField.length;
        let randBetwZeroFreeCirclesAmmount = Math.floor(Math.random() * freeCircles);

        circlePlayField[randBetwZeroFreeCirclesAmmount].appendChild(nextStoneFieldsChild);
    }

    if (checkIfQuarto("You lost :(").hit == true) {
        let quartoBut = document.querySelector("#quartoButton");
        quartoBut.style.cursor = "pointer";
        quartoBut.innerHTML = "Click to play again";
        quartoBut.style.textDecoration = "underline";
        quartoBut.addEventListener("click", () => {
            location.reload(true);
        });
        //All stones are undraggable and no cursor
        let allStones = document.querySelectorAll(".stone");
        for (let i = 0; i < allStones.length; i++) {
            //document.querySelector("#stone" + [i+1]).replaceWith(document.querySelector("#stone" + [i+1]).cloneNode(true));
            document.querySelector("#stone" + [i+1]).setAttribute("draggable", false);
            document.querySelector("#stone" + [i+1]).style.cursor = "default";
        }

    } else {
        if (aiActivated == false) {
            setTimeout(computerRandomNextStone, 2000);
        } else {
            setTimeout(aiComputerNextStone, 2000);
        }
        setTimeout(dragFromNextStoneFieldToPlayField, 2100);
    }
}

//Human functions:
//Place stone
function dragFromNextStoneFieldToPlayField() {

    document.querySelector("#playField").replaceWith(document.querySelector("#playField").cloneNode(true));
    document.querySelector("#stoneField").replaceWith(document.querySelector("#stoneField").cloneNode(true));
    document.querySelector("#nextStoneField").replaceWith(document.querySelector("#nextStoneField").cloneNode(true));

    //All stones are undraggable and no cursor
    let allStones = document.querySelectorAll(".stone");
    for (let i = 0; i < allStones.length; i++) {
        //document.querySelector("#stone" + [i+1]).replaceWith(document.querySelector("#stone" + [i+1]).cloneNode(true));
        document.querySelector("#stone" + [i+1]).setAttribute("draggable", false);
        document.querySelector("#stone" + [i+1]).style.cursor = "default";
    }

    //dragNextStone = one and only child from nextStoneField parent
    let dragNextStone = document.querySelector("#nextStoneField").firstChild;

    //Only next stone is draggable and cursor
    dragNextStone.setAttribute("draggable", true);
    dragNextStone.style.cursor = "grabbing";

    let putCirclePlayFieldAll = document.querySelectorAll(".circle");
    let putCirclePlayField = [];

    //Exclude circles that already have a child (= stone placed)
    let arrCounter = 0;
    for (let i = 0; i < putCirclePlayFieldAll.length; i++) {
        if (putCirclePlayFieldAll[i].hasChildNodes() == false) {
            putCirclePlayField[arrCounter] = putCirclePlayFieldAll[i];
            arrCounter++;
        }
    }

    dragNextStone.classList.add("cursorPointer");

    dragNextStone.addEventListener("dragstart", () => {

    });

    putCirclePlayField.forEach(circle => {
        circle.addEventListener("dragover", e => {
            e.preventDefault();
            circle.classList.add("draggedOver");
        });
    });

    putCirclePlayField.forEach(circle => {
        circle.addEventListener("dragleave", () => {
            circle.classList.remove("draggedOver");
        });
    });

    putCirclePlayField.forEach(circle => {
        circle.addEventListener("drop", () => {
            circle.classList.remove("draggedOver");

            if (circle.hasChildNodes() == false) {
                let dragNextStone = document.querySelector("#nextStoneField").firstChild;
                circle.appendChild(dragNextStone);
                dragFromStoneFieldToNextStoneField();

                if (checkIfQuarto("You won :)").hit == true) {
                    let quartoBut = document.querySelector("#quartoButton");
                    quartoBut.style.cursor = "pointer";
                    quartoBut.innerHTML = "Click to play again";
                    quartoBut.style.textDecoration = "underline";
                    //Prevent placing of stone onto nextStoneField again
                    document.querySelector("#stoneField").replaceWith(document.querySelector("#stoneField").cloneNode(true));
                    quartoBut.addEventListener("click", () => {
                        location.reload(true);
                    });

                    //All stones are undraggable and no cursor
                    let allStones = document.querySelectorAll(".stone");
                    for (let i = 0; i < allStones.length; i++) {
                        //document.querySelector("#stone" + [i+1]).replaceWith(document.querySelector("#stone" + [i+1]).cloneNode(true));
                        document.querySelector("#stone" + [i+1]).setAttribute("draggable", false);
                        document.querySelector("#stone" + [i+1]).style.cursor = "default";
                    }

                }

            }
        });
    });

    putCirclePlayField.forEach(circle => {
        circle.addEventListener("click", () => {
            circle.classList.remove("draggedOver");

            if (circle.hasChildNodes() == false) {
                let dragNextStone = document.querySelector("#nextStoneField").firstChild;
                circle.appendChild(dragNextStone);
                dragFromStoneFieldToNextStoneField();

                if (checkIfQuarto("You won :)").hit == true) {
                    let quartoBut = document.querySelector("#quartoButton");
                    quartoBut.style.cursor = "pointer";
                    quartoBut.innerHTML = "Click to play again";
                    quartoBut.style.textDecoration = "underline";
                    //Prevent placing of stone onto nextStoneField again
                    document.querySelector("#stoneField").replaceWith(document.querySelector("#stoneField").cloneNode(true));
                    quartoBut.addEventListener("click", () => {
                        location.reload(true);
                    });

                    //All stones are undraggable and no cursor
                    let allStones = document.querySelectorAll(".stone");
                    for (let i = 0; i < allStones.length; i++) {
                        //document.querySelector("#stone" + [i+1]).replaceWith(document.querySelector("#stone" + [i+1]).cloneNode(true));
                        document.querySelector("#stone" + [i+1]).setAttribute("draggable", false);
                        document.querySelector("#stone" + [i+1]).style.cursor = "default";
                    }

                }

            }
        });
    });



}
//Choose next stone
function dragFromStoneFieldToNextStoneField() {

    document.querySelector("#playField").replaceWith(document.querySelector("#playField").cloneNode(true));
    document.querySelector("#stoneField").replaceWith(document.querySelector("#stoneField").cloneNode(true));

    //All stones are undraggable and no cursor
    let allStones = document.querySelectorAll(".stone");
    for (let i = 0; i < allStones.length; i++) {
        //document.querySelector("#stone" + [i+1]).replaceWith(document.querySelector("#stone" + [i+1]).cloneNode(true));
        document.querySelector("#stone" + [i+1]).setAttribute("draggable", false);
        document.querySelector("#stone" + [i+1]).style.cursor = "default";
    }

    let startButtonGet = document.querySelector("#startButton");
    startButtonGet.innerHTML = "Choose stone for computer";
    startButtonGet.style.backgroundColor = "green";

    //Only stones on stone field are draggable and have cursor
    let dragStone = document.querySelector("#stoneField").querySelectorAll(".stone");
    for (let i = 0; i < dragStone.length; i++) {
        dragStone[i].setAttribute("draggable", true);
        dragStone[i].style.cursor = "grabbing";
    }

    let putCircleNextStoneField = document.querySelector("#nextStoneField");
    let currentStone;

    putCircleNextStoneField.setAttribute("draggable", false);

    dragStone.forEach(stone => {
        stone.classList.add("cursorPointer");
    });

    dragStone.forEach(stone => {
        stone.addEventListener("dragstart", () => {
            currentStone = stone;
        });

        //ADDED RECENTLY:
        stone.addEventListener("click", () => {
            currentStone = stone;
            if (putCircleNextStoneField.hasChildNodes() == false && currentStone.parentNode.id == "stoneField") {
                putCircleNextStoneField.appendChild(currentStone);
    
                let startButtonGet = document.querySelector("#startButton");
                startButtonGet.innerHTML = "Computer is placing stone...";
                startButtonGet.style.backgroundColor = "red";
    
                //All stones are undraggable and no cursor
                let allStones = document.querySelectorAll(".stone");
                for (let i = 0; i < allStones.length; i++) {
                    //document.querySelector("#stone" + [i+1]).replaceWith(document.querySelector("#stone" + [i+1]).cloneNode(true));
                    document.querySelector("#stone" + [i+1]).setAttribute("draggable", false);
                    document.querySelector("#stone" + [i+1]).style.cursor = "default";
                }
    
                //Prevent placing of stone onto nextStoneField again
                document.querySelector("#stoneField").replaceWith(document.querySelector("#stoneField").cloneNode(true));
                document.querySelector("#nextStoneField").replaceWith(document.querySelector("#nextStoneField").cloneNode(true));
    
                if (aiActivated == false) {
                    setTimeout(computerSetsNextStoneToPlayField, 2000);
                } else {
                    setTimeout(aiComputerSetsNextStoneToPlayField, 2000);
                }
            }
        });
    });


    putCircleNextStoneField.addEventListener("dragover", e => {
        e.preventDefault();
        putCircleNextStoneField.classList.add("draggedOverNextStoneField");
    });

    putCircleNextStoneField.addEventListener("dragleave", e => {
        putCircleNextStoneField.classList.remove("draggedOverNextStoneField");
    });

    putCircleNextStoneField.addEventListener("drop", e => {
        putCircleNextStoneField.classList.remove("draggedOverNextStoneField");

        if (putCircleNextStoneField.hasChildNodes() == false && currentStone.parentNode.id == "stoneField") {
            putCircleNextStoneField.appendChild(currentStone);

            let startButtonGet = document.querySelector("#startButton");
            startButtonGet.innerHTML = "Computer is placing stone...";
            startButtonGet.style.backgroundColor = "red";

            //All stones are undraggable and no cursor
            let allStones = document.querySelectorAll(".stone");
            for (let i = 0; i < allStones.length; i++) {
                //document.querySelector("#stone" + [i+1]).replaceWith(document.querySelector("#stone" + [i+1]).cloneNode(true));
                document.querySelector("#stone" + [i+1]).setAttribute("draggable", false);
                document.querySelector("#stone" + [i+1]).style.cursor = "default";
            }

            //Prevent placing of stone onto nextStoneField again
            document.querySelector("#stoneField").replaceWith(document.querySelector("#stoneField").cloneNode(true));
            document.querySelector("#nextStoneField").replaceWith(document.querySelector("#nextStoneField").cloneNode(true));

            if (aiActivated == false) {
                setTimeout(computerSetsNextStoneToPlayField, 2000);
            } else {
                setTimeout(aiComputerSetsNextStoneToPlayField, 2000);
            }
        }
    });

}

//Init function:
function gameStart() {

    console.log("%c In Function: gameStart", "color: white; background-color: red; font-weight: bold;");

    let whoStarts = ["The computer will start the game...", "You will start the game..."];
    let randBetwZeroOne = Math.floor(Math.random() * 2);

    let startButtonGet = document.querySelector("#startButton");
    startButtonGet.addEventListener("click", function handler () {
        startButtonGet.innerHTML = whoStarts[randBetwZeroOne];
        startButtonGet.style.backgroundColor = "red";
        if (randBetwZeroOne == 0) {
            //Computer starts
            startButtonGet.removeEventListener("click", handler);
            startButtonGet.style.cursor = "default";
            if (aiActivated == false) {
                setTimeout(computerRandomNextStone, 2000);
            } else {
                setTimeout(aiComputerNextStone, 2000);
            }
            setTimeout(dragFromNextStoneFieldToPlayField, 2100);

        } else if (randBetwZeroOne == 1) {
            //You start
            startButtonGet.removeEventListener("click", handler);
            startButtonGet.style.cursor = "default";
            setTimeout(dragFromStoneFieldToNextStoneField, 2000);
        }
    });

}

//checks if quarto
function checkIfQuartoWithoutEnding() {
    let isQuarto = false;

    let c1 = document.querySelector("#circle1");
    let c2 = document.querySelector("#circle2");
    let c3 = document.querySelector("#circle3");
    let c4 = document.querySelector("#circle4");

    let c5 = document.querySelector("#circle5");
    let c6 = document.querySelector("#circle6");
    let c7 = document.querySelector("#circle7");
    let c8 = document.querySelector("#circle8");

    let c9 = document.querySelector("#circle9");
    let c10 = document.querySelector("#circle10");
    let c11 = document.querySelector("#circle11");
    let c12 = document.querySelector("#circle12");

    let c13 = document.querySelector("#circle13");
    let c14 = document.querySelector("#circle14");
    let c15 = document.querySelector("#circle15");
    let c16 = document.querySelector("#circle16");

    let winningSubString = ["1","2","c","r","s","b","h","n"];
    let winningSubStringProperty = ["color: yellow", "color: brown", "shape: circle", "shape: rectangle", "size: small", "size: big", "hole in stone property", "no hole in stone property"]
    let realWinningProperty = [];
    let winningPropertyCounter = 0;
    //rows
    if (c1.hasChildNodes() && c2.hasChildNodes() && c3.hasChildNodes() && c4.hasChildNodes()) {
        for (let i = 0; i < winningSubString.length; i++) {
            if (c1.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c2.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c3.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c4.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i])) {

                    realWinningProperty[winningPropertyCounter] = winningSubStringProperty[i];
                    winningPropertyCounter++;

                    isQuarto = true;
                }
        }
    }

    if (c5.hasChildNodes() && c6.hasChildNodes() && c7.hasChildNodes() && c8.hasChildNodes()) {
        for (let i = 0; i < winningSubString.length; i++) {
            if (c5.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c6.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c7.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c8.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i])) {

                    realWinningProperty[winningPropertyCounter] = winningSubStringProperty[i];
                    winningPropertyCounter++;

                    isQuarto = true;
                }
        }
    }
    if (c9.hasChildNodes() && c10.hasChildNodes() && c11.hasChildNodes() && c12.hasChildNodes()) {
        for (let i = 0; i < winningSubString.length; i++) {
            if (c9.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c10.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c11.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c12.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i])) {

                    realWinningProperty[winningPropertyCounter] = winningSubStringProperty[i];
                    winningPropertyCounter++;

                    isQuarto = true;
                }
        }
    }
    if (c13.hasChildNodes() && c14.hasChildNodes() && c15.hasChildNodes() && c16.hasChildNodes()) {
        for (let i = 0; i < winningSubString.length; i++) {
            if (c13.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c14.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c15.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c16.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i])) {

                    realWinningProperty[winningPropertyCounter] = winningSubStringProperty[i];
                    winningPropertyCounter++;

                    isQuarto = true;
                }
        }
    }

    //coloums
    if (c1.hasChildNodes() && c5.hasChildNodes() && c9.hasChildNodes() && c13.hasChildNodes()) {
        for (let i = 0; i < winningSubString.length; i++) {
            if (c1.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c5.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c9.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c13.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i])) {

                    realWinningProperty[winningPropertyCounter] = winningSubStringProperty[i];
                    winningPropertyCounter++;

                    isQuarto = true;
                }
        }
    }
    if (c2.hasChildNodes() && c6.hasChildNodes() && c10.hasChildNodes() && c14.hasChildNodes()) {
        for (let i = 0; i < winningSubString.length; i++) {
            if (c2.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c6.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c10.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c14.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i])) {

                    realWinningProperty[winningPropertyCounter] = winningSubStringProperty[i];
                    winningPropertyCounter++;

                    isQuarto = true;
                }
        }
    }
    if (c3.hasChildNodes() && c7.hasChildNodes() && c11.hasChildNodes() && c15.hasChildNodes()) {
        for (let i = 0; i < winningSubString.length; i++) {
            if (c3.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c7.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c11.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c15.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i])) {

                    realWinningProperty[winningPropertyCounter] = winningSubStringProperty[i];
                    winningPropertyCounter++;

                    isQuarto = true;
                }
        }
    }
    if (c4.hasChildNodes() && c8.hasChildNodes() && c12.hasChildNodes() && c16.hasChildNodes()) {
        for (let i = 0; i < winningSubString.length; i++) {
            if (c4.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c8.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c12.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c16.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i])) {

                    realWinningProperty[winningPropertyCounter] = winningSubStringProperty[i];
                    winningPropertyCounter++;

                    isQuarto = true;
                }
        }
    }

    //diagonals
    if (c4.hasChildNodes() && c7.hasChildNodes() && c10.hasChildNodes() && c13.hasChildNodes()) {
        for (let i = 0; i < winningSubString.length; i++) {
            if (c4.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c7.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c10.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c13.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i])) {

                    realWinningProperty[winningPropertyCounter] = winningSubStringProperty[i];
                    winningPropertyCounter++;

                    isQuarto = true;
                }
        }
    }
    if (c1.hasChildNodes() && c6.hasChildNodes() && c11.hasChildNodes() && c16.hasChildNodes()) {
        for (let i = 0; i < winningSubString.length; i++) {
            if (c1.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c6.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c11.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c16.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i])) {

                    realWinningProperty[winningPropertyCounter] = winningSubStringProperty[i];
                    winningPropertyCounter++;

                    isQuarto = true;
                }
        }
    }

    //Tie
    if (c1.hasChildNodes() && c2.hasChildNodes() && c3.hasChildNodes() && c4.hasChildNodes() &&
        c5.hasChildNodes() && c6.hasChildNodes() && c7.hasChildNodes() && c8.hasChildNodes() &&
        c9.hasChildNodes() && c10.hasChildNodes() && c11.hasChildNodes() && c12.hasChildNodes() &&
        c13.hasChildNodes() && c14.hasChildNodes() && c15.hasChildNodes() && c16.hasChildNodes() &&
        isQuarto == false) {
            isQuarto = false;

    }
    return isQuarto;
}
function checkIfQuarto(funcPara) {
    let isQuarto = false;
    let strPara = funcPara;

    let isQuartoObj = {
        hit: false,
        winner: "tie" //Computer wins: "pc", human wins: "hu", tie: "tie"
    };
    //Possible winning rows, coloums, diagonals:
    //rows: 1,2,3,4 / 5,6,7,8 / 9,10,11,12 / 13,14,15,16
    //coloums: 1,5,9,13 / 2,6,10,14 / 3,7,11,15 / 4,8,12,16
    //diagonals: 4,7,10,13 / 1,6,11,16

    let c1 = document.querySelector("#circle1");
    let c2 = document.querySelector("#circle2");
    let c3 = document.querySelector("#circle3");
    let c4 = document.querySelector("#circle4");

    let c5 = document.querySelector("#circle5");
    let c6 = document.querySelector("#circle6");
    let c7 = document.querySelector("#circle7");
    let c8 = document.querySelector("#circle8");

    let c9 = document.querySelector("#circle9");
    let c10 = document.querySelector("#circle10");
    let c11 = document.querySelector("#circle11");
    let c12 = document.querySelector("#circle12");

    let c13 = document.querySelector("#circle13");
    let c14 = document.querySelector("#circle14");
    let c15 = document.querySelector("#circle15");
    let c16 = document.querySelector("#circle16");

    /*
    let str = c1.firstChild.getAttribute("src").slice(4, 8);
    alert(str);
    */

    //Check if possible winning rows, coloums, diagonals have child (= stone)
    //If they all have child, check if those 4 stones have winning properties

    //Winning properties:
    //every stone have the same substring of either:
    //1,2,c,r,s,b,h,n
    //1: Same color, 2: same color, c: all circle, r: all rectangle,
    //s: all small, b: all big, h: all holes, n: all no-holes

    //length = 8 (0 - 7)
    let winningSubString = ["1","2","c","r","s","b","h","n"];
    let winningSubStringProperty = ["color: yellow", "color: brown", "shape: circle", "shape: rectangle", "size: small", "size: big", "hole in stone property", "no hole in stone property"]
    let realWinningProperty = [];
    let winningPropertyCounter = 0;
    //rows
    if (c1.hasChildNodes() && c2.hasChildNodes() && c3.hasChildNodes() && c4.hasChildNodes()) {
        for (let i = 0; i < winningSubString.length; i++) {
            if (c1.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c2.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c3.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c4.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i])) {

                    realWinningProperty[winningPropertyCounter] = winningSubStringProperty[i];
                    winningPropertyCounter++;

                    c1.classList.add("quartoGreen");
                    c2.classList.add("quartoGreen");
                    c3.classList.add("quartoGreen");
                    c4.classList.add("quartoGreen");

                    isQuarto = true;
                }
        }
    }

    if (c5.hasChildNodes() && c6.hasChildNodes() && c7.hasChildNodes() && c8.hasChildNodes()) {
        for (let i = 0; i < winningSubString.length; i++) {
            if (c5.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c6.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c7.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c8.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i])) {

                    realWinningProperty[winningPropertyCounter] = winningSubStringProperty[i];
                    winningPropertyCounter++;

                    c5.classList.add("quartoGreen");
                    c6.classList.add("quartoGreen");
                    c7.classList.add("quartoGreen");
                    c8.classList.add("quartoGreen");

                    isQuarto = true;
                }
        }
    }
    if (c9.hasChildNodes() && c10.hasChildNodes() && c11.hasChildNodes() && c12.hasChildNodes()) {
        for (let i = 0; i < winningSubString.length; i++) {
            if (c9.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c10.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c11.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c12.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i])) {

                    realWinningProperty[winningPropertyCounter] = winningSubStringProperty[i];
                    winningPropertyCounter++;

                    c9.classList.add("quartoGreen");
                    c10.classList.add("quartoGreen");
                    c11.classList.add("quartoGreen");
                    c12.classList.add("quartoGreen");

                    isQuarto = true;
                }
        }
    }
    if (c13.hasChildNodes() && c14.hasChildNodes() && c15.hasChildNodes() && c16.hasChildNodes()) {
        for (let i = 0; i < winningSubString.length; i++) {
            if (c13.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c14.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c15.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c16.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i])) {

                    realWinningProperty[winningPropertyCounter] = winningSubStringProperty[i];
                    winningPropertyCounter++;

                    c13.classList.add("quartoGreen");
                    c14.classList.add("quartoGreen");
                    c15.classList.add("quartoGreen");
                    c16.classList.add("quartoGreen");

                    isQuarto = true;
                }
        }
    }

    //coloums
    if (c1.hasChildNodes() && c5.hasChildNodes() && c9.hasChildNodes() && c13.hasChildNodes()) {
        for (let i = 0; i < winningSubString.length; i++) {
            if (c1.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c5.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c9.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c13.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i])) {

                    realWinningProperty[winningPropertyCounter] = winningSubStringProperty[i];
                    winningPropertyCounter++;

                    c1.classList.add("quartoGreen");
                    c5.classList.add("quartoGreen");
                    c9.classList.add("quartoGreen");
                    c13.classList.add("quartoGreen");

                    isQuarto = true;
                }
        }
    }
    if (c2.hasChildNodes() && c6.hasChildNodes() && c10.hasChildNodes() && c14.hasChildNodes()) {
        for (let i = 0; i < winningSubString.length; i++) {
            if (c2.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c6.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c10.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c14.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i])) {

                    realWinningProperty[winningPropertyCounter] = winningSubStringProperty[i];
                    winningPropertyCounter++;

                    c2.classList.add("quartoGreen");
                    c6.classList.add("quartoGreen");
                    c10.classList.add("quartoGreen");
                    c14.classList.add("quartoGreen");

                    isQuarto = true;
                }
        }
    }
    if (c3.hasChildNodes() && c7.hasChildNodes() && c11.hasChildNodes() && c15.hasChildNodes()) {
        for (let i = 0; i < winningSubString.length; i++) {
            if (c3.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c7.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c11.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c15.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i])) {

                    realWinningProperty[winningPropertyCounter] = winningSubStringProperty[i];
                    winningPropertyCounter++;

                    c3.classList.add("quartoGreen");
                    c7.classList.add("quartoGreen");
                    c11.classList.add("quartoGreen");
                    c15.classList.add("quartoGreen");

                    isQuarto = true;
                }
        }
    }
    if (c4.hasChildNodes() && c8.hasChildNodes() && c12.hasChildNodes() && c16.hasChildNodes()) {
        for (let i = 0; i < winningSubString.length; i++) {
            if (c4.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c8.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c12.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c16.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i])) {

                    realWinningProperty[winningPropertyCounter] = winningSubStringProperty[i];
                    winningPropertyCounter++;

                    c4.classList.add("quartoGreen");
                    c8.classList.add("quartoGreen");
                    c12.classList.add("quartoGreen");
                    c16.classList.add("quartoGreen");

                    isQuarto = true;
                }
        }
    }

    //diagonals
    if (c4.hasChildNodes() && c7.hasChildNodes() && c10.hasChildNodes() && c13.hasChildNodes()) {
        for (let i = 0; i < winningSubString.length; i++) {
            if (c4.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c7.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c10.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c13.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i])) {

                    realWinningProperty[winningPropertyCounter] = winningSubStringProperty[i];
                    winningPropertyCounter++;

                    c4.classList.add("quartoGreen");
                    c7.classList.add("quartoGreen");
                    c10.classList.add("quartoGreen");
                    c13.classList.add("quartoGreen");

                    isQuarto = true;
                }
        }
    }
    if (c1.hasChildNodes() && c6.hasChildNodes() && c11.hasChildNodes() && c16.hasChildNodes()) {
        for (let i = 0; i < winningSubString.length; i++) {
            if (c1.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c6.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c11.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i]) &&
                c16.firstChild.getAttribute("src").slice(4, 8).includes(winningSubString[i])) {

                    realWinningProperty[winningPropertyCounter] = winningSubStringProperty[i];
                    winningPropertyCounter++;

                    c1.classList.add("quartoGreen");
                    c6.classList.add("quartoGreen");
                    c11.classList.add("quartoGreen");
                    c16.classList.add("quartoGreen");

                    isQuarto = true;
                }
        }
    }

    //Tie
    if (c1.hasChildNodes() && c2.hasChildNodes() && c3.hasChildNodes() && c4.hasChildNodes() &&
        c5.hasChildNodes() && c6.hasChildNodes() && c7.hasChildNodes() && c8.hasChildNodes() &&
        c9.hasChildNodes() && c10.hasChildNodes() && c11.hasChildNodes() && c12.hasChildNodes() &&
        c13.hasChildNodes() && c14.hasChildNodes() && c15.hasChildNodes() && c16.hasChildNodes() &&
        isQuarto == false) {
            let startButtonGet = document.querySelector("#startButton");
            startButtonGet.innerHTML = "It's a tie! No one won!";
            startButtonGet.style.backgroundColor = "purple";

            let quartoBut = document.querySelector("#quartoButton");
            quartoBut.style.cursor = "pointer";
            quartoBut.innerHTML = "Click to play again";
            quartoBut.style.textDecoration = "underline";
            quartoBut.addEventListener("click", () => {
                location.reload(true);
            });

    }

    if (isQuarto) {
        //May log more than one winning property (max = 2)
        //It can happen that with one stone placed a row AND coloum or row/coloum AND diagonal is quarto
        //the realWinningProperty length will still be max = 2

        if (realWinningProperty.length == 1) {
            let startButtonGet = document.querySelector("#startButton");
            startButtonGet.innerHTML = "QUARTOOOO! " + strPara + " All four stones have the same " + realWinningProperty[0] + "!";
            startButtonGet.style.backgroundColor = "purple";
        }
        if (realWinningProperty.length == 2) {
            let startButtonGet = document.querySelector("#startButton");
            startButtonGet.innerHTML = "QUARTOOOO! " + strPara + " All four stones have the same " + realWinningProperty[0] + " & " + realWinningProperty[1] + "!";
            startButtonGet.style.backgroundColor = "purple";
        }

        if (strPara == "You won :)") {
            isQuartoObj.winner = "hu";
        } else if (strPara == "You lost :(") {
            isQuartoObj.winner = "pc";
        }

    }

    isQuartoObj.hit = isQuarto;
    return isQuartoObj;
}

gameStart();
