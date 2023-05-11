// wol_ping.js
// Ping を送信する関数
function wolSendPing(targetIpAddress) {
    // Ping を送信するための URL を作成します。
    const url = `wol_ping.php?ip_address=${encodeURIComponent(targetIpAddress)}&count=5`;

    // Fetch APIを使用してリクエストを送信します。
    fetch(url)
        .then(response => {
            // レスポンスをテキストとして取得します。
            return response.text();
        })
        .then(text => {
            // 結果を表示するtextarea要素を取得します。
            const textarea = document.getElementById('ping-results');

            // 結果をtextareaに表示します。
            textarea.value = text;
        })
        .catch(error => {
            console.error('Error:', error);
        });

    // Ping を送信するためのフォームを指定します。
    const form = document.getElementById('form');
    form.method = 'get';
    form.action = 'wol_ping.php';
    form.target = 'ping-results';
    form.style.display = 'none';

    // IP アドレスを指定する入力要素を指定します。
    const ipInput = document.getElementById('input');
    ipInput.type = 'hidden';
    ipInput.name = 'ip_address';
    ipInput.value = targetIpAddress;
    form.appendChild(ipInput); // フォームに追加します。

    // Ping の回数を指定する入力要素を作成します。
    const countInput = document.getElementById('input');
    countInput.type = 'hidden';
    countInput.name = 'count';
    countInput.value = '5';
    form.appendChild(countInput); // フォームに追加します。

    // フォームを DOM に追加します。
    document.body.appendChild(form);
    // フォームを送信します（Ping の送信を開始します）。
    form.submit();
}
