const apiKey = "0655553247016f4c61008883c5ffe3fe"; // use your actual key
const blogcontainer = document.getElementById("blog-container");

async function fetchRandomNews() {
    try {
        const apiURL = `https://gnews.io/api/v4/top-headlines?token=${apiKey}&lang=en&country=us&max=10&page=2`;
        const response = await fetch(apiURL);
        const data = await response.json();
        console.log(data); // <-- helpful for debugging
        return data.articles || data.news || [];
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

function displayBlogs(articles) {
    blogcontainer.innerHTML = '';
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.image || ""; // GNews uses 'image'
        img.alt = article.title || "";

        const title = document.createElement("h2");
        title.textContent = article.title || "No title";

        const description = document.createElement("p");
        description.textContent = article.description || article.content || "No description";

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogcontainer.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error displaying news", error);
    }
})();
