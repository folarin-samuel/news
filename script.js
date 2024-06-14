const apiKey = "d4756f54d1ad44f0801e6b9bfe189ede";

// const url = 'https://newsapi.org/v2/everything?q=tesla&from=2024-05-11&sortBy=publishedAt&apiKey=d4756f54d1ad44f0801e6b9bfe189ede'

const container = document.querySelector(".container");
const dateEl = document.querySelector(".date");
const searchBtn = document.querySelector("#search-button");
const searchInput = document.querySelector("#search-input");

const date = new Date();
console.log(date);

dateEl.textContent = date.toDateString();

async function getNews(search) {
  try {
    const res = await fetch(`https://newsapi.org/v2/everything?q=${search}&from=2024-05-11&sortBy=publishedAt&apiKey=${apiKey}`);
    const data =  await res.json();

    console.log(data);

    container.innerHTML = ""

    if (data.articles && data.articles.length) {
        data.articles.forEach((article) => {
            const card = document.createElement('div')
            card.classList.add('card')

            if(article.urlToImage) {
                const image = document.createElement('img')
                image.src = article.urlToImage
                image.alt = article.title
                card.appendChild(image)
            }

            const title = document.createElement('h2')
            title.textContent = article.title
            card.appendChild(title)

            if(article.author) {
                const author = document.createComment('h4')
                author.textContent = `${article.author}`

                card.appendChild(author)
            }

            const content = document.createElement('p')
            content.textContent = article.content 
            card.appendChild(content)

            const readMore = document.createElement('a')
            readMore.href = article.url
            readMore.textContent = 'Read more...'
            readMore.target = '_blank'
            card.appendChild(readMore)



            container.appendChild(card)
        })

        
    }



  } catch (error){
    console.error('Error Fetching data')
    const errorMessage = document.createElement('p')
    errorMessage.textContent = "An error accurred while fetching news, try again"
    container.appendChild(errorMessage)
  }
}

searchBtn.addEventListener('click', () => {
    const search = searchInput.value.trim()
    if (search) {
        getNews(search)
        searchInput.value = ""
    }
})



getNews('latest');
