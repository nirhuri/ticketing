import request from "supertest";
import { app } from "../../app";
import { Ticket } from '../../models/ticket';

it("has a route handler listening to /api/tickets for post request", async () => {
  const response = await request(app).post("/api/tickets").send({});
  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});

it(
  "returns status other then 401 if the user is signed in",
  async () => {
    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({});

    expect(response.status).not.toEqual(401);
  },
  60 * 1000
);

it("returns an error if an invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "",
      price: 10,
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      price: 10,
    })
    .expect(400);
});

it("returns an error if an invalid price is provided", async () => {
      await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({
          title: "title",
          price: -10,
        })
          .expect(400);
    
      await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({
          title: "title",
        })
        .expect(400);
});

it("its read a ticket with valid input", async () => {
    let ticket = await Ticket.find({});
    expect(ticket.length).toEqual(0);

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'fwefwef',
            price: 20
        }).expect(201);
    
    ticket = await Ticket.find({});
    expect(ticket.length).toEqual(1);
});
