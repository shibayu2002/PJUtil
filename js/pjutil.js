// PJLoader ～Loading画像制御クラス～ //////////////////////////////////////////
// コンストラクタ
// [引数] msg:ローディング中に表示するメッセージ
PJLoader = function(msg){
  $('<img id="pj_loading" src="img/loading.gif" title="loading" alt="loading">').appendTo('body');
  $('<div id="pj_loading_text">' + msg + '</div>').appendTo('body');
};

// プロパティ
PJLoader.prototype.speed = 500;  // 画像表示スピード

// メソッド
// 画像表示開始
PJLoader.prototype.start = function() {
  $("#pj_loading").fadeIn(this.speed);
  $("#pj_loading_text").fadeIn(this.speed);
};

// 画像表示停止
PJLoader.prototype.stop = function() {
  $("#pj_loading").fadeOut(this.speed);
  $("#pj_loading_text").fadeOut(this.speed);
};

// PJHttp ～HTTPリクエスト制御クラス～ /////////////////////////////////////////
PJHttp = function(){
  this.lock = false;
};

// プロパティ
PJHttp.prototype.url = null;  // URL
PJHttp.prototype.responseType = "text";  // レスポンスType
PJHttp.prototype.callback = null;  // コールバック関数(引数：response)
PJHttp.prototype.callbackError = null;  // エラーコールバック関数(引数：status, statusText)
PJHttp.prototype.loader = null;  // PJLoader
PJHttp.prototype.lockCheck = true;
PJHttp.prototype.uploadEventListener = null;

PJHttp.prototype.sendRequest = function(params, aType) {
  var formData = new FormData();
  if(params != null){
    for(key in params){
     formData.append(key, params[key]);
    }
  }

  var xhr = new XMLHttpRequest();
  if(this.uploadEventListener != null){
    xhr.upload.addEventListener("progress", this.uploadEventListener, false);
  }
  var parent = this;

  xhr.onload = function (e) {
    try{
      if ((xhr.readyState === 4) && (xhr.status === 200)) {
        if(parent.callback != null){
          parent.callback(xhr.response);
          return;
        }
      }
      
      if(parent.callbackError != null){
        parent.callbackError(xhr.status, xhr.statusText);
      }else{
        window.alert("エラーが発生しました。" + xhr.status + ":" + xhr.statusText);
      }
    }catch(e){
      window.alert("エラーが発生しました。" + e);
    }finally{
      if(parent.loader != null){
        parent.loader.stop();
      }
      parent.lock = false;
    }
  };
  xhr.overrideMimeType('text/plain; charset=UTF-8');
  xhr.open(aType, this.url, true);
  xhr.responseType = this.responseType;
  xhr.send(formData);
};

// メソッド
// Postリクエスト
// [引数] params:リクエストパラメタ(key-valueのマップデータ)
PJHttp.prototype.post = function(params = null) {
  if(this.lockCheck && this.lock){
    window.alert("ただいま処理中です。");
    return;
  }
  this.lock = true;
  if(this.loader != null){
    this.loader.start();
  }
  var that = this;
  setTimeout(function(){that.sendRequest(params, "POST")}, 0);
}

// メソッド
// Getリクエスト
// [引数] params:リクエストパラメタ(key-valueのマップデータ)
PJHttp.prototype.get = function(params = null) {
  if(this.lockCheck && this.lock){
    window.alert("ただいま処理中です。");
    return;
  }
  this.lock = true;
  if(this.loader != null){
    this.loader.start();
  }
  var that = this;
  setTimeout(function(){that.sendRequest(params, "GET")}, 0);
}

///////////////////////////////////////////////////////////////////////////////
