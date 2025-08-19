const quote = document.querySelector('.quote');
const quoteButton = document.querySelector('.quote-button');
quotes = [
    {
        quote: 'The purpose of our lives is to be happy.',
        author: 'Dalai Lama'
    },
    {
        quote: 'Be yourself; everyone else is already taken.',
        author: 'Oscar Wilde'
    },
    {
        quote: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
        author: 'Albert Einstein'
    },
    {
        quote: "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.",
        author: 'Bernard M. Baruch'
    },
    {
        quote: 'You only live once, but if you do it right, once is enough.',
        author: 'Mae West'
    },
    {
        quote: 'Be the change that you wish to see in the world.',
        author: 'Mahatma Gandhi'
    },
    {
        quote: "Don’t walk in front of me… I may not follow Don’t walk behind me… I may not lead Walk beside me… just be my friend",
        author: 'Albert Camus'
    },
    {
        quote: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
        author: 'Maya Angelou'
    },
    {
        quote: 'A friend is someone who knows all about you and still loves you.',
        author: 'Elbert Hubbard'
    }
]
var lastrandom;
function newQuote() {
    i = Math.floor(Math.random() * quotes.length);
    while (i == lastrandom) {
        i = Math.floor(Math.random() * quotes.length);
    }
    lastrandom = i;
    const randomQuote = quotes[lastrandom];
    quote.innerHTML = `
        <p class="quote-line">"${randomQuote.quote}"</p>
        <p class="quote-author">--${randomQuote.author}</p>
    `;
}
quoteButton.addEventListener('click', newQuote);