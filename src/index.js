document.addEventListener('DOMContentLoaded', ()=>{
    renderDogs();

    function renderDogs(){
        fetch('http://localhost:3000/pups')
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            const dogBar = document.querySelector('#dog-bar')

            data.forEach(dog => {
                const span = document.createElement('span');
                span.textContent = dog.name;

                dogBar.appendChild(span);

                span.addEventListener("click", ()=>{
                    const dogInfo = document.querySelector('#dog-info');
                    const img = document.createElement('img');
                    const h2 = document.createElement('h2');
                    const button = document.createElement('button')

                    img.src = dog.image;
                    h2.innerText = dog.name;
                    
                    if (dog.isGoodDog === true){
                        button.innerText = 'Good Dog!';
                    } else{
                        button.innerText = 'Bad Dog!';
                    }

                    dogInfo.textContent = '';

                    dogInfo.append(img, h2, button);

                    document.querySelector('#dog-info button').addEventListener('click', ()=>{
                        
                        fetch(`http://localhost:3000/pups/${dog.id}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                Accept: 'application/json'
                            },
                            body: JSON.stringify({
                                isGoodDog: !dog.isGoodDog
                            })
                        })
                        .then(res=>res.json())
                        .then(data => console.log(data))
                    })

                })
            });
        })
    }
})