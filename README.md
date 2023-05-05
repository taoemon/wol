開発経験のないIT技術者（ネットワーク系）が、GPT-4 を利用して作成したコード群です。
自宅のデスクトップパソコンを、WOLで起動するために作成


# wol.html
この HTML ファイルは、Wake On LAN (WOL) と Ping テストを実行するためのものです。
WOL は、コンピュータを遠隔で起動する技術であり、このファイルでは、リストから2つのコンピュータ(PC1とPC2)を選択して起動できます。

また、Ping テストは、ネットワーク上の他のコンピュータとの通信を確認するためのテストであり、IPアドレス(またはホスト名)と回数を入力するフォームでPingテストを実行できます。
ページには、WOLでコンピュータを起動するためのリストと、Pingテストを実行するためのフォームが含まれています。ページの構成は以下の通りです。

1. ヘッダーには、タイトル "Wake On LAN & Ping Test" が表示されます。
2. Wake On LAN セクションには、WOLとPingの送信先となるコンピュータを選択するリストが表示されます。
3. このリストには、"PC1 [192.168.1.10]" と "PC2 [192.168.1.11]" という名前のコンピュータが含まれています。
4. Ping Test セクションには、IPアドレス(ホスト名)と回数を入力するフォームが表示されます。
5. フォームを送信することで、Pingテストが実行されます。


# wol.css
wol.htmlのHTMLファイルに対するCSSスタイルシートについて説明しています。
具体的には、以下のようなスタイルが適用されています。

wol.cssファイルは、wol.htmlに対するスタイルシートであり、ページ全体、ヘッダー、メインコンテンツ、Wake On LANコンテナ、
Wake On LANアイテム、フォーム、送信ボタン、フッター、iframe、スペーサーに対してスタイルが適用されています。
また、レスポンシブデザインのためのメディアクエリが含まれており、画面幅が767px以下の場合に適用されるスタイルが定義されています。

具体的なスタイルは以下の通りです。

1. ページ全体にはArialフォントが適用され、余白とパディングが設定されています。
2. ヘッダーのテキストは中央揃えで、下部に余白が設定されています。
3. メインコンテンツの幅は最大800pxに制限され、中央揃えになっています。
4. Wake On LANコンテナはflexboxを使用してレイアウトされ、アイテム間に隙間が設定されています。
5. Wake On LANアイテムは、デフォルトで幅の50%を占めるようになっています。
6. 画面幅が767px以下の場合、レスポンシブデザインが適用され、Wake On LANアイテムが幅100%になります。
7. フォーム要素には適切な余白が設定されています。
8. テキスト入力と数値入力は幅100%で表示され、最大幅が400pxに制限されています。
9. 送信ボタンは青色の背景と白色のテキストが適用され、ホバーやアクティブ、フォーカス時のスタイルが設定されています。
10. iframeの幅と高さが設定され、中央揃えになっています。
11. スペーサー要素の高さは40pxに設定されています。


# wol.js
このファイルは、HTMLファイルwol.htmlに関連するJavaScriptファイル(wol.js)で、
Wake On LAN (WOL) のパケット送信とPingテストを実行する機能が実装されています。

以下は、機能の概要です。

1. wolSettings配列には、複数のデバイスの設定が格納されています。新しいデバイスを追加するには、この配列に新しいオブジェクトを追加します。
2. wolPing関数は、WOLパケットとPingを送信するための関数で、設定オブジェクト、WOL送信結果を表示する要素のID、カウントダウンを表示する要素のIDを引数に取ります。
3. startCountdown関数は、Ping送信までのカウントダウンを開始するための関数で、カウントダウンの秒数、カウントダウンを表示する要素のID、Pingを送信する対象のIPアドレスを引数に取ります。
4. sendPing関数は、Pingを送信するための関数で、Pingを送信する対象のIPアドレスを引数に取ります。
5. wolPing関数では、WOLパケットを送信するために、fetchを使ってwol.phpにPOSTリクエストを送信しています。送信が成功すると、カウントダウンが開始され、Pingの送信が実行されます。


# wol.php
wol.phpは、Wake On LAN (WOL) パケットを送信するための PHP スクリプトです。以下に機能の概要を説明します。

1. createMagicPacket 関数は、MAC アドレスからマジックパケットを作成するための関数です。
2. sendWOLPacket 関数は、ブロードキャストアドレスに対して WOL パケットを送信するための関数です。
3. wol 関数は、ブロードキャストアドレスと MAC アドレスを引数に取り、WOL を実行するための関数です。

このスクリプトは、クライアントから送信されたパラメータ（IP アドレス、MAC アドレス、送信回数）を取得し、
wol 関数を実行してブロードキャストアドレスに WOL パケットを送信します。

WOL が成功した場合、何も返さずに終了します。
WOL が失敗した場合、HTTP ステータスコード 500 を返します。


# ping.php
このファイルは、IPアドレスに対してpingを実行するための PHP スクリプトです。
以下に機能の概要を説明します。

このコードは、HTML ファイル wol.html と JavaScript ファイル wol.js に対する PHP ファイル (ping.php) です。
このファイルでは、指定された IP アドレスに対して ping を実行するための関数が定義されています。
ping() 関数は、与えられた IP アドレスに対して指定された回数だけ ping を実行するための関数です。
この関数は、シェルコマンドを用いて ping を実行し、各行から icmp_seq と time を抽出して結果を返します。
IP アドレスと回数が GET で受け取られた場合、このスクリプトは以下の手順で実行されます:

1. IP アドレスからホスト名を取得します。
2. ping() 関数を使って ping の結果を取得します。
3. 結果を表示します。
4. IP アドレスまたは回数が入力されていない場合、エラーメッセージが表示されます。

このスクリプトは、他のファイルと一緒に使用されることで、Wake On LAN と ping の機能を提供します。


# wol_ping.php
このファイルは、WOL後のIPアドレスに対してpingを実行するための PHP スクリプトです。
以下に機能の概要を説明します。

このコードは、HTML ファイル wol.html と JavaScript ファイル wol.js に対する PHP ファイル (ping.php) です。
このファイルでは、指定された IP アドレスに対して ping を実行するための関数が定義されています。
ping() 関数は、与えられた IP アドレスに対して指定された回数だけ ping を実行するための関数です。
この関数は、シェルコマンドを用いて ping を実行し、各行から icmp_seq と time を抽出して結果を返します。
IP アドレスと回数が GET で受け取られた場合、このスクリプトは以下の手順で実行されます:

1. IP アドレスからホスト名を取得します。
2. ping() 関数を使って ping の結果を取得します。
3. 結果を表示します。
4. IP アドレスまたは回数が入力されていない場合、エラーメッセージが表示されます。

このスクリプトは、他のファイルと一緒に使用されることで、Wake On LAN と ping の機能を提供します。
