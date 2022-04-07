import { Subjects, Publisher, PaymentCreatedEvent } from '@nhtickets2/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    readonly subject = Subjects.PaymentCreated;
}