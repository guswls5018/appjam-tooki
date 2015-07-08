var express = require('express');
var mysql = require('mysql');

var router = express.Router();

var connection = mysql.createConnection({
    'host' : '', 
    'user' : '', 
    'password' : '', 
    'database' : '',
});


//내가 y/n한 카드
router.get('/:user_id/cards=?type=select', function(req, res, next) {
    connection.query('select c.question from cards as c, cards_sel as cs where cs.id_user=? and                                     cs.id_card=c.id;',[req.params.user_id], function (error, cursor) {
        res.json(cursor);
    });
});


module.exports = router;