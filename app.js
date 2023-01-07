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
    let len = 0;
    if(s == ''){
      return 2685;
    }
    for(let i = 0; i < s.length; i++){
      for(let j = i + 1; j <= s.length; j++){
        len += checkPalindrom(s.slice(i, j)) ? 1 : 0;
      }
    }
    return len;
  }

// end block

app.get('/', (req, res) => {
    res.send(publicPath);
});
app.post('/', (req, res) => {
    const inp = JSON.parse(JSON.stringify(req.body));
    const result = {
      output: howManyPalindromes(inp.input)
    };
    res.send(result);
});
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});