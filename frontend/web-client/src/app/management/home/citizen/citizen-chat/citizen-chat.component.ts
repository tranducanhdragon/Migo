import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FriendshipState } from 'src/environments/constant';
import { ChatMessageDto, FriendShipDto, Message, UserNotFriend } from 'src/model/citizen/ChatMessageDto';
import { User } from 'src/model/user/User';
import { appModuleAnimation } from 'src/route-animation/animation';
import { CitizenService } from 'src/service/citizen/citizen.service';
import { HubService } from 'src/service/hub/Hub.service';
import { UserService } from 'src/service/user/user.service';

@Component({
  selector: 'app-citizen-chat',
  templateUrl: './citizen-chat.component.html',
  styleUrls: ['./citizen-chat.component.css'],
  animations: [appModuleAnimation()]
})
export class CitizenChatComponent implements OnInit, OnDestroy, AfterViewChecked {

  userId: any;
  messages: Message[] = [];
  sendMessageData: ChatMessageDto = new ChatMessageDto();
  userLoginInfor: User = {};
  selectedFriend: User = {};
  usersNotFriend: UserNotFriend[] = [];
  friends?: Observable<User[]>;
  constructor(
    private userService: UserService,
    private citizenService: CitizenService,
    private chatService: HubService) {

  }

  // variable with '!' operator is non-null assertion operator
  // that means the variable is not null
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  ngOnInit(): void {
    this.userId = this.chatService.userId;
    this.getUserById(this.userId);

    this.getListUsers();
    this.getListFriends();

    //realtime
    this.chatService.StartConnection();

    //on listening message from server
    this.receiveMessageFromServer();
    this.receiveRequestFromServer();
  }
  ngOnDestroy() {
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  //get user login infor
  getUserById(userId: number) {
    this.userService.getById('/api/User/getbyid', userId + '').subscribe(
      (res: any) => {
        if (res.success) {
          this.userLoginInfor = res.data;
        }
      }
    )
  }
  //get list user not friend
  getListUsers() {
    this.citizenService.getById('/api/Citizen/getallusernotfriend', this.userId?.toString() ?? "0").subscribe(
      (res: any) => {
        if (res.success) {
          this.usersNotFriend = res.data;
          this.usersNotFriend = this.usersNotFriend.filter(x => x.userName != localStorage.getItem("username"));
        }
      }
    )
  }
  getListFriends() {
    this.friends = this.citizenService.getByIdObservable('/api/Citizen/getalluserfriend', this.userId?.toString() ?? "0");
  }
  //send friendship request
  addfriend(userDto: UserNotFriend) {
    let friendDto: FriendShipDto = {};
    friendDto.friendUserId = userDto.userId;
    friendDto.userId = this.userLoginInfor.userId;
    friendDto.friendUserName = userDto.userName;
    //set state
    //userDto for UI, friendDto for backend
    if (userDto.state == null || userDto.state == FriendshipState.NotFriend) {
      userDto.state = FriendshipState.Requesting;
      friendDto.state = FriendshipState.NotFriend;
    }
    else if (userDto.state == FriendshipState.Requesting) {
      userDto.state = FriendshipState.Accepted;
      friendDto.state = FriendshipState.Requesting;
      //remove in UserNotFriend list and add to Friend list only for UI
      let indexRemove = this.usersNotFriend.indexOf(userDto);
      if (indexRemove > -1) {
        this.usersNotFriend.splice(indexRemove, 1);
      }
      this.friends?.pipe(tap(lst => {
        lst.push(userDto);
      }))
    }

    this.chatService.FriendshipRequest(friendDto);
  }
  //get message from one friend
  getFriendMessage(friend: User) {
    this.selectedFriend = JSON.parse(JSON.stringify(friend));
    this.messages = [];
  }
  sendMessage() {
    this.sendMessageData.userId = this.userLoginInfor.userId;
    this.sendMessageData.targetUserId = this.selectedFriend.userId;
    this.sendMessageData.creationTime = new Date();
    this.sendMessageData.userConnectionId = this.chatService.connectionId;
    this.chatService.SendMessage(this.sendMessageData);
    this.sendMessageData.message = ''
  }
  receiveMessageFromServer() {
    this.chatService.connection?.on('SendMessageToClient', (res: any) => {
      if (this.selectedFriend.userId == res.targetUserId || this.selectedFriend.userId == res.userId) {
        this.messages.push({ key: res.targetUserId, value: res.message, userId: res.userId });
      }
    });
  }
  receiveRequestFromServer() {
    this.chatService.connection?.on('SendRequestToClient', (res: any) => {
      this.usersNotFriend.forEach(it => {
        //change state from both user and target friend
        if (it.userId == res.userId || it.userId == res.friendUserId) {
          it.state = FriendshipState.Requesting;
        }
      })
    });
  }
}
