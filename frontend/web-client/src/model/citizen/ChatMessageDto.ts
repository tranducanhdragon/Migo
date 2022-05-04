import { FriendshipState } from "src/environments/constant";
import { NumberLiteralType } from "typescript";

export class Message {
    userId?:number;
    key?:string;
    value?:Array<string>;
}
export class ChatMessageDto {
    userId?: number;
    userConnectionId?: string;
    message?: string;
    targetUserId?: number;
    targetConnectionId?: string;
    side?: number;
    readState?: number;
    creationTime?: Date;
}
export class FriendShipDto {
    friendShipId?:number;
    userId?:number;
    friendUserId?: number;
    friendUserName?: string;
    friendProfilePictureId?: string;
    isOnline?: boolean;
    state?: FriendshipState;
}
export class UserNotFriend{
    userId?:number;
    userName?:string;
    roleId?:number;
    urlImage?:string;
    state?: FriendshipState = 2;
}