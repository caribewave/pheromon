"use strict";

var sql = require('sql');
sql.setDialect('postgres');
var databaseP = require('../management/databaseClientP');

var sensors = require('../management/declarations.js').sensors;

module.exports = {
    create: function (data) {
        return databaseP.then(function (db) {
            
            var query = sensors
                .insert(data)
                .returning('*')
                .toQuery();

            //console.log('sensors create query', query);

            return new Promise(function (resolve, reject) {
                db.query(query, function (err, result) {
                    if (err) reject(err);
                    else
                        resolve(result.rows[0]);
                });
            });
        })
        .catch(function(err){
            console.log('ERROR in create', err);
        });  
    },
    
    update: function(id, delta) {
        return databaseP.then(function (db) {
            
            var query = sensors
                .update(delta)
                .where(sensors.id.equals(id))
                .returning("*")
                .toQuery();

            //console.log('sensors findBySIMid query', query);
            return new Promise(function (resolve, reject) {
                db.query(query, function (err, result) {
                    if (err) reject(err);
                    else resolve(result.rows[0]);
                });
            });
        })
        .catch(function(err){
            console.log('ERROR in update', err);
        });        
    },

    get: function(id){
        return databaseP.then(function (db) {
            
            var query = sensors
                .select("*")
                .where(sensors.id.equals(id))
                .from(sensors)
                .toQuery();

            return new Promise(function (resolve, reject) {
                db.query(query, function (err, result) {
                    if (err) reject(err);

                    else resolve(result.rows[0]);
                });
            });
        })
        .catch(function(err){
            console.log('ERROR in getSensor', err);
        }); 
    },

    getAll: function() {
        return databaseP.then(function (db) {
            
            var query = sensors
                .select("*")
                .from(sensors)
                .toQuery();

            return new Promise(function (resolve, reject) {
                db.query(query, function (err, result) {
                    if (err) reject(err);

                    else resolve(result.rows);
                });
            });
        })
        .catch(function(err){
            console.log('ERROR in getAllSensors', err);
        });        
    },

    delete: function(id) {
        return databaseP.then(function (db) {
            
            var query = sensors
                .delete()
                .where(sensors.id.equals(id))
                .returning('*')
                .toQuery();

            return new Promise(function (resolve, reject) {
                db.query(query, function (err, result) {
                    if (err) reject(err);
                    else resolve(result.rows[0]);
                });
            });
        })
        .catch(function(err){
            console.log('ERROR in delete sensors', err);
        });        
    },

    deleteAll: function() {
        return databaseP.then(function (db) {
            
            var query = sensors
                .delete()
                .returning('*')
                .toQuery();

            return new Promise(function (resolve, reject) {
                db.query(query, function (err, result) {
                    if (err) reject(err);
                    else resolve(result.rows);
                });
            });
        })
        .catch(function(err){
            console.log('ERROR in deleteAll sensors', err);
        });        
    },

    findBySIMid: function(sim) {
        return databaseP.then(function (db) {
            
            var query = sensors
                .select("*")
                .from(sensors)
                .where(sensors.sim.equals(sim))
                .toQuery();

            //console.log('sensors findBySIMid query', query);

            return new Promise(function (resolve, reject) {
                db.query(query, function (err, result) {
                    if (err) reject(err);
                    else resolve(result.rows);
                });
            });
        })
        .catch(function(err){
            console.log('ERROR in findBySIMid', err);
        });          
    }

};
