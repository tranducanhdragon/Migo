export class AppConsts {

    static remoteServiceBaseUrl: string;
    static appBaseUrl: string;
    static appBaseHref: string; // returns angular's base-href parameter value if used during the publish

    static localeMappings: any = [];

    static readonly userManagement = {
        defaultAdminUserName: 'admin'
    };

    static readonly localization = {
        defaultLocalizationSourceName: 'WebPublic'
    };

    static readonly authorization = {
        encryptedAuthTokenName: 'enc_auth_token'
    };

      //properties type

      static readonly propertiesType = [
        {name:"Hộp văn bản", value: 1},
        {name:"Hộp văn bản nhiều dòng", value: 2},
        {name:"Danh sách thả xuống", value: 3},
        {name:"Bảng chọn ngày", value: 4},
        {name:"Radio button", value: 5},
        {name:"Tải lên hình ảnh", value: 6},
        {name:"Tải lên video", value: 7},
        {name:"Tệp tải lên", value: 8},
        {name:"Hộp kiểm chỉ đọc", value: 9},
        {name:"Editor", value: 10},
        {name:"Số", value: 11},
      ];


      static readonly dataType = [
        {name:"String", value: 1},
        {name:"Number", value: 2},
        {name:"DateTime", value: 3},
        {name:"Boolean", value: 4},
        {name:"Array", value: 5},
        {name:"Any", value: 6},
      ];


      //Treenode
      static readonly Folder = "Folder";
      static readonly Item = "Item";

      //

      //queryKey

      static readonly Goods_Item_Properties = "Goods.Item.Properties";
      static readonly Goods_Item_Properties_InfoDetail = "Goods.Item.Properties.InfoDetail";
      static readonly Goods_Item_Properties_InfoSeller = "Goods.Item.Properties.InfoSeller";
      static readonly Goods_Item_Properties_InfoOther = "Goods.Item.Properties.InfoOther";


      static readonly goods_item_infoType = [
        {name: AppConsts.Goods_Item_Properties_InfoDetail, value: "Thông tin chi tiết"},
        {name: AppConsts.Goods_Item_Properties_InfoSeller, value: "Thông tin bán hàng"},
        {name: AppConsts.Goods_Item_Properties_InfoOther, value: "Thông tin khác"}

      ];

      static readonly Repair_Item_Properties_Electric =
      "Repair.Item.Properties.Electric";

}
