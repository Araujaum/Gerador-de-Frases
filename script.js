const quoteElement = document.getElementById("quote")
const authorElement = document.getElementById("author")
const generateBtn = document.getElementById("generate-btn")
const themeToggle = document.getElementById("theme-toggle")
const body = document.body

// Frases de Step
const localQuotes = [
  {
    text: "Vamos agradecer aos idiotas. Não fosse por eles não faríamos tanto sucesso.",
    author: "Mark Twain",
  },
  {
    text: "O sucesso nasce do querer, da determinação e persistência.",
    author: "José de Alencar",
  },
  {
    text: "Seja a mudança que você quer ver no mundo.",
    author: "Mahatma Gandhi",
  },
  {
    text: "As pessoas felizes lembram o passado com gratidão, alegram-se com o presente e encaram o futuro sem medo.",
    author: "Epicuro",
  },
  { text: "A sorte favorece a mente preparada.", author: "Louis Pasteur" },
]

// Função para buscar uma citação da API
async function fetchQuote() {
  try {
    quoteElement.textContent = "🔄 Buscando frase..."
    authorElement.textContent = ""
    generateBtn.disabled = true

    const response = await fetch("https://api.quotable.io/random")

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    quoteElement.textContent = data.content
    authorElement.textContent = `— ${data.author}`
  } catch (error) {
    console.error("Erro ao buscar a frase:", error)
    fetchLocalQuote() // Se a API falhar, busca uma citação local
  } finally {
    generateBtn.disabled = false
  }
}

// Função para Caso a API esteja fora do ar...
function fetchLocalQuote() {
  const randomIndex = Math.floor(Math.random() * localQuotes.length)
  const randomQuote = localQuotes[randomIndex]

  quoteElement.textContent = randomQuote.text
  authorElement.textContent = `— ${randomQuote.author}`
}

// Click para iniciar a busca.
generateBtn.addEventListener("click", fetchQuote)

// Função para Alternar entre os temas Claro e Escuro
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode")
  themeToggle.textContent = body.classList.contains("dark-mode")
    ? "Modo Claro"
    : "Modo Escuro"
})
