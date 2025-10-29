const main = document.querySelector('main')
const strikeBoxContainer = document.getElementById('strike-box-container')
const wordContainer = document.getElementById('word-container')
const keyboard = document.getElementById('keyboard')
const message = document.getElementById('message-container').children[0]
const newGameBtn = document.getElementById('new-game-btn')
const abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const words = [
    'programming',
    'javascript',
    'database',
    'markup',
    'framework',
    'variable',
    'stylesheet',
    'library',
    'asynchronous',
    'hypertext'
]
const underscorePlaceholder = '_'
const strikesAllowed = 6 // adjusts game difficulty
let chosenWord = ''
let rightGuesses = 0
let strikesCounter = 0
let isGameOver = false

// resets game to starting settings
const startNewGame = () => {
    const underscores = document.querySelectorAll('.underscore')
    underscores.forEach(underscore => underscore.classList.remove('grayed-out-text'))
    newGameBtn.classList.add('hidden')

    rightGuesses = 0
    strikesCounter = 0
    isGameOver = false
    message.textContent = ''
    message.classList.remove('red-txt')

    strikeBoxContainer.replaceChildren()
    wordContainer.replaceChildren()
    keyboard.replaceChildren()

    createWordToGuess()
    createKeyboard(abc)
}

// randomizes word and creates an equal amount of underscores
const createWordToGuess = () => {
    // randomizes number within wordlist item amount
    const random = Math.floor(Math.random() * words.length)
    chosenWord = words[random]
    for (let i = 0; i < chosenWord.length; i++) {
        const underscore = document.createElement('span')
        underscore.classList.add('underscore')
        underscore.textContent = underscorePlaceholder
        wordContainer.append(underscore)
    }

    // initializing strike elements based on difficulty
    for (let i = 0; i < strikesAllowed; i++) {
        const strike = document.createElement('span')
        strike.classList.add('strike')
        strikeBoxContainer.append(strike)
    }
}

// creates keyboard buttons based on the alphabets (a-z)
const createKeyboard = (letters) => {
    letters.map(letter => {
        const keyboardBtn = document.createElement('button')
        keyboardBtn.classList.add('keyboard-btn')
        keyboardBtn.textContent = letter
        keyboard.append(keyboardBtn)
        keyboardBtn.addEventListener('click', () => useKeyboard(keyboardBtn, letter))
    })
}

// adds functionality for keyboard button clicks
const useKeyboard = (btn, letter) => {
    const strikes = document.querySelectorAll('.strike')
    if (isGameOver != true && !btn.classList.contains('pressed')) {
        // presses a keyboard button and turns it gray with '.pressed'
        if (strikesCounter < strikesAllowed) {
            handleLetterGuess(letter)
            btn.classList.add('pressed')
        }

        // checks if the game has been won
        if (rightGuesses === chosenWord.length) {
            isGameOver = true
            newGameBtn.classList.remove('hidden')
            strikes.forEach(strike => strike.classList.remove('flashing-animation'))
            message.textContent = 'You win!'
        }

        // ends the game if strikes are up
        if (strikesCounter === strikesAllowed) {
            isGameOver = true
            newGameBtn.classList.remove('hidden')
            strikes.forEach(strike => strike.classList.remove('flashing-animation'))
            message.classList.add('red-txt')
            message.textContent = 'You lose!'
            revealWord()
        }
    }
}

// checks if the letter guess was correct or incorrect
const handleLetterGuess = (letter) => {
    // correct guess calls changeLetter function
    for (let i = 0; i < chosenWord.length; i++) {
        if (chosenWord[i] === letter) {
            changeLetter(letter, i)
            rightGuesses++
        }
    }

    // incorrect guess adds a strike
    if (!chosenWord.includes(letter)) {
        increaseStrikes(strikesCounter)
    }
}

// changes underscore to the equivalent letter when guessed correctly
const changeLetter = (letter, index) => {
    const underscores = document.querySelectorAll('.underscore')
    underscores.forEach((underscore, i) => {
        // finds the matching index
        if (i === index) {
            underscore.textContent = letter
        }
    })
}

// adds a strike, 'x', when the guess is wrong
const increaseStrikes = (index) => {
    const strikes = document.querySelectorAll('.strike')
    strikes.forEach((strike, i) => {
        if (i === index) {
            strike.textContent = 'X'
        }
    })

    strikesCounter++
    
    // if strikes are almost up, a flashing animation starts
    if (strikesCounter === strikesAllowed - 1) {
        strikes.forEach(strike => strike.classList.add('flashing-animation'))
    }
}

// reveals unguessed letters as gray when game is lost
const revealWord = () => {
    const underscores = document.querySelectorAll('.underscore')
    underscores.forEach((underscore, i) => {
        if (underscore.textContent === underscorePlaceholder) {
            underscore.textContent = chosenWord[i]
            underscore.classList.add('grayed-out-text')
        }
    })
}

newGameBtn.addEventListener('click', startNewGame)
createWordToGuess()
createKeyboard(abc)