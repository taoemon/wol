// wol.js
// 複数のデバイス用の設定
// 新しいデバイスを追加するには、下記の「wolSettings」配列に新しいオブジェクトを追加してください。
const wolSettings = [
    // 1つ目のデバイスの設定
    { url: 'wol.php', targetIpAddress: '192.168.1.10', macAddress: '00:00:00:00:00:00', count: 3 },
    // 2つ目のデバイスの設定
    { url: 'wol.php', targetIpAddress: '192.168.1.11', macAddress: '11:11:11:11:11:11', count: 3 },
    // 他のデバイスもここに追加できます
];

// WOLパケットとPingを送信する関数
async function wolPing(settings, wolResultId, countdownId) {
    const wolResult = document.getElementById(wolResultId);
    wolResult.innerText = 'WOLパケット送信中...';

    // FormDataを作成し、IPアドレス、MACアドレス、送信回数を設定
    const formData = new FormData();
    formData.append('ip_address', settings.targetIpAddress);
    formData.append('mac_address', settings.macAddress);
    formData.append('count', settings.count);

    try {
        // WOLパケットを送信
        const response = await fetch(settings.url, { method: 'POST', body: formData });
        // 送信結果に応じて表示内容を更新
        wolResult.innerText = response.ok ? 'WOLパケットの送信に成功しました。' : 'WOLパケットの送信に失敗しました。';
        
        // WOLパケット送信成功時、Pingのカウントダウンを開始
        if (response.ok) startCountdown(30, countdownId, settings.targetIpAddress);
    } catch (error) {
        // 送信中にエラーが発生した場合、エラーメッセージを表示
        wolResult.innerText = `エラーが発生しました: ${error.message}`;
    }
}

// カウントダウンを開始する関数
function startCountdown(seconds, countdownElementId, targetIpAddress) {
    let remaining = seconds;
    const countdownElement = document.getElementById(countdownElementId);
    countdownElement.innerText = `Ping開始までのカウントダウン: ${remaining}秒`;

    // setIntervalを使って1秒ごとにカウントダウンを更新
    const interval = setInterval(() => {
        countdownElement.innerText = `Ping開始までのカウントダウン: ${--remaining}秒`;

        // カウントダウンが0になったら
        if (remaining <= 0) {
            clearInterval(interval); // カウントダウンの更新を停止
            countdownElement.innerText = 'Pingを実行...下記のフォーム内に結果を表示';
            sendPing(targetIpAddress); // Ping送信を開始
        }
    }, 1000);
}

// Ping送信する関数
function sendPing(targetIpAddress) {
    // Ping送信用のフォームを作成
    const form = document.createElement('form');
    form.method = 'post';
    form.action = 'ping.php';
    form.target = 'ping-iframe';
    form.style.display = 'none';

    // IPアドレスを指定するinput要素を作成
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
