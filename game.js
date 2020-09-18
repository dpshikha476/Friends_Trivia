const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');


let curQuestion = {}
let CAnswers = true
let score = 0
let questionCount = 0
let QuestionsAvail = []

let questions = [
   {
        question: "In which city is Friends set?",
        choice1: "Los Angeles",
        choice2: "New York City",
        choice3: "Miami",
        choice4: "Seattle",
        answer: 2,
    },
    {
        question: "What's the name of the coffee shop used by the characters?",
        choice1: "St. James Park",
        choice2: "Central Perk",
        choice3: "Froth of Khan",
        choice4: "Daily Grind",
        answer: 2,
    },
    {
        question: "What hangs on Monica's purple door?",
        choice1: "Key hook",
        choice2: "Coat hook",
        choice3: "Photo frame",
        choice4: "Cap",
        answer: 3,
    },
{
        question: "What is the name of Rachel's hairless cat?",
        choice1: "Baldy",
        choice2: "Felix",
        choice3: "Sid",
        choice4: "Whiskerson",
        answer: 4,
    },
{
        question: "Who is Chandler and Joey's TV magazine addressed to?",
        choice1: "Chanandler Bong",
        choice2: "Chanel Beng",
        choice3: "Chandelier Bing",
        choice4: "Rachel Greep",
        answer: 1,
    },
{
        question: "What kind of uniform does Joey wear to Monica and Chandler's wedding?",
        choice1: "Chef",
        choice2: "Soldier",
        choice3: "Fire Fighter",
        choice4: "Football Player",
        answer: 2,
    },
{
        question: "Who sang the Friends theme?",
        choice1: "Banksys",
        choice2: "Da Vince Band",
        choice3: "Constables",
        choice4: "Rembrandts",
        answer: 4,
    },
{
        question: "What job did Chandler do?",
        choice1: "Actor",
        choice2: "Transponster",
        choice3: "Data Processor",
        choice4: "Professor",
        answer: 3,
    },
{
        question: "What is the name of Phoebe's alter-ego?",
        choice1: "Ursula Buffay",
        choice2: "Monica Bing",
        choice3: "Regina Falange",
        choice4: "Pheobe Neeby",
        answer: 3,
    },
{
        question: "What is Chandler's middle name?",
        choice1: "Murial",
        choice2: "Jason",
        choice3: "Kim",
        choice4: "Jackry",
        answer: 1,
    },

{
        question: "Who is Joey’s agent?",
        choice1: "Janine",
        choice2: "Estelle",
        choice3: "Joana",
        choice4: "Rachel",
        answer: 2,
    },
{
        question: "What pet did Ross own?",
        choice1: "A Dog",
        choice2: "A Monkey",
        choice3: "A Cat",
        choice4: "A Rabbit",
        answer: 2,
    },
{
        question: "Which of the following was a working title for the show before they settled on Friends?",
        choice1: "Six of one",
        choice2: "The Squad",
        choice3: "We Six",
        choice4: "Mates",
        answer: 1,
    },
{
        question: "In which city were the show's iconic opening credits filmed?",
        choice1: "Boston",
        choice2: "New York",
        choice3: "Burbank",
        choice4: "London",
        answer: 3,
    },
{
        question: "What store does Phoebe hate?",
        choice1: "Pottery Barn",
        choice2: "Lifestyle",
        choice3: "Mermaid store",
        choice4: "Furnito",
        answer: 1,
    },
{
        question: "Rachel got a job with which company in Paris?",
        choice1: "Ralph Lauren",
        choice2: "Zipper",
        choice3: "Turtle",
        choice4: "Louis Vuitton",
        answer: 4,
    },
{
        question: "Who was the maid of honor at Monica’s wedding?",
        choice1: "Pheobe",
        choice2: "Mindy",
        choice3: "Rachel",
        choice4: "Janice",
        answer: 3,
    },
{
        question: "Phoebe’s scientist boyfriend David worked in what city?",
        choice1: "New York",
        choice2: "Tulsa",
        choice3: "Minsk",
        choice4: "London",
        answer: 3,
    },
{
        question: "Monica dated an ophthalmologist named?",
        choice1: "Joey",
        choice2: "Richard",
        choice3: "Pablo",
        choice4: "Ralph",
        answer: 2,
    },
{
        question: "What is Richard’s daughter’s name?",
        choice1: "Joana",
        choice2: "Michelle",
        choice3: "Janice",
        choice4: "Estelle",
        answer: 2,
    }
]

const POINTS = 10
const MAX = 20

startGame = () => {
    questionCount = 0
    score = 0
    QuestionsAvail = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(QuestionsAvail.length === 0 || questionCount > MAX) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCount++
    progressText.innerText = `Question ${questionCount} of ${MAX}`
    progressBarFull.style.width = `${(questionCount/MAX) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * QuestionsAvail.length)
    curQuestion = QuestionsAvail[questionsIndex]
    question.innerText = curQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = curQuestion['choice' + number]
    })

    QuestionsAvail.splice(questionsIndex, 1)

    CAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!CAnswers) return

        CAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == curQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()