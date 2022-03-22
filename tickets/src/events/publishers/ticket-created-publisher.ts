import { Publisher, Subjects, TicketCreatedEvent } from '@nhtickets2/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
}