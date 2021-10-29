let apiQuotes = [];

//show new quote
function showNewQuote() {
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote);
}

//get quotes from API
async function getQuotes() {
    const apiUrl = 'https:/type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        showNewQuote();
    } catch (error) {

    }
}

//onload
getQuotes();