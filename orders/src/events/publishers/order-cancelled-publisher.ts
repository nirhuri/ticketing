import { Publisher, OrderCancelledEvent, Subjects } from "@nhtickets2/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
