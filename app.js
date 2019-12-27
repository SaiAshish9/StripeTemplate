const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const stripe=require('stripe')("sk_test_-----")


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')

app.get('/',(req,res)=>{
  res.render('index',{alert:''})
})

app.get('/success',(req,res)=>{
  res.render('index',{alert:'true'})
})

app.get('/failure',(req,res)=>{
  res.render('index',{alert:'false'})
})

app.post('/pay',(req,res)=>{
var token=req.body.stripeToken;
var charge=req.body.charge;
var cost=stripe.charges.create({

  amount:charge,
  currency:'gbp',
  source:token
},function(err,charge){
  if(err &err.type==="StripeCardError"){
    console.log("Card was declined");
  }else{
    console.log("success");

  }
}
)
res.redirect('/success')
})


app.listen(3000,()=>{
  console.log("server started on port 3000");
})
