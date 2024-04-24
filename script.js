function generateCitation() {
    var url = document.getElementById('urlInput').value;
    fetch(url)
        .then(response => response.text())
        .then(html => {
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, 'text/html');
            var title = doc.querySelector('title').textContent;
            var citation = '"' + title + '."';
            document.getElementById('citationOutput').textContent = citation;
        })
        .catch(error => {
            document.getElementById('citationOutput').textContent = 'Error: Unable to fetch URL or extract information.';
        });
}