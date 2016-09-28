var getItemTradeData = require('../protocol/getItemTradeData');
var parseSDdataToUIData = require('../protocol/parseSDdataToUIData');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/db.sqlite3');

exports.init = function (req, res) {
    res.render('analisys.ejs');
}

exports.queryItems = function(req, res) {
    var keyword = req.query.keyword;
    var line = "select * from items\
                where ChnName LIKE '%" + keyword +"%' or EngName LIKE '%" + keyword + "%' or JapName LIKE '%" + keyword + "%' LIMIT 0, 30";
    if (!isNaN(keyword))
        line = "select * from items where id LIKE '" + keyword + "%' LIMIT 0, 20";
    console.log(line);
    db.serialize(function() {
        db.prepare(line).all(function(err, rows) {
        //    console.log(rows);
       //     console.log(err);
            if (rows) res.send(rows);
            else res.send(null);
        });
    });        
};

exports.searchItemTrade = function(req, res) {
    var areaId = req.query.areaId;
    var groupId = req.query.groupId;

    var keyword = req.query.keyword;
    var uikindkey = req.query.uikindkey;
    
    var line = "select id from items where ChnName = ?";
    console.log(keyword);
    db.serialize(function () {
        db.prepare(line).get(keyword, function(err, row) {
            if (row) {
                var id = row.Id;
                console.log(row);
                getItemTradeData.exec(id, areaId, groupId, function(tradeData) {
                if (tradeData == null) {
                    res.send({error : "没找到", id : id});
                }
                else {
                    parseSDdataToUIData.exec(tradeData, function(uiData) {
                        res.send({uiData : uiData});
                    })
                }
            })
            }
            else
                res.send({error : "没找到", keyword : keyword});
        });
    });
}
