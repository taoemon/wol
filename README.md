開発経験のないIT技術者（ネットワーク系）が、GPT-4o を利用して作成したコード群です。
自宅のデスクトップパソコンを、WOLで起動するために作成

# wol.html
このコードは、Wake On LAN (WOL) と Ping テストを実行するための HTML、CSS、JavaScript ファイルです。
特定のパソコンを WOL で起動し、それに対して Ping を実行することができます。

全体概要
* WOL と Ping テストを実行するための Web アプリケーションで、特定のパソコンを WOL で起動し、それに対して Ping を実行することができます。
* ユーザーは、HTML フォームで IP アドレスと回数を入力し、Ping を開始できます。また、WOL を使用して特定のパソコンを起動するためのボタンも提供されます。

機能概要
1. wol.js は、WOL パケットと Ping テストを実行するための関数 wolPing と、カウントダウンを開始するための関数 startCountdown を提供します。
2. wol_ping.js は、Ping を実行するための関数 wolSendPing を提供します。
3. index.html は、WOL と Ping テストのための HTML フォームを提供し、WOL ボタンと Ping ボタンを表示します。
4. WOL ボタンをクリックすると、特定のパソコンに WOL ・パケットと Ping テストが送信されます。
5. Ping ボタンをクリックすると、ユーザーが入力した IP アドレスと回数で Ping テストが実行されます。また、実行結果は textarea 要素に表示されます。


# wol.css
このファイルはCSSファイルであり、HTMLファイルで使用されるページ全体のスタイルを定義しています。

全体概要
* HTMLファイルで使用されるページ全体のスタイルを定義するCSSファイルです。

機能概要
1. ページ全体のフォント、マージン、パディングなどのスタイルを定義します。
2. Wake On LANコンテナ、Wake On LANアイテム、フォーム、送信ボタン、textareaなどの要素のスタイルを定義します。
3. レスポンシブデザインに対応しており、画面幅が767px以下の場合に適用されるスタイルも定義されています。


# wol.js
このコードは、WOL（Wake-on-LAN）パケットを送信して、指定されたIPアドレスのデバイスを起動し、
その後、Pingを送信して、そのデバイスが起動したかどうかを確認するための関数を定義しています。

全体概要
* wolSettingsという配列に複数のデバイスの設定を定義する。
* wolPing()という関数を定義し、指定されたデバイスの設定を使用して、WOLパケットを送信し、Pingを送信する。

機能概要
1. wolSettings配列には、複数のオブジェクトが含まれており、それぞれが1つのデバイスの設定を表す。
2. wolPing()関数は、次のような手順で実行される。
3. wolResultIdとcountdownIdによって指定されたHTML要素に表示されるテキストを更新する。
4. FormDataオブジェクトを作成し、IPアドレス、MACアドレス、送信回数を設定する。
5. fetch()を使用して、WOLパケットを送信し、結果に応じてwolResultIdに表示されるテキストを更新する。
6. WOLパケットが正常に送信された場合は、countdownIdに表示されるカウントダウンを開始する。
7. カウントダウンが0になったら、wolSendPing()関数を呼び出して、指定されたIPアドレスに対してPingを送信する。
8. startCountdown()関数は、指定された秒数のカウントダウンを開始し、カウントダウンが0になったらwolSendPing()関数を呼び出して、指定されたIPアドレスに対してPingを送信する。


# wol.php
このファイルはPHPで書かれたWOL(Wake On LAN)パケットを送信するためのスクリプトです。
WOLは、リモートコンピュータを起動するためにネットワーク上で特定のパケットを送信する技術です。

全体概要
* WOLパケットを作成して、ブロードキャストアドレスに送信する関数や、MACアドレスを16進数からバイナリに変換する関数などが含まれるPHPスクリプトです。

機能概要
1. createMagicPacket()関数：MACアドレスを16進数からバイナリに変換し、WOLパケットを作成する関数
2. sendWOLPacket()関数：UDPソケットを作成して、ブロードキャストアドレスにWOLパケットを送信する関数
3. wol()関数：ブロードキャストアドレスとMACアドレスを受け取り、WOLを実行する関数
4. $_POST変数からIPアドレス、MACアドレス、送信回数を取得する
5. ol()関数を呼び出して、ブロードキャストアドレスでWOLを実行する。成功した場合は何も返さず、失敗した場合はHTTPレスポンスコード500を返す。


# wol_ping.js
# ping.js
この JavaScript コード (ping.js) は、ユーザーが指定した IP アドレスに対して Ping テストを行う機能を提供します。
Ping テストの結果は、Webページ上の div 要素に一定間隔（1秒）で表示されます。
このコードは、ユーザーが Web フォームに IP アドレスと Ping の回数を入力すると、Fetch API を使用して ping.php スクリプトにリクエストを送信します。

全体概要
* 指定されたIPアドレスに対してPingを送信するJavaScriptの関数。

機能概要
1. ユーザーからのフォーム送信イベントをキャンセルし、ページのリロードを防ぎます。
2. ユーザーが入力した IP アドレスと Ping の回数を取得します。
3. Ping の結果を表示するための div 要素を取得し、表示内容をクリアします。
4. Fetch API を使用して、ping.php スクリプトにリクエストを送信します。このリクエストには、ユーザーが入力した IP アドレスと Ping の回数が含まれています。
5. ping.php スクリプトからのレスポンスを取得し、エラーがある場合はそのエラーメッセージを表示します。
6. レスポンスにエラーがない場合、IP アドレスとホスト名を表示し、Ping テストの結果を 1 秒ごとに div 要素に追加します。
7. Ping テストの結果がすべて表示されたら、結果の追加を停止します。


# wol_ping.php
# ping.php
このファイルは、Pingコマンドを使用して、指定されたIPアドレス（またはホスト名）に対してPingテストを実行するためのPHPスクリプトです。

全体概要
* Pingテストを実行するためのPHPスクリプト。
* 指定されたIPアドレス（またはホスト名）に対して、指定された回数のPingを実行し、結果を表示します。

機能概要
1. ping関数：指定されたIPアドレスに対して、指定された回数のPingを実行し、結果を配列として返します。
2. IPアドレスと回数がGETされている場合：IPアドレスに対してping関数を実行し、結果を表示します。
3. IPアドレスまたは回数が入力されていない場合のエラーメッセージを表示します。
