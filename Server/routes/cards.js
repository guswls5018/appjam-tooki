var express = require('express');
var mysql = require('mysql');

var router = express.Router();

var connection = mysql.createConnection({
    'host' : '',
    'user' : '',
    'password' : '',
    'database' : ''
});


//사용자가 새로 작성한 카드 서버로 전달
router.post('/', function(req, res, next) {
    connection.query('insert into cards(question) values (?);', [req.body.question], function (error, info) {
        if (error == null) {
            connection.query('select * from cards where id=?;',[info.insertId], function (error, cursor) {
                if (cursor.length > 0) {
                    res.json({
                        result : true,
                        id : cursor[0].id,
                        question : cursor[0].question,
                        regdate : cursor[0].regdate,
                    });
                }
                else
                    res.status(503).json({ result : false, reason : "Cannot post card" });
            });
        }
        else
            res.status(503).json(error);
    });
});

//인기 카드 목록 조회
router.get('/hotteset', function(req, res, next) {
    connection.query('select id, question, regdate, count_comment from cards '
                     +'order by count_comment desc;', function (error, cursor) {
        res.json(cursor);
    });
});

//최신 카드 목록 조회
router.get('/latest', function(req, res, next) {
    connection.query('select id, question, regdate, count_comment from cards '
                     +'order by regdate desc;', function (error, cursor) {
        res.json(cursor);
    });
});

//카드에 대한 댓글 리스트 가져오기
router.get('/:card_id/comments', function(req, res, next) {
     connection.query('select id_card, answer, comment, regdate from cards_sel where id_card=? and comment!=""  order by regdate desc;',
                     [req.params.card_id], function (error, cursor) {
       res.json(cursor);
       });
});


module.exports = router;
                            