import { mergeMap as _observableMergeMap, catchError as _observableCatch, map, catchError } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf, Subject } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpResponseBase } from '@angular/common/http';
import * as signalR from '@microsoft/signalr';
import { ChatMessageDto, FriendShipDto } from 'src/model/citizen/ChatMessageDto';
import { BookingRevenueDto, BookingDetailDto } from 'src/model/community/BookingDetail';
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class HubService {

    urlApi = 'http://localhost:44366';
    public connection: signalR.HubConnection | undefined;
    receivedMessage: ChatMessageDto = {};
    connectionId: string = '';
    userId:string = '';

    constructor(private http: HttpClient) {
        let token = localStorage.getItem('token');
        if(token){
            const payLoad = JSON.parse(window.atob(token.split('.')[1]));
            this.userId = payLoad.UserId;
        }
    }

    public StartConnection() {
        this.connection = new signalR.HubConnectionBuilder().withUrl(this.urlApi + "/realtime").build();
        this.connection.start().then(() => console.log('Connection started'))
            .then(() => this.getConnectionId())
            .catch((err:any) => console.log('Error while starting connection: ' + err));

    }

    public getConnectionId() {
        this.connection?.invoke('GetConnectionId', this.userId).then(
            (data:any) => {
                console.log('connectionId', data);
                this.connectionId = data;
            }
        );
    }
    /**
     * Chat
     */
    public FriendshipRequest(dto:FriendShipDto){
        this.connection?.invoke('FriendshipRequest', dto)
    }

    public SendMessage(sendMessageData: ChatMessageDto) {
        this.connection?.invoke('SendMessage', sendMessageData)
            .catch((err:any) => console.log(err));
    }

    public SendMessageToClient() {
        this.connection?.on('SendMessageToClient', (res:any) => {
            this.receivedMessage = JSON.parse(JSON.stringify(res));
            console.log('received', this.receivedMessage);
        });
    }
    /**
     * call ApproveBooking in backend
     */
    public ApproveBooking(bookingDto:BookingDetailDto){
        this.connection?.invoke('ApproveBooking', bookingDto)
            .catch((err:any) => console.log(err));
    }
}