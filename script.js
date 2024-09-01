document.addEventListener('DOMContentLoaded', () => {
    const newsForm = document.getElementById('newsForm');
    const newsList = document.getElementById('newsList');

    const fetchNews = async () => {
        try {
            const response = await fetch('/news');
            const news = await response.json();
            newsList.innerHTML = '';
            news.forEach(item => {
                const newsItem = document.createElement('div');
                newsItem.className = 'news-item';
                newsItem.innerHTML = `
                    <h2>${item.title}</h2>
                    <p>${item.description}</p>
                    <img src="${item.img}" alt="${item.title}">
                `;
                newsList.appendChild(newsItem);
            });
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    fetchNews();

    newsForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(newsForm);
        const data = {
            title: formData.get('title'),
            description: formData.get('description'),
            img: formData.get('img')
        };

        try {
            const response = await fetch('/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(data).toString()
            });

            if (response.ok) {
                newsForm.reset();
                fetchNews(); 
            } else {
                console.error('Error adding news:', await response.text());
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    });
});