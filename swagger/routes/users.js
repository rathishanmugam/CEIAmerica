const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const idAutoIncrement = require("id-auto-increment");

const idLength = 8;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The user name
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password
 *       example:
 *         id: 1
 *         username: Rathi
 *         email: rathi@gmail.com
 *         password: rathi@123
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

router.get("/", (req, res) => {
    const users = req.app.db.get("users");

    res.send(users);
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user details by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */

router.get("/:id", (req, res) => {
    const user = req.app.db.get("users").find({ id: req.params.id }).value();

    if(!user){
        res.sendStatus(404)
    }

    res.send(user);
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

router.post("/", async(req, res) => {
    try {
        const id = await idAutoIncrement({radix:10});
        const user = {
            id: id,
            ...req.body,
        };

        req.app.db.get("users").push(user).write();

        res.send(user)
    } catch (error) {
        return res.status(500).send(error);
    }
});

/**
 * @swagger
 * /users/{id}:
 *  put:
 *    summary: Update the user by the id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */

router.put("/:id", (req, res) => {
    try {
        const user = req.app.db.get("users").find({ id: req.params.id }).value();

        if(!user){
            res.sendStatus(404)
        }
        req.app.db
            .get("users")
            .find({ id: req.params.id })
            .assign(req.body)
            .write();

        res.status(200).send(req.app.db.get("users").find({ id: req.params.id }));
    } catch (error) {
        return res.status(500).send(error);
    }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */

router.delete("/:id", (req, res) => {
    const user = req.app.db.get("users").find({ id: req.params.id }).value();

    if(!user){
        res.sendStatus(404)
    }
    req.app.db.get("users").remove({ id: req.params.id }).write();

    res.sendStatus(200);
});

module.exports = router;
