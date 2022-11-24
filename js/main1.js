
// -----------------------index.htmlの操作-----------------------

$("#start-button").on("click",function(){
    const userName = $("#user-name").val();
    if(userName ==""){
        localStorage.setItem("userNameKey","夢見る名無しちゃん");
        console.log('このひと名前いれてない');
    } else{
    localStorage.setItem("userNameKey",userName);
    }
    console.log("スタートボタンが押されました");
});
