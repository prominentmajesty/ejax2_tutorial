var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT||3000

var app = express();
var products = [{
    id : 1,
    name : 'laptop'
},
{
    id : 2,
    name : 'microwave'
}
];
var getId = 2;

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.get('/products', function(req, res){
    res.send({products : products});
});
app.post('/postwatch', function(req, res){
    var name = req.body.name;
    
        products.push({
        id : getId+=1,
        name : name
    });
    console.log(products);
    res.send({product:products});

});
app.put('/products/:id', (req, res)=>{
    var id = req.params.id;
    var newName = req.body.newName;
    var found = false;
    products.forEach(function(product,index){
        if(!found && product.id ===Number(id)){
            product.name = newName
        }
    });

});
app. delete('/delete/:id', (req, res)=>{
    var id = req.params.id;
    var found = false;
    products.forEach(function(product, index){
        if(!found && product.id === Number(id)){
            products.splice(index, 1);
        }
    });
    res.send('Successfully Deleted Product!');
});
app.listen(port, function(){
    console.log('Server is Up And Running At Port 3000'); 
})

