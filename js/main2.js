

// -----------------------intro-game.htmlの操作-----------------------



// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, query,  orderByChild, serverTimestamp, onValue,remove,onChildRemoved } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "",
    authDomain: "dev245-a27ab.firebaseapp.com",
    projectId: "dev245-a27ab",
    storageBucket: "dev245-a27ab.appspot.com",
    messagingSenderId: "199115849151",
    appId: "1:199115849151:web:0a6a9509ba5c0de740f50a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db, 'dev245'); //dev245というツリーに送る
let pushFlag = true; //
console.log(pushFlag);
let h = "";
let target = document.getElementById('conversation-area');

// botのセリフを定義
const botInitialMsg = `
<div class = "bot-area">
    <div class="bot-img">
        <img src="img/bot-img.png" alt="">
    </div>
    <div class="bot-content">
        <div class="bot-name">
            <span>イントロおねえさん</span>
        </div>
        <div class = "bot-text">
            <p>準備ができたら「ゲームスタート」を押してね！</p>
        </div> 
    </div>
</div> `

// $(window).on("load", function () { //ページが読み込まれたら実行

    let randomNumber = "";
    const question = [  // 曲の配列
    {name: "キセキ", audio: "audio/q0.mov" ,sabi:"audio/q0-a.mov" }, 
    {name: "夜に駆ける", audio: "audio/q1.mov",sabi: "audio/q1-a.mov"}, //0
    {name: "炎", audio: "audio/q2.mov",sabi: "audio/q2-a.mov"}, 
    {name: "白日", audio: "audio/q3.mov",sabi: "audio/q3-a.mov"}, 
    {name: "HANABI", audio: "audio/q4.mov",sabi: "audio/q4-a.mov"}, 
    {name: "Love so sweet", audio: "audio/q5.mov",sabi: "audio/q5-a.mov"}, 
    {name: "HANABI", audio: "audio/q6.mov",sabi: "audio/q6-a.mov"}, 
    {name: "3月9日", audio: "audio/q7.mov",sabi: "audio/q7-a.mov"}, 
    {name: "ハナミズキ", audio: "audio/q8.mov",sabi: "audio/q8-a.mov"}, 
    {name: "雪の華", audio: "audio/q9.mov",sabi: "audio/q9-a.mov"}, 
    {name: "小さな恋のうた", audio: "audio/q8.mov",sabi: "audio/q10-a.mov"}, 
    {name: "サウダージ", audio: "audio/q11.mov",sabi: "audio/q11-a.mov"}, 
    {name: "TSUNAMI", audio: "audio/q12.mov",sabi: "audio/q12-a.mov"}, 
    {name: "カブトムシ", audio: "audio/q13.mov",sabi: "audio/q13-a.mov"}, 
    {name: "チェリー", audio: "audio/q14.mov",sabi: "audio/q14-a.mov"}, 
    {name: "残酷な天使のテーゼ", audio: "audio/q15.mov",sabi: "audio/q15-a.mov"}, 
    {name: "川の流れのように", audio: "audio/q16.mov",sabi: "audio/q16-a.mov"}, 
    {name: "Lemon", audio: "audio/q17.mov",sabi: "audio/q17-a.mov"}, 
    {name: "恋", audio: "audio/q18.mov",sabi: "audio/q18-a.mov"}, 
    {name: "前前前世", audio: "audio/q19.mov",sabi: "audio/q19-a.mov"}, 
    {name: "恋するフォーチュンクッキー", audio: "audio/q20.mov",sabi: "audio/q20-a.mov"}, 
    ]

    let music = "";
    let sabi = "";
    let randomNumberForText = "";
    let point = 0;

    const newPostRefInitialMsg = push(dbRef); //ユニークKEYを発行する操作
    set(newPostRefInitialMsg, botInitialMsg);


    const randomMessage = [
        "さあ、わかったかな！？",
        "さあ、何の曲でしょう！？",
        "張り切って回答をどうぞ！"
    ]

    console.log("ぺーじれでぃー！");
    $("#input-area").hide();
    $("#operation-button").hide();
    // $('#output').append(botInitialMsg);

    $("#user-name-display").html(`${localStorage.getItem("userNameKey")}`);
    
    let newMusicSelect = function(){ // 新しい曲を選択する関数
        console.log("スタートボタンが押されました");
        $('#game-start').hide(); // スタートボタンを消す
        $("#input-area").show(); // 曲の入力エリア出現
        $("#operation-button").show(); // パスボタン・リプレイボタン出現
        let preStartMsg = function(){
            let preStartContent = `        
            <div class = "msg">
                <div class = "bot-text">
                        <p>スタートまで、3…<span id = countdown></span></p>
                </div>
            </div>
            `;
            pushFlag = false
            $('#output').append(preStartContent);
            target.scrollIntoView(false);
            console.log(pushFlag);
        }
        
        let countdownRest2 =function(){
            let preStartContent2 = `        
            <div class = "msg">
                <div class = "bot-text">
                        <p>2...</p>
                </div>
            </div>
            `;
            pushFlag = false
            $('#output').append(preStartContent2);
            target.scrollIntoView(false);
            console.log(pushFlag);
        }

        let countdownRest1 =function(){
            let preStartContent3 = `        
            <div class = "msg">
                <div class = "bot-text">
                        <p>1!!</p>
                </div>
            </div>
            `;
            pushFlag = false
            $('#output').append(preStartContent3);
            target.scrollIntoView(false);
            console.log(pushFlag);
        }

        let musicstart =function(){
            randomNumber = Math.floor(Math.random()* question.length); 
            console.log(`曲はNo.${randomNumber}の${question[randomNumber].name}`);
            music = new Audio(question[randomNumber].audio);
            sabi = new Audio(question[randomNumber].sabi);
            music.play();

        }

        let postMusicMsg =function(){
            randomNumberForText = Math.floor(Math.random()* randomMessage.length); 
            let postMusicContent = `        
            <div class = "msg">
                <div class = "bot-text">
                        <p>${randomMessage[randomNumberForText]}</p>
                </div>
            </div>
            `;

            pushFlag = false
            $('#output').append(postMusicContent);
        }

        setTimeout(preStartMsg, 100);
        setTimeout(countdownRest2, 1000);
        setTimeout(countdownRest1, 2000);
        setTimeout(musicstart, 3000);
        setTimeout(postMusicMsg, 4000);


        $('#replay-button').on("click",function(){
            music.play();
    })
        
    }

    $('#game-start-button').on("click",function(){
        newMusicSelect();
    });



    // 送信処理
    $('#send').on('click',function(){
        console.log(`正解の曲はNo.${randomNumber}の${question[randomNumber].name}`);

        const msg = {
            uname: localStorage.getItem("userNameKey"),
            text: $('#text').val(), // id='text'の場所を取得
            date: serverTimestamp()
        }

        h = `        
        <div class = "right" >
            <div class = "msg">
                <div class="user-name">
                <span>${msg.uname}</span>
                </div>
                <div class = "user-text">
                        <p>${msg.text}</p>
                </div>
            </div>
        </div>
        `;

        //firebaseにデータを送る準備をする
        const newPostRef = push(dbRef);
        set(newPostRef, msg); // firebaseの登録できる場所に保存する

        //送信後に入力欄を空にする
        $('#text').val("");
        pushFlag = false
        $('#output').append(h);
        console.log(`${pushFlag}, ユーザから曲名が入力されました`);

        if (msg.text == question[randomNumber].name){
            pushFlag = false
            console.log("正解！");
            $('#game-start').show();
            $("#input-area").hide();
            $("#operation-button").hide();

            let winMsg = function(){
                // $('#output').append(botWinMsg);
                sabi.play();
                target.scrollIntoView(false);
            }
            point += 10;
            const botWinMsg = `
            <div class = "bot-area">
                <div class="bot-img">
                    <img src="img/bot-img.png" alt="">
                </div>
                <div class="bot-content">
                    <div class="bot-name">
                        <span>イントロおねえさん</span>
                    </div>
                    <div class = "bot-text">
                        <p>${msg.uname}さん、だいせいかい！<br>
                        今の得点は${point}点です！</p>
                    </div> 
                    <div class = "bot-text">
                    <p>次の問題の準備ができたら「ゲームスタート」を押してね！</p>
                </div> 
                </div>
            </div> `
            $('#user-point-display').html(`${point}てん`);

            const newPostRef = push(dbRef); //ユニークKEYを発行する操作
            set(newPostRef, botWinMsg);

            setTimeout(winMsg, 1000);    
        } 
        
        else{
            console.log("ちがいます！");
            pushFlag = false

            let loseMsg = function(){

                // $('#output').append(botLoseMsg);
                target.scrollIntoView(false);
            }

            const botLoseMsg = `
            <div class = "bot-area">
                <div class="bot-img">
                    <img src="img/bot-img.png" alt="">
                </div>
                <div class="bot-content">
                    <div class="bot-name">
                        <span>イントロおねえさん</span>
                    </div>
                    <div class = "bot-text">
                        <p>${msg.uname}さん、ざんねん！惜しい！</p>
                    </div> 
                </div>
            </div> `

            const newPostRef = push(dbRef); //ユニークKEYを発行する操作
            set(newPostRef, botLoseMsg);
            setTimeout(loseMsg, 1000);    
        }

    });

    $('#pass').on('click',function(){
        newMusicSelect();
    });

