<?php
// wol_ping.php
header("Content-Type: application/json");

// pingを実行する関数
function ping($ip_address, $count)
{
    // Pingの結果を格納する配列
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

    // Pingコマンドを実行し、その出力を取得
    $ping_output = shell_exec($ping_command);

    // Pingの出力を行ごとに分割
    $lines = explode("\n", $ping_output);

    // 各行をループして icmp_seq と time を抽出
    foreach ($lines as $line) {
        if (preg_match('/icmp_seq=(\d+) .* time=([\d.]+) ms/', $line, $matches)) {
            $ping_results[] = [
                'icmp_seq' => (int) $matches[1],
                'time' => (float) $matches[2],
            ];
        }
    }

    // 結果を返す
    return $ping_results;
}

// IPアドレスと回数がGETで送られている場合
if (isset($_GET['ip_address']) && isset($_GET['count'])) {
    // IPアドレスを取得
    $ip_address = $_GET['ip_address'];

    // 回数を取得
    $count = $_GET['count'];

    // IPアドレスからホスト名を取得
    $host_name = gethostbyaddr($ip_address);

    // Pingの結果を取得
    $ping_results = ping($ip_address, $count);

    // 結果をJSON形式で出力
    header('Content-Type: application/json');
    echo json_encode([
        'ip_address' => $ip_address,
        'host_name' => $host_name,
        'ping_results' => $ping_results,
    ]);
} else {
    // IPアドレスまたは回数が入力されていない場合のエラーメッセージ
    header('Content-Type: application/json');
    echo json_encode([
        'error' => 'IPアドレス(ホスト名)または回数が入力されていません。',
    ]);
}
?>
