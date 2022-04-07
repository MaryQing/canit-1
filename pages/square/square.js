// pages/square/square.js
//获取应用实例
var app = getApp()
Page({
  data: {
    /*点赞默认*/
      like:0,
      hasChange: false,
      show:false,
      favor_img: "../../img/like.png",
      favor_img2: "../../img/unlike.png",
    /*达人*/
    statusBarHeight: app.globalData.statusBarHeight,
    currentTabIndex:0,
    motto: 'Hello World',
    swiper:{
      userInfo: {},
      imgUrls: [
          {
              id:1,
              name: 'https://img.51miz.com/Element/00/21/60/05/40ace3a5_E216005_15b8f410.png'
          },
          {
              id: 1,
              name: 'https://bpic.588ku.com/element_origin_min_pic/19/04/23/441f3f23208ba57ba3dbae3841e12fd4.jpg'
          },
          {
              id: 1,
              name: 'https://tse1-mm.cn.bing.net/th/id/R-C.d74cf40e62166e4d09930df0b2d5b5cc?rik=z87%2bNXN%2b3hRaPQ&riu=http%3a%2f%2fwww.51wendang.com%2fpic%2f3223947bf3710f792b5efe42%2f1-810-jpg_6-1080-0-0-1080.jpg&ehk=Nu3365goLOB7u%2bNgbpR8uaiMl7EhWgqAVOyvLzFuFZg%3d&risl=&pid=ImgRaw&r=0'
          },
          {
              id: 1,
              name: 'https://img.ixintu.com/download/jpg/202004/6ca367d548d71eaafadd206807fece9b_800_400.jpg!con'
          } 
      ],
      indicatorDots: true,//是否显示面板指示点
      indicatorColor:'rgba(249,245,236,0.6)',
      indicatorActiveColor:'#FFCC66',
      autoplay: true,//是否自动切换
      interval: 5000,//自动切换时间间隔
      duration: 500,//滑动动画时长
      circular: true//是否自动切换
    },
    todayListArr:[
      {
        imgUrl:'../../img/A.jpg',
        text:'01',
        id:1
      }, 
      {
        imgUrl: '../../img/OIP-C.jpg',
        text: '02',
        id: 1
      },
      {
        imgUrl: '../../img/R.jpg',
        text: '03',
        id: 1
      }, 
      {
        imgUrl: '../../img/R-C.jpg',
        text: '04',
        id: 1
      },
      {
        imgUrl: '../',
        text: '05',
        id: 1
      },
      {
        imgUrl: '../',
        text: '06',
        id: 1
      },
      {
        imgUrl: '../',
        text: '07',
        id: 1
      }
    ],
    isLoading:false,//正在加载中
    noMore:true//是否还有更多数据
  }, 
   /*事件处理函数*/
  upper: function (e) {
      console.log(e)
  },
  lower: function (e) {
      console.log(e)
  },
  scroll: function (e) {
      console.log(e)
  },
  onReachBottom: function () {
      if(!this.data.noMore){
          var that = this;
          console.log('circle 下一页');
          this.setData({
              isLoading: true
          })
          var timer = setTimeout(function () {
              console.log(888);
              that.setData({
                  isLoading: false
              })
              clearTimeout(timer);
          }, 1000)
      }
    },
    /*生成点赞数函数*/
    praiseThis: function (e) {

      var that = this;
      var hasChange = that.data.hasChange;
  
      if (hasChange !== undefined) {
        var onum = parseInt(that.data.like);
        console.log(hasChange);
        if (hasChange == 'true') {
          that.data.like = (onum - 1);
          that.data.hasChange = 'false';
          that.data.show = false;
        } else {
          that.data.like = (onum + 1);
          that.data.hasChange = 'true';
          that.data.show = true;
        }
        this.setData({
          like: that.data.like,
          hasChange: that.data.hasChange,
          show:that.data.show
        })
      };
      wx.request({
        url: 'https://********',//这里写后台点赞接口的url
        //定义传到后台的数据
        data: {
          userID: app.globalData.openid,//我的ID
          paperID: this.data.id//文章ID
        },
        method: 'get',//定义传到后台接受的是post方法还是get方法
        success: function (res) {
          console.log("成功");
        },
        fail: function (res) {
          console.log("失败");
        }
  
      });
      var pages = getCurrentPages();//当前页面栈
      if (pages.length > 1) {
        var beforePage = pages[pages.length - 2];//获取上一个页面实例对象
        beforePage.changeData();//触发父页面中的方法
      }
    },
 
    onTabsItemTap:function(event){
      let index=event.currentTarget.dataset.index;
      this.setData({
        currentTabIndex:index
      })
    },
    /*发布跳转*/
    handlesubmmit:function(param){
      wx.navigateTo({
        url: '/pages/submmityanshi/submmityanshi',
      })
    },
    /*主页跳转*/
    barjump:function(){
      wx.navigateTo({
        url: '../../pages/homeyanshi/homeyanshi',
        success:function(res){}
      })
    },
  /**
   * 点赞数跨页面传参
   */
  onLoad: function (options) {
      var that =this;
      this.setData({
        like: option.agree,
        hasChange:option.haha
      });
      //console.log(this.data.hasChange)
      if(that.data.hasChange == 'true'){
        //console.log("1")
        that.data.show = true
      //  console.log(.data.show)
      }else{
        that.data.show = false
      };
      this.setData({
        show:that.data.show
      })
     // console.log(option.haha)
   
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})