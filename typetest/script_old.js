const quote_url = 'https://agilulf2001.github.io/typetest/out/out'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const speedElement = document.getElementById('speed')
const pauseElement = document.getElementById('pause')

var cnt = 0, sum = 0, tmp = 0, startTime = 0, stopTime = 0, dur = 0, lock = 0
quoteInputElement.addEventListener('keypress', startTimer)
quoteInputElement.addEventListener('keypress', () => {
  if (lock == 1) pause()
  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  const arrayValue = quoteInputElement.value.split('')

  let correct = true
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index]
    if (character == null) {
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
      correct = false
    } else if (character === characterSpan.innerText) {
      cnt = tmp+index+1;
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')
    } else {
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
      correct = false
    }

  })

  if (correct) {
    renderNewQuote()
    tmp = sum
  }
})

async function getRandomQuote() {
  var index = 1001 + Math.floor(Math.random()*2669)
  const quote = await fetch(quote_url + index.toString() + '.txt')
  return quote.text()
}

async function renderNewQuote() {
  const quote = await getRandomQuote()
  sum += quote.length
  quoteDisplayElement.innerHTML = ''
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    quoteDisplayElement.appendChild(characterSpan)
  })
  quoteInputElement.value = null
}

function startTimer() {
  startTime = new Date()
  quoteInputElement.removeEventListener('keypress', startTimer)
  pauseElement.addEventListener('mouseup', pause)
  timerElement.innerText = "0s"
  speed.innerText = "0\twpm"
  setInterval(() => {
    stopTime = new Date()
    if (lock == 0) {
      timer.innerText = Math.floor((stopTime - startTime + dur) / 1000) + "s"
      speed.innerText = Math.floor((cnt / 5) / ((stopTime - startTime + dur) / 60000)) + "\twpm"
    }
  }, 1000)
}

function pause() {
  lock = 1-lock
  if (lock == 1) {
    dur += (new Date() - startTime)
    pauseElement.style.color = "#0faded"
  } else {
    startTime = new Date()
    pauseElement.style.color = "#f0db4f"
  }
}

renderNewQuote()