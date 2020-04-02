const fs = require('fs');
const http = require('http');
const url = require('url');

/* Syncronous Method
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);
console.log('File Written!');
*/

/* Async Method
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    if (err) return console.log(err);
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
            console.log(data3);
            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`,'utf-8', err => {
                console.log('File written');
            })
        })
    })
})
console.log('Will read file!');
*/

///////////////////////
// SERVER
const remplaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    if(product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, '');
    return output;
}

const productData = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const dataObj = JSON.parse(productData);

const server = http.createServer((req, res) => {
    console.log(req.url);
    console.log(url.parse(req.url, true));
    
    const pathName = req.url;

    // Overview Page
    if(pathName === '/overview' || pathName === '/') {
        res.writeHead(200, {'Content-type': 'text/html'});

        const cardsHtml = dataObj.map(el => remplaceTemplate(tempCard, el));
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

        res.end(output);

    // Product Page
    } else if (pathName === '/product') {
        res.end('Product');

    // API
    } else if (pathName === '/api'){ 
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(productData);

    // NOT FOUND
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        res.end('<h1>Page not found!</h1>');
    }

    
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
})