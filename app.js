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
  let len = s.length;
  const summary = {};
  if(s.replace(new RegExp(s[0], 'g'), '').length == 0){
    summary.quantity = (len * (len + 1)) * 0.5;
    return summary;
  }
  let r = null;
  let part = null;
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
    const inp = JSON.parse(JSON.stringify(req.body));
    res.send(howManyPalindromes(inp.input));
});
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});