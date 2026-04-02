import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PhoneNumber {
    city: string;
    isActive: boolean;
    state: string;
    messageCount: bigint;
    number: string;
}
export interface SMSMessage {
    senderNumber: string;
    messageBody: string;
    receivedTimestamp: Time;
}
export type Time = bigint;
export interface backendInterface {
    addMessage(number: string, sender: string, body: string): Promise<void>;
    deactivateNumber(number: string): Promise<void>;
    getActiveNumbers(): Promise<Array<PhoneNumber>>;
    getAllPhoneNumbers(): Promise<Array<PhoneNumber>>;
    getMessagesForNumber(number: string): Promise<Array<SMSMessage>>;
    getNumbersByState(state: string): Promise<Array<PhoneNumber>>;
}
