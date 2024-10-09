// wol.js
// 複数のデバイスの設定
const wolSettings = [
	{
		url: 'wol.php',
		targetIpAddress: '192.168.1.1', // IPを追加
		macAddress: '11:11:11:11:11:11', // macアドレスを追加
		count: 3, // WOLパケット数
		name: 'PC1' // PC名を追加
	},
	{
		url: 'wol.php',
		targetIpAddress: '192.168.1.2', // IPを追加
		macAddress: '22:22:22:22:22:22', // macアドレスを追加
		count: 3, // WOLパケット数
		name: 'PC2' // PC名を追加
	}
];

// WOLパケットとPingを送信する関数
async function wolPing(settings, wolResultId, countdownId, pingResultsId) {
	const wolResult = document.getElementById(wolResultId);
	wolResult.innerText = 'WOLパケット送信中...';

	const formData = new FormData();
	formData.append('ip_address', settings.targetIpAddress);
	formData.append('mac_address', settings.macAddress);
	formData.append('count', settings.count);

	try {
		const response = await fetch(settings.url, { method: 'POST', body: formData });
		wolResult.innerText = response.ok ? 'WOLパケットの送信に成功しました。' : 'WOLパケットの送信に失敗しました。';

		if (response.ok) {
			// カウントダウンを開始 Ping開始までの待機時間（秒）
			startCountdown(30, countdownId, settings.targetIpAddress, pingResultsId, settings.name);  // PC名を渡す
		}
	} catch (error) {
		wolResult.innerText = `エラーが発生しました: ${error.message}`;
	}
}

// カウントダウンを行い、Pingを開始する関数
function startCountdown(seconds, countdownElementId, targetIpAddress, pingResultsId, pcName) {
	let remaining = seconds;
	const countdownElement = document.getElementById(countdownElementId);
	countdownElement.innerText = `Ping開始までのカウントダウン: ${remaining}秒`;

	const interval = setInterval(() => {
		countdownElement.innerText = `Ping開始までのカウントダウン: ${--remaining}秒`;

		if (remaining <= 0) {
			clearInterval(interval);
			countdownElement.innerText = 'Pingを実行中...';
			// Ping処理を呼び出す
			wolSendPing(targetIpAddress, pingResultsId, pcName);  // PC名を渡す
		}
	}, 1000);
}
