import { Publisher, Subjects, TicketUpdatedEvent } from "@nhtickets2/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
