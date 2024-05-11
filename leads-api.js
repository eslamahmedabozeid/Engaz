const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const leads_data = require('./mock-data.json');

const app = express();
app.use(bodyParser.json())
    .use(bodyParser.urlencoded())
    .use(cors())
    .options('*', cors());

let leads = leads_data;
let PORT = process.env.PORT || 3000;

function introduceChaos(res) {
    if (Math.floor(Math.random() * 20) === 10) {
        res.status(500).json({
            error: 'Unable to process your request: an error has occurred'
        }); // random 500 error

        return true;
    }
}

app.get('/', (req, res) => {
    res.send('Autovance Leads API is running.'); // Response for root URL
});

app.get('/api/leads', (req, res, next) => {
    if (introduceChaos(res)) { return; }

    return res.status(200).json(leads);
});

app.put('/api/leads/:lead_id', (req, res, next) => {
    const lead = req.body;

    const [matching_lead] = leads.filter(l => l.lead_id === lead.lead_id);
    if (matching_lead) {
        const index = leads.indexOf(matching_lead);
        leads[index] = {
            ...lead,
            potential_duplicates: matching_lead.potential_duplicates
        };

        if (introduceChaos(res)) { return; }
        return res.status(200).json(lead);
    } else {
        if (introduceChaos(res)) { return; }
        return res.status(404).json({ error: `lead_id ${req.params.lead_id} not found` })
    }


});

app.get('/api/leads/:lead_id/potential-duplicates', (req, res, next) => {
    const [lead] = leads
        .filter(lead => lead.lead_id === req.params.lead_id);

    if (introduceChaos(res)) { return; }

    if (lead) {
        return res.status(200).json(lead.potential_duplicates);
    } else {
        return res.status(404).json({ error: `lead_id ${req.params.lead_id} not found` });
    }
})


app.listen(PORT, () => {
    console.log(`Autovance Leads API is listening on port ${PORT}`);
});