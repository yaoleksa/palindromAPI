const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.port || 7000;
const publicPath = path.join(__dirname, './');
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(publicPath));
// handler function block

const checkPalindrom = (input) => {
  let res = '';
  for(let i = input.length - 1; i >= 0; i--){
    res += input[i];
  }
  return res == input;
};

const howManyPalindromes = (s) => {
  const summary = {};
  let len = 0;
  let r = null;
  let part = null;
  if(checkPalindrom(s)){
    summary['base_word'] = s;
  }
  for(let i = 0; i < s.length; i++){
    for(let j = i + 2; j <= s.length; j++){
      part = s.slice(i, j);
      if(checkPalindrom(part)){
        r = new RegExp(part, 'g');
        len += s.match(r).length;
        summary[`${i}${j}_palindrome`] = part;
      }
    }
  }
  summary.quantity = len;
  return summary;
}

// end block

app.get('/', (req, res) => {
    res.send(publicPath);
});
app.post('/', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'https://red-resonance-422975.postman.co/');
    res.set('Access-Control-Allow-Origin', 'http://localhost');
    res.set('Access-Control-Allow-Origin', 'https://onrender.com/');
    res.set('Access-Control-Allow-Origin', null);
    const inp = JSON.parse(JSON.stringify(req.body));
    res.send(howManyPalindromes(inp.input));
});
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});