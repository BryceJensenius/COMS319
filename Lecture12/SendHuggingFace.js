document.getElementById('askButton').addEventListener('click', function() {
    const question = document.getElementById('question').value;
    const apiKey = ''; // Replace with your Hugging Face API token
    // GPT-2 model URL
    fetch('https://api-inference.huggingface.co/models/gpt2', {
            method: 'POST',
    headers: {
    'Authorization': `Bearer ${apiKey}`, // Your Hugging Face API token
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    inputs: question // The question or prompt to the model
    })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').textContent = data[0].generated_text;})
    .catch(error => {
    console.error('Error:', error);
    document.getElementById('response').textContent = "An error occurred. Please try again.";
    });
    });
