const express = require("express");

const knex = require("../data/dbConfig.js")

const router = express.Router();

router.get("/", (req, res) => {
    knex
        .select("*")
        .from("accounts")
        .then(accounts => {
            res.status(200).json({
                data: accounts
            });
        })
        .catch(error => {
            console.log("GET / error", error);

            res.status(500).json({
                message: error.message
            })
        });
})

router.get("/:id", (req, res) => {
    knex
        .select("*")
        .from("accounts")
        .where({
            id: req.params.id
        })
        .first()
        .then(acct => {
            res.status(200).json({
                data: acct
            });
        })
        .catch(error => {
            console.log("GET / error", error);

            res.status(500).json({
                message: error.message
            });
        });
});

router.post("/", (req, res) => {
    knex("accounts")
        .insert(req.body, "id")
        .then(([id]) => {
            res.status(201).json({
                data: id
            });
        })
        .catch(error => {
            console.log("GET / error", error);

            res.status(500).json({
                message: error.message
            });
        })
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    knex("accounts")
      .where({ id }) // if not using a where, all records will be updated
      .update(changes)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: "record updated successfully" });
        } else {
          res.status(404).json({ message: "no records found" });
        }
      })
      .catch(error => {
        console.log("GET / error", error);
  
        res.status(500).json({ message: error.message });
      });
  });

  router.delete("/:id", (req, res) => {
    const { id } = req.params;
  
    knex("accounts")
      .where({ id }) // if not using a where, all records will be removed
      .del() // <----- don't forget this part
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: "record deleted successfully" });
        } else {
          res.status(404).json({ message: "no records found" });
        }
      })
      .catch(error => {
        console.log("GET / error", error);
  
        res.status(500).json({ message: error.message });
      });
  });

module.exports = router;