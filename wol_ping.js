// wol_ping.js
// Ping結果を送信し、リアルタイムで結果を表示する関数
function wolSendPing(targetIpAddress, pingResultsId, pcName) {
	const ipAddress = targetIpAddress;
	const count = '5'; // Ping 回数
	const pingResultsDiv = document.getElementById(pingResultsId);

	// 結果をクリアします。
	pingResultsDiv.value = "";

	// 以前のintervalがあればクリア
	if (window.pingIntervalId !== null) {
		clearInterval(window.pingIntervalId);
		window.pingIntervalId = null;
	}

	// PC名とPing開始メッセージを追加
	pingResultsDiv.value += `=== ${pcName} (${ipAddress}) へのPingテスト開始 ===\n`;

	fetch(`wol_ping.php?ip_address=${encodeURIComponent(ipAddress)}&count=${encodeURIComponent(count)}`)
		.then(response => {
			if (!response.ok) {
				throw new Error(`ステータスエラー: ${response.status}`);
			}
			return response.json();
		})
		.then(data => {
			if (data.error) {
				pingResultsDiv.value += `エラー: ${data.error}\n`;
			} else {
				pingResultsDiv.value += `ホスト名: ${data.host_name}\n`;

				let index = 0;
				window.pingIntervalId = setInterval(() => {
					if (index < data.ping_results.length) {
						const result = data.ping_results[index];
						pingResultsDiv.value += `icmp_seq=${result.icmp_seq} time=${result.time} ms\n`;
						pingResultsDiv.scrollTop = pingResultsDiv.scrollHeight;
						index++;
					} else {
						pingResultsDiv.value += `=== ${pcName} へのPingテスト終了 ===\n`;
						pingResultsDiv.scrollTop = pingResultsDiv.scrollHeight;
						clearInterval(window.pingIntervalId);
						window.pingIntervalId = null;
					}
				}, 1000);
			}
		})
		.catch(error => {
			pingResultsDiv.value += `フェッチエラー: ${error.message}\n`;
		});
}
