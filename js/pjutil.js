// Loading画像制御クラス ///////////////////////////////////////////////////////
// コンストラクタ
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
///////////////////////////////////////////////////////////////////////////////
