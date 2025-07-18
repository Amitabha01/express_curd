import express from 'express';


const app = express();

const port = 3000;

app.use(express.json())

let teadata = [];
let nextId = 1;


app.post('/teas', (req, res) => {

        const{name, price} = req.body;
        const newTea = {id: nextId++, name, price};
        teadata.push(newTea);

        res.status(201).send(newTea);

})

app.get('/teas', (req, res) => {

        res.status(200).send(teadata);
})

app.get('/teas/:id', (req, res) => {
        const teaData = teadata.find(t => t.id === parseInt(req.params.id));

        if (!teaData) {
                return res.status(400).send('Tea not found')
        } 

        res.status(202).send(teaData);
})

app.put('/teas/:id', (req, res) => {
        const teaData = teadata.find(t => t.id === parseInt(req.params.id));

        if (!teaData) {
                return res.status(400).send('Tea not found')
        } 

        const{name, price} = req.body;
        teaData.name = name;
        teaData.price = price;

        res.status(200).send(teaData)
})

app.delete('/teas/:id', (req, res) => {
        const index = teadata.findIndex(t => t.id === parseInt(req.params.id));
        if (index === -1) {
                return res.status(404).send('Could not find index');
        }

        teadata.splice(index, 1);
        return res.status(200).send('Deleted..');
})


app.listen(port, () => {

        console.log(`App is running on ${port}`);
        
})