/**
 * Created by franc on 20/09/2016.
 */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Integration = require('./app/models/integration');
const Log = require('./app/models/log');
const app = express();
var port = process.env.PORT || 3000;
var mongoDBConnection = process.env['MONGODB'];
mongoose.connect(mongoDBConnection);

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

router.route('/logs')
    .get(function (req, res) {
        Log.find(function (err, logs) {
            if (err)
                res.send(err);
            res.json(logs);
        })
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


router.route('/logs/delete')
    .get(function (req, res) {
        Log.remove({}, function (err) {
            if (err)
                res.send(err);
            res.json({message: 'Successfully deleted'});
        })
    });

app.use('/api', router);

app.listen(port, function () {
    console.log('ouvindo na porta ' + port);
});
