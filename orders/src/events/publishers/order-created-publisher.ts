import { Publisher, OrderCreatedEvent, Subjects } from "@nhtickets2/common"; 

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
}