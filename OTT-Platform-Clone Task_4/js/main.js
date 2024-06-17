document.getElementById('search').addEventListener('input', function(event) {
    const searchTerm = event.target.value.toLowerCase();
    const contentItems = document.querySelectorAll('.content-grid div');

    contentItems.forEach(function(item) {
        const contentTitle = item.textContent.toLowerCase();
        if (contentTitle.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});
