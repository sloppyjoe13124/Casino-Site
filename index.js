const header = document.getElementById("header")
const blackjackBtn = document.getElementById("blackjack-btn")
const rouletteBtn = document.getElementById("roulette-btn")
const menuContainer = document.getElementById("menu-container")
const slotsContainer = document.getElementById("slots-container")
const slotsMoneyDisplay = document.getElementById("slots-money-display")
const blackjackMoneyDisplay = document.getElementById("blackjack-money-display")
const rouletteMoneyDisplay = document.getElementById("roulette-money-display")
const slot1 = document.getElementById("slot1")
const slot2 = document.getElementById("slot2")
const slot3 = document.getElementById("slot3")
const rollSlotBtn = document.getElementById("roll-slot-btn")

let playerMoney = 100
menuContainer.style.display = "flex"
let slotsFinished = false

function updateMoney() {
    slotsMoneyDisplay.innerText = `Money: $${playerMoney}`
    if (blackjackMoneyDisplay) blackjackMoneyDisplay.innerText = `Money: $${playerMoney}`
    if (rouletteMoneyDisplay) rouletteMoneyDisplay.innerText = `Money: $${playerMoney}`
}

// menu buttons
document.getElementById("slots-btn").onclick = function() {
    menuContainer.style.display = "none"
    slotsContainer.style.display = "flex"
    header.innerText = "GO BACK TO MENU"
    header.style.cursor = "pointer"
    updateMoney()
}
document.getElementById("blackjack-btn").onclick = function() {
    menuContainer.style.display = "none"
    header.innerText = "GO BACK TO MENU"
    header.style.cursor = "pointer"
}
document.getElementById("roulette-btn").onclick = function() {
    menuContainer.style.display = "none"
    header.innerText = "GO BACK TO MENU"
    header.style.cursor = "pointer"
}
document.getElementById("header").onclick = function() {
    menuContainer.style.display = "block"
    header.innerText = "Welcome to the Casino"
    header.style.cursor = "default"
}

/* ================================
   OLD BROKEN SLOT MACHINE LOGIC
   ================================
function rollSlot1() {
    slot1Finished = false
    let result = Math.floor(Math.random() * 7) + 1
    let slot = slot1.innerText
    for (let i = 0; i < 10; i++) {
        slot = Number(slot) - 1
        setTimeout(250)
        if (Number(slot) = 0) {
            slot = 7
        }
    }
    slot = result
    slot1Finished = true
}
function rollSlot2() { ... }
function rollSlot3() { ... }
function rollSlots() { ... }
=================================
*/

// ==============================
// FIXED SLOT MACHINE LOGIC
// ==============================
function rollSlot(slotElement, callback) {
        updateMoney()
        let result = Math.floor(Math.random() * 7) + 1;
        let count = 0;
        function spin() {
            let current = Number(slotElement.innerText);
            current = current - 1;
            if (current === 0) current = 7;
            slotElement.innerText = current;

            count++;
            if (count < 10) {
                setTimeout(spin, 50);
            } else {
                slotElement.innerText = result;
                if (callback) callback();
            }
        }

    spin();
    
}

function rollSlots() {
    slotsFinished = false;
    rollSlot(slot1, () => {
        rollSlot(slot2, () => {
            rollSlot(slot3, () => {
                slotsFinished = true;
                console.log("All slots finished!");
                checkSlots();
            });
        });
    });
}

function slotsWin() {
    playerMoney += 20
    updateMoney()
    console.log("You Win! + $20!")
}
function slotsJackpot() {
    playerMoney += 50
    updateMoney()
    console.log("Jackpot! + $50!")
}
function checkSlots() {
    if (slot1.innerText === slot2.innerText && slot1.innerText === slot3.innerText) {
        if (Number(slot1.innerText) === 7) {
            slotsJackpot()
        } else {
            slotsWin()
        }
    } else {
        console.log("You Lose!")
        return
    }
}

document.getElementById("roll-slot-btn").onclick = function() {
    if (playerMoney >= 10) {
        playerMoney -= 10
        rollSlots()
    } else {
        console.log("Get your broke ass outta here!")
        return
    }
}
