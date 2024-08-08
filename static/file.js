document.getElementById('uploadForm').onsubmit = function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert('Upload successful!');
        const uploadedContentDiv = document.getElementById('uploadedContent'); // CLEARS PREVIOUS CONTENT
        uploadedContentDiv.innerHTML = '';
        data.files.forEach(file => displayUploadedFile(file.path, file.filename));
    })
    .catch(error => {
        console.error('Error uploading files:', error);
        alert('Error uploading files.');
    });
}

function displayUploadedFile(filePath, filename) {
    const extension = filename.split('.').pop().toLowerCase();
    const container = document.createElement('div');
    container.classList.add('file-content');

    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
        const img = document.createElement('img');
        img.src = `http://localhost:3000${filePath}`;
        container.appendChild(img);
    } else if (extension === 'pdf') {
        const iframe = document.createElement('iframe');
        iframe.src = `http://localhost:3000${filePath}`;
        iframe.width = '100%';
        iframe.height = '400px';
        container.appendChild(iframe);
    } else if (extension === 'html') {
        fetch(`http://localhost:3000${filePath}`)
            .then(response => response.text())
            .then(data => {
                container.innerHTML = data;
                container.style.border = "1px solid #ddd";
                container.style.padding = "10px";
                container.style.marginTop = "10px";
                container.style.overflow = "auto";
                container.style.maxHeight = "400px";
                document.getElementById('uploadedContent').appendChild(container);
            })
            .catch(error => {
                console.error('Error displaying uploaded file:', error);
            });
    } else {
        container.textContent = `Cannot display file type: ${extension}`;
    }

    document.getElementById('uploadedContent').appendChild(container);
}