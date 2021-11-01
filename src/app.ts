const quoteContainer = document.getElementById('quote-container')! as HTMLDivElement;
const quoteText = document.getElementById('quote')! as HTMLSpanElement;
const authorText = document.getElementById('author')! as HTMLSpanElement;
const twitterBtn = document.getElementById('twitter')! as HTMLButtonElement;
const newQuoteBtn = document.getElementById('new-quote')! as HTMLButtonElement;
const loaderContainer = document.getElementById('loader')! as HTMLDivElement;

let apiQuotes: {text: string, author: string}[] = [];

//show loading
function dataLoading(): void {
    loaderContainer.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading
function dataComplete(): void {
    loaderContainer.hidden = true;
    quoteContainer.hidden = false;
}

//show new quote
function showNewQuote(): void {
    dataLoading();

    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    //handle author text
    if(!quote.author){
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }    

    //handle quote text 
    if(quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;

    dataComplete();
}

//get quotes from API
async function getQuotes(): Promise<void> {
    dataLoading();
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        showNewQuote();
    } catch (error) {}
}

//tweet quote
function tweetQuote(): void {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//event listeners
newQuoteBtn.addEventListener('click', showNewQuote);
twitterBtn.addEventListener('click', tweetQuote);

//onload
getQuotes();


