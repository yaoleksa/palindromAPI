const request = new XMLHttpRequest();

const root = document.getElementById('root');
const inp = document.createElement('textarea');
inp.placeholder = "Inpu word to count palindromes";
const p = document.createElement('p');
request.onload = () => {
    p.innerText = 'Success';
}
const btn = document.createElement('button');
btn.innerText = 'Submite';
btn.addEventListener('click', () => {
    if(inp.value){
        request.open('POST', window.location.href);
        request.send({
            "input": inp.value
        });
    } else {
        alert('Fill word to get quantity of palindrom');
    }
});
root.appendChild(inp);
root.appendChild(btn);
root.appendChild(p);