<?php
// pingを実行する関数
function ping($ip_address, $count)
{
    $ping_results = [];
    // Pingのコマンドは、環境に合わせて修正
    // シェルコマンドをWeb経由で実行する場合「ファイルパーミッション」の設定が必要
    // 例：# chmod 4755 /bin/ping
    $ping_command = "/bin/ping -c " . escapeshellarg($count) . " " . escapeshellarg($ip_address);

    // pingコマンドを実行し、結果を取得
    $ping_output = shell_exec($ping_command);
    $lines = explode("\n", $ping_output);
    foreach ($lines as $line) {
        // 各行からicmp_seqとtimeを抽出
        if (preg_match('/icmp_seq=(\d+) .* time=([\d.]+) ms/', $line, $matches)) {
            $ping_results[] = [
                'icmp_seq' => (int) $matches[1],
                'time' => (float) $matches[2],
            ];
        }
    }
    return $ping_results;
}

// IPアドレスと回数がGETされている場合
if (isset($_GET['ip_address']) && isset($_GET['count'])) {
    $ip_address = $_GET['ip_address'];
    $count = $_GET['count'];
    // IPアドレスからホスト名を取得
    $host_name = gethostbyaddr($ip_address);
    // pingの結果を取得
    $ping_results = ping($ip_address, $count);

    // 結果を表示
    echo "<pre>Ping Test 結果 ($ip_address, $host_name)\n";
    foreach ($ping_results as $result) {
        echo 'icmp_seq=' . $result['icmp_seq'] . ' time=' . $result['time'] . " ms\n";
    }
    echo "</pre>";
} else {
    // IPアドレスまたは回数が入力されていない場合のエラーメッセージ
    echo "IPアドレス(ホスト名)または回数が入力されていません。";
}
?>
