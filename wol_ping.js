// wol_ping.js
// Ping送信する関数
function wolSendPing(targetIpAddress) {
    // Ping送信用のURLを作成
    const url = `wol_ping.php?ip_address=${encodeURIComponent(targetIpAddress)}&count=5`;

    // 結果を表示するiframe要素を指定
    const iframe = document.createElement('ping-iframe');
    iframe.src = url;

    // Ping送信用のフォームを指定
    const form = document.createElement('form');
    form.method = 'get';
    form.action = 'wol_ping.php';
    form.target = 'ping-iframe';
    form.style.display = 'none';

    // IPアドレスを指定するinput要素を指定
    const ipInput = document.createElement('input');
    ipInput.type = 'hidden';
    ipInput.name = 'ip_address';
    ipInput.value = targetIpAddress;
    form.appendChild(ipInput); // フォームに追加

    // Ping送信回数を指定するinput要素を作成
    const countInput = document.createElement('input');
    countInput.type = 'hidden';
    countInput.name = 'count';
    countInput.value = '5';
    form.appendChild(countInput); // フォームに追加

    // フォームをDOMに追加
    document.body.appendChild(form);
    // フォームを送信（Ping送信を開始）
    form.submit();
}