//受信処理 
onValue(dbRef, function (data) { //なんかonValueを使うといいらしい
    const d = data.val();
    console.log(d, "firebaseの全データ");
    const v = query(ref(db, `dev245/`), orderByChild("date"));
    console.log(v);
    // 配列とonChildAddedを用いて、dateが小きい順の配列を作る
    let arrDate = []; //dateが大きい順に格納するローカル変数を宣言
    console.log(arrDate, "firebaseの全データ日付が大きい順");

    onChildAdded(v, function(data){ //dbRefを監視し、データが入っていれば実行
        console.log(data.key);
        console.log(data.val());
        console.log(data.date);

        const hash = {
            key: data.key,
            uname: data.val().uname,
            text: data.val().text,
            date: data.val().date
        }

        arrDate.unshift(hash); //unshiftで配列の先頭に追加する
        console.log(arrDate, "firebase全件のデータ(date昇順)");
        
    });

    

    $("#output").append(d);    
    target.scrollIntoView(false);

});

// -------ページが読み込まれたときだけ実行したい-------
    
    // onChildAdded(dbRef, function(data){ //dbRefを監視し、データが入っていれば実行
    //     const msg = data.val();
    //     console.log(msg);
    //     const key = data.key;
    //     console.log(key);

    //     if(pushFlag = false){
    //         console.log("フラグがないから表示しないよ〜〜");;
    //     } else{
    //         let delay = function(){
    //             $("#output").append(msg);
    //         }

    //         setTimeout(delay,1000);

    //     }
        

    //     target.scrollIntoView(false);

//     });
// });




