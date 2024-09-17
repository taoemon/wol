<?php
// ping.php
header("Content-Type: application/json");

// Ping を実行する関数
function ping($ip_address, $count) {
    // Ping の結果を格納する配列
    $ping_results = [];

    // Ping コマンドの構築
    // -c パラメータはパケット数を指定します
    // -n パラメータはパケット数を指定します（Windows のみ）
    // シェルコマンドをWeb経由で実行する場合「ファイルパーミッション」の設定が必要
    // ユーザー入力をエスケープしてコマンドインジェクションを防止
    // countを整数にキャストして不正な値を防ぐ
    // 例：# chmod 4755 /bin/ping
    $ip_address = escapeshellarg($ip_address); // ユーザー入力をエスケープ
    $count = (int)$count; // 整数にキャスト
    $ping_command = "/bin/ping -c {$count} {$ip_address}";
    // Ping コマンドを実行し、その出力を取得
    $ping_output = shell_exec($ping_command);
    if ($ping_output === null) {
        // shell_execが失敗した場合のエラーメッセージを返す
        return ['error' => 'Pingコマンドの実行に失敗しました。'];
    }

    // Ping の出力を行ごとに分割
    $lines = explode("\n", $ping_output);

    // 各行をループして icmp_seq と time を抽出
    foreach ($lines as $line) {
        // 正規表現で icmp_seq と time を検索
        if (preg_match('/icmp_seq=(\d+) .* time=([\d.]+) ms/', $line, $matches)) {
            // 結果を配列に追加
            $ping_results[] = [
                'icmp_seq' => (int) $matches[1],
                'time' => (float) $matches[2],
            ];
        }
    }

    // 結果を返す
    return $ping_results;
}

// IP アドレスと回数が GET されている場合
if (isset($_GET['ip_address']) && isset($_GET['count'])) {
    // IP アドレスを取得
    $ip_address = $_GET['ip_address'];

    // 回数を取得
    $count = $_GET['count'];

    // IP アドレスからホスト名を取得
    $host_name = gethostbyaddr($ip_address);

    // Ping の結果を取得
    $ping_results = ping($ip_address, $count);

    // IP アドレス、ホスト名、Ping 結果を JSON 形式で出力
    echo json_encode([
        'ip_address' => $ip_address,
        'host_name' => $host_name,
        'ping_results' => $ping_results
    ]);
} else {
    // IP アドレスまたは回数が入力されていない場合のエラーメッセージ
    echo json_encode([
        'error' => "IPアドレス(ホスト名)または回数が入力されていません。"
    ]);
}
?>
