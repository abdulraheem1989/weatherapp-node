const input = document.querySelector('input');
const weatherForm = document.querySelector('form');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector('#result').textContent = 'Loading...';
    fetch(`http://localhost:3000/weather?address=${input.value}`).then(res => res.json()).then(data => {
        if (data.error) {
            document.querySelector('#error').textContent = data.error;
        }
        else {
            document.querySelector('#result').textContent = data.location + ' ' + data.forecastData;
        }
    })
})