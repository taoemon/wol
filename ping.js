// ping.js
// 関数 doPingTest() は、ping テストを実行します。
function doPingTest(event) {
	// イベントをキャンセルします。
	event.preventDefault();

	// 入力された IP アドレスと回数を取得します。
	const ipAddress = document.getElementById("ip_address").value;
	const count = document.getElementById("count").value;

	// 結果を表示する textarea 要素を取得します。
	const pingResultsDiv = document.getElementById("ping-results");

	// 結果をクリアします。
	pingResultsDiv.value = "";

	// 以前のintervalがあればクリア
	if (window.pingIntervalId !== null) {
		clearInterval(window.pingIntervalId);
		window.pingIntervalId = null;
	}

	// Ping開始メッセージを追加
	pingResultsDiv.value += `=== ${ipAddress} へのPingテスト開始 ===\n`;

	// ping.php から結果を取得します。
	fetch(`ping.php?ip_address=${encodeURIComponent(ipAddress)}&count=${encodeURIComponent(count)}`)
		.then(response => response.json())
		.then(data => {
			// エラーがある場合は、エラーメッセージを表示します。
			if (data.error) {
				pingResultsDiv.value += `エラー: ${data.error}\n`;
			} else {
				// ホスト名を表示
				pingResultsDiv.value += `ホスト名: ${data.host_name}\n`;

				// 1 秒ごとに結果を表示します。
				let index = 0;
				window.pingIntervalId = setInterval(() => {
					// 結果の配列が終了するまで繰り返します。
					if (index < data.ping_results.length) {
						const result = data.ping_results[index];
						pingResultsDiv.value += `icmp_seq=${result.icmp_seq} time=${result.time} ms\n`;
						pingResultsDiv.scrollTop = pingResultsDiv.scrollHeight; // スクロールを下に移動
						index++;
					} else {
						pingResultsDiv.value += `=== ${ipAddress} へのPingテスト終了 ===\n`;
						pingResultsDiv.scrollTop = pingResultsDiv.scrollHeight;
						clearInterval(window.pingIntervalId);
						window.pingIntervalId = null;
					}
				}, 1000);
			}
		});
}

// フォームの送信イベントに doPingTest() 関数を割り当てます。
document.getElementById("ping-form").addEventListener("submit", doPingTest);
