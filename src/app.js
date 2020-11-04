const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const path = require('path')
const express = require('express')
const port = process.env.PORT || 3000
 
const hbs = require('hbs')

const app = express()
const publicdirec = path.join(__dirname, '../public')
const viewname = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs')
app.set('views', viewname)
hbs.registerPartials(partialspath)
app.use(express.static(publicdirec))

app.get('', (req,res)=> {
    res.render('index', {
        title : 'Weather',
        name : 'Mal'
    })
})


app.get('/help', (req,res)=> {
    res.render('help', {
        title : 'Help',
        name : 'Mal'
    })
})

app.get('/about', (req,res)=> {
    res.render('about', {
        title : 'About',
        name : 'Mal'
    })
})



app.get('/weather', (req,res) => {
    if(!req.query.address){
        return  res.send({
             error: 'You must provide a address term'
         })
     }

     var address = req.query.address;
     geocode(req.query.address, (error,data ) => {
        if(!error) {
            weather(data.latitude, data.longitude, (error, forecaseData) => {
                if(!error) {
                    res.send({
                        currentWeather : forecaseData.currentWeather,
                        percentageRain : forecaseData.percentageRain,
                        location : forecaseData.location,
                        address: address
                    })

                }else {
                    res.send({
                        error : error
                    })

                }
            })
        }
    });
 
})

app.get('/products', (req,res ) => {
    if(!req.query.search){
       return  res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query);
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title : '404 error',
        name : 'Mal',
        error: 'Error '
    })
});


app.get('*', (req, res) => {
    res.render('404', {
        title : '404 error',
        name : 'Mal',
        error: 'Error '
    })
});

app.listen(port, () => {
    
})