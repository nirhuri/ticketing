import { Subjects, Publisher, ExpirationCompleteEvent } from '@nhtickets2/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;
}