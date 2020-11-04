const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')

const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')


weatherForm.addEventListener('submit', (event) =>{ 
    event.preventDefault()
    const location =  searchTerm.value
    messageOne.textContent = "Loading..."
    if(searchTerm.value) {
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data)=>{
            if(data.error) {
                
            }else {
                messageOne.textContent= data.currentWeather
                messageTwo.textContent= data.percentageRain
            }
        })
    })
   }
})