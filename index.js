const request = new XMLHttpRequest();

const root = document.getElementById('root');
const inp = document.createElement('textarea');
inp.placeholder = "Inpu word to count palindromes";
const p = document.createElement('p');
request.onload = () => {
    if(request.readyState == request.DONE && request.status){
        const retrieved = JSON.parse(request.response);
        let longText = '';
        for(let i in retrieved){
            longText += `${i}: ${retrieved[i]}\n`;
        }
        p.innerText = longText;
    }
}

const btn = document.createElement('button');
btn.innerText = 'Submite';
btn.addEventListener('click', () => {
    if(inp.value){
        request.open('POST', document.URL);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({
            "input": inp.value
        }));
    } else {
        alert('Fill word to get quantity of palindrom');
    }
});
root.appendChild(inp);
root.appendChild(btn);
root.appendChild(p);