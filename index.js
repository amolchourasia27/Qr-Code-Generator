const express = require('express')
const app = express();
const port = 5000;
const bp = require('body-parser')

app.set('view engine' , "ejs")
app.use(bp.urlencoded({extended: false}))
app.use(bp.json())
const qr = require('qrcode');

var opts = {
  errorCorrectionLevel: 'H',
  type: 'image/jpeg',
  quality: 0.3,
  margin: 1,
  innerWidth:25,
  outerWidth:25,
  color: {
    dark:"#010599FF",
    light:"#FFBF60FF"
  }
}

app.get('/',(req, res)=>{
    res.render('index');
});

app.post('/scan',(req,res)=>{
    const url = (req.body.url)
    if (url.length === 0) res.send('Empty Data');
    qr.toDataURL(url,opts,(err ,src)=>{
        if(err) res.send('Error occurred')
        res.render('scan',{ src })
    })
})
app.listen(port,() => console.log('Server at 5000'));