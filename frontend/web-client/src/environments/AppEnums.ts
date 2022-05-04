/**
 * Business
 */
export class BusinessType {
    static CommerceGoods = 2;
    static CommerceRestaurant = 3;
    static CommerceOther = 4;
    static RepairElectric = 5;
    static RepairWater = 6;
    static RepairFurniture = 7;
    static RepairRefrigeration = 8;
    static Helper = 9;
    static Logistic = 11;
    static Freelance = 12;
    static Education = 13;
    static Healthcare = 14;
    static Sport = 15;
    static Auction = 16;
    static Other = 17;
    static Other1 = 18;
    static Other2 = 19;
    static Other3 = 21;
}

export class Admin_Object_FormId {
    static Admin_GetAll_Object = 1
    static Admin_GetAll_Object_NEW = 11
    static Admin_GetAll_Object_ACTIVE = 12
    static Admin_GetAll_Object_REFUSE = 13
    static Admin_GetAll_Object_DISABLE = 14
    static Admin_Object_OTHER = 15
  }

export class Object_FormId {
    static Partner_GetAll_Object = 2;
    static Partner_GetAll_Object_NEW = 21;
    static Partner_Object_Detail = 23;
    static Partner_Object_Other = 24;

    static User_Object_GetAll = 3;
    static User_Object_Detail = 33;
    static User_Object_GetAll_LocationMap = 34;
    
}

export class Item_FormId {
    static Partner_GetAll_Item = 2;
    static Partner_GetAll_Item_NEW = 21;
    static Partner_GetAll_Item_ACTIVE = 22;
    static Partner_Item_Detail = 23;
    static Partner_Item_Other = 24;
    static Partner_GetAll_Item_Refuse = 25;
    static Partner_GetAll_Item_Disable = 26;

    static User_Item_Getall = 3;
    static User_Item_Hight_Rate = 31;
    static User_Item_Low_Rate = 32;
    static User_Item_Detail = 33;
    static User_Item_Getall_By_Object = 34;

    static User_Item_By_Rate = 35;
    
}


export class FormCase {
    static Get_All = 1;
    static Get_Detail = 2;
}

export class State_Object {
    static New = 1;
    static Active = 2;
    static Refuse = 3;
    static Disable = 4;
}

export class State_Item {
    static New = 1;
    static Active = 2;
    static Refuse = 3;
    static Disable = 4;
}

export class Review_FormId {
    static Partner_GetAll_Review = 2;
    static User_GetAll_Review_By_Product = 3;
    static User_GetAll_Review_By_Shop = 31;
}

export class Order_State{
    static Pending = 1;
    static Approved = 2;
    static Completed = 3;
    static Refused = 4;
}

export class OwnerType{
    static invidual = 1;
    static organization = 2;
}

export class Booking_State{
    static Pending = 1;
    static Approved = 2;
    static Refused = 3;
}