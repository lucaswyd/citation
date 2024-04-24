function generateCitation() {
    var url = document.getElementById('urlInput').value;
    fetch(url)
        .then(response => response.text())
        .then(html => {
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, 'text/html');
            var title = doc.querySelector('title').textContent;
            var authors = Array.from(doc.querySelectorAll('meta[name="author"]')).map(author => author.getAttribute('content'));
            var publisher = doc.querySelector('meta[property="og:site_name"]') ? doc.querySelector('meta[property="og:site_name"]').getAttribute('content') : doc.querySelector('meta[name="publisher"]').getAttribute('content');
            var publicationDate = doc.querySelector('meta[property="article:published_time"]') ? doc.querySelector('meta[property="article:published_time"]').getAttribute('content') : doc.querySelector('meta[name="date"]').getAttribute('content');
            var citation = '';
            if (authors.length > 0) {
                citation += authors.join(', ') + '. ';
            }
            citation += '"' + title + '." ';
            citation += 'Website: ' + publisher + ', ';
            citation += publicationDate + ', ';
            citation += url + '.';
            document.getElementById('citationOutput').textContent = citation;
        })
        .catch(error => {
            document.getElementById('citationOutput').textContent = 'Error: Unable to fetch URL or extract information.';
        });
}