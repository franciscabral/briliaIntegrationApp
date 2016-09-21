/**
 * Created by franc on 20/09/2016.
 */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Integration = require('./app/models/integration');
const app = express();
mongoose.connect('mongodb://integrationdb:snlZ7mRRGBYge2E2YwfNzAOyJpbZqeJoVExgAaGEjZULHEBEJGCnRp5OGyEeXoZzsrwEDO3dEjJPYraUHixLtQ==@integrationdb.documents.azure.com:10250/?ssl=true');

var router = express.Router();

app.use(bodyParser.json());

router.use(function (req, res, next) {
    console.log('Something is happening.');
    next();
});

router.get('/', function (req, res) {
    res.json({message: 'hooray! welcome to our api!'});
});

router.route('/integrations')
    .post(function (req, res) {
        var integration = new Integration();
        integration.type = req.body['type'];
        integration.created = new Date();
        integration.data = req.body;
        console.log(req.body);
        integration.save(function (err) {
            if (err)
                res.send(err);
            res.json({message: 'Integração solicitada com sucesso'});
        });
    })
    .get(function (req, res) {
        Integration.find(function (err, integrations) {
            if (err)
                res.send(err);
            res.json(integrations);
        });
    });

router.route('/integrations/delete')
    .get(function (req, res) {
            Integration.remove({}, function (err) {
                if (err)
                    res.send(err);
                res.json({message: 'Successfully deleted'});
            })
        }
    );

app.use('/api', router);

app.listen(process.env.PORT || 3000, function () {
    console.log('ouvindo na porta ' + (process.env.PORT || 3000));
});
