import supertest from "supertest";
import {app} from "../app";

describe('routes', () => {
    it("should fail when accessing an authed route with an invalid JWT\", ", async () => {
        const userLogin = `kamila`
        const password = `123`

        let authToken: string = '';

        // TODO: как-то вытащить токен ?
        // let authResponse = app.response;
        // const loginRes = await login(
        //     login: userLogin,
        //     password: password,
        //     authResponse
        // )
        // authToken = loginRes;

        const response = await supertest(app)
            .get("/users")
            .expect(401)
            .set("authorization", `bearer ${authToken}`)

        expect(response.body.message).toEqual('No token provided');
    })
});
