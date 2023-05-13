// wol_ping.js
// 関数 wolSendPing() は、ping テストを実行します。
function wolSendPing(targetIpAddress) {
    // 入力された IP アドレスと回数を取得します。
    const ipAddress = targetIpAddress;
    const count = '5';

    // 結果を表示する div 要素を取得します。
    const pingResultsDiv = document.getElementById("ping-results");

    // 結果をクリアします。
    pingResultsDiv.innerHTML = "";

    // wol_ping.php から結果を取得します。
    fetch(`wol_ping.php?ip_address=${encodeURIComponent(ipAddress)}&count=${encodeURIComponent(count)}`)
        .then(response => response.json())
        .then(data => {
            // エラーがある場合は、エラーメッセージを表示します。
            if (data.error) {
                pingResultsDiv.textContent = data.error;
            } else {
                // IP アドレスとホスト名を表示します。
                pingResultsDiv.textContent = `Ping テストの結果 (${data.ip_address}, ${data.host_name})\n`;

                // 1 秒ごとに結果を表示します。
                let index = 0;
                const interval = setInterval(() => {
                    // 結果の配列が終了するまで繰り返します。
                    if (index < data.ping_results.length) {
                        // 結果を 1 行ずつ表示します。
                        const result = data.ping_results[index];
                        pingResultsDiv.textContent += `icmp_seq=${result.icmp_seq} time=${result.time} ms\n`;
                        index++;
                    } else {
                        // 間隔をクリアします。
                        clearInterval(interval);
                    }
                }, 1000);
            }
        });
}
