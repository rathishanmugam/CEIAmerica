import request from "supertest";
import  app from "../server";
import User from '../models/users';
import { validateRequestSchema } from '../middlewares/validate-request';
import { userSchema } from '../schema/user-schema';

describe(" create User ", () => {
    const user = {
        "id": "5",
        "username": "Tara",
        "email": "tara@gmail.com",
        "password": "tara123"
    };

    test("Success To Create User", async () => {
        const mockCreateUser = jest.fn((): any => user);
        jest
            .spyOn(User, "create")
            .mockImplementation(() => mockCreateUser());

        const res = await request(app).post("/users").send(user);

        expect(mockCreateUser).toHaveBeenCalledTimes(1);
        expect(res.body).toHaveProperty("result");
        expect(res.body).toHaveProperty("msg");
        expect(res.status).toBe(200);
    });


    test("Fail To Create User", async () => {
        const mockCreateUser = jest.fn((): any => {
            throw "error";
        });
        jest
            .spyOn(User, "create")
            .mockImplementation(() => mockCreateUser());

        const res = await request(app).post("/users").send(user);

        expect(mockCreateUser).toHaveBeenCalledTimes(1);
        expect(res.body.msg).toEqual("Bad Request,Fail To Create User");
        expect(res.body.status).toEqual(400);

    });
});

describe("Read All User", () => {
        const user = {
            "id": "5",
            "username": "Tara",
            "email": "tara@gmail.com",
            "password": "tara123"
        };

    test("Success To Read User", async () => {
        const mockReadAllUser = jest.fn((): any => [user]);
        jest
            .spyOn(User, "findAll")
            .mockImplementation(() => mockReadAllUser());

        const res = await request(app).get("/users");

        expect(mockReadAllUser).toHaveBeenCalledTimes(1);
        expect(res.body.result).toEqual([user]);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("result");
        expect(res.body).toHaveProperty("msg");
    });

    test("Fail To Read User", async () => {
        const mockReadUser = jest.fn((): any => {
            throw "error";
        });
        jest
            .spyOn(User, "findAll")
            .mockImplementation(() => mockReadUser());

        const res = await request(app).get("/users");
        expect(mockReadUser).toHaveBeenCalledTimes(1);
        expect(res.body.status).toEqual(500)
        expect(res.body.msg).toEqual("Fail To Get  Records")

    });
});

describe("Delete User", () => {
    const user = {
        "id": "5",
        "username": "Tara",
        "email": "tara@gmail.com",
        "password": "tara123"
    };
    test('success To delete a user', async () => {
        const mockFindUser = jest.fn((): any => user);
        jest
            .spyOn(User, "findByPk")
            .mockImplementation(() => mockFindUser());

        const mockDeleteUser = jest.fn((): any => 1);
        jest
            .spyOn(User, "destroy")
            .mockImplementation(() => mockDeleteUser());

        const res = await request(app).delete("/users/5");
        expect(mockFindUser).toHaveBeenCalledTimes(1);
        expect(mockDeleteUser).toHaveBeenCalledTimes(1);
        expect(res.body.count).toEqual(1);
        expect(res.body).toHaveProperty("msg");
        expect(res.status).toBe(200);
    })
    test('Fail To delete a user', async () => {
        const mockFindUser = jest.fn((): any => undefined);
        jest
            .spyOn(User, "findByPk")
            .mockImplementation(() => mockFindUser());

        const mockDeleteUser = jest.fn((): any => 0);
        jest
            .spyOn(User, "destroy")
            .mockImplementation(() => mockDeleteUser());

        const res = await request(app).delete("/users/1");
        expect(mockFindUser).toHaveBeenCalledTimes(1);
        expect(mockDeleteUser).not.toBeCalled();
        expect(res.status).toBe(404);
    })
});

describe("Read Specific  User", () => {
    const user = {
        "id": "5",
        "username": "Tara",
        "email": "tara@gmail.com",
        "password": "tara123"
    };
    test('success To Read  a Specific user', async () => {
        const mockFindUser = jest.fn((): any => user);
        jest
            .spyOn(User, "findByPk")
            .mockImplementation(() => mockFindUser());

        const res = await request(app).get("/users/5");
        expect(mockFindUser).toHaveBeenCalledTimes(1);
        expect(res.body).toHaveProperty("msg");
        expect(res.body).toHaveProperty("result");

        expect(res.status).toBe(200);
    })
    test('Fail To Read a user', async () => {
        const mockFindUser = jest.fn((): any => undefined);
        jest
            .spyOn(User, "findByPk")
            .mockImplementation(() => mockFindUser());

        const res = await request(app).get("/users/1");
        expect(mockFindUser).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(404);
    })
});

describe.skip("Update User", () => {
    const user = {
        "id": "5",
        "username": "Tara",
        "email": "tara@gmail.com",
        "password": "tara123"
    };
    const newUser={
        "id": "5",
        "username": "Prethi",
        "email": "prethi@gmail.com",
        "password": "prethi123"
    }
    test('success To Update a user', async () => {
        const mockUpdateUser = jest.fn((): any => [1]);
        jest
            .spyOn(User, "update")
            .mockImplementation(() => mockUpdateUser());

        const mockFindUser = jest.fn((): any => newUser);
        jest
            .spyOn(User, "findByPk")
            .mockImplementation(() => mockFindUser());
        const res = await request(app).put("/users/5");
        expect(mockUpdateUser).toHaveBeenCalledTimes(1);
        expect(mockFindUser).toHaveBeenCalledTimes(1);
        expect(res.body).toHaveProperty("msg");
        expect(res.status).toBe(200);
    })
    test('Fail To Update a user', async () => {
        const mockUpdateUser = jest.fn((): any => [0]);
        jest
            .spyOn(User, "update")
            .mockImplementation(() => mockUpdateUser());

        const mockFindUser = jest.fn((): any => undefined);
        jest
            .spyOn(User, "findByPk")
            .mockImplementation(() => mockFindUser());


        const res = await request(app).put("/users/1");
        expect(mockUpdateUser).toHaveBeenCalledTimes(1);
        expect(mockFindUser).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(404);
    })
});
