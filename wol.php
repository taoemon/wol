<?php
// MACアドレスからマジックパケットを作成する関数
function createMagicPacket($mac)
{
    // 16進数の文字列からバイナリデータに変換
    $hwaddr = pack('H*', preg_replace('/[^0-9a-fA-F]/', '', $mac));
    // マジックパケットを作成
    return sprintf('%s%s', str_repeat(chr(255), 6), str_repeat($hwaddr, 16));
}

// WOLパケットを送信する関数
function sendWOLPacket($broadcast, $packet)
{
    // UDPソケットを作成
    $sock = socket_create(AF_INET, SOCK_DGRAM, SOL_UDP);
    if ($sock === false) {
        return false;
    }

    // ブロードキャストオプションを設定
    $options = socket_set_option($sock, SOL_SOCKET, SO_BROADCAST, true);
    if ($options === false) {
        socket_close($sock);
        return false;
    }

    // ブロードキャストアドレスにマジックパケットを送信
    $result = socket_sendto($sock, $packet, strlen($packet), 0, $broadcast, 7);
    socket_close($sock);
    return $result !== false;
}

// WOLを実行する関数
function wol($broadcast, $mac)
{
    // マジックパケットを作成
    $magicPacket = createMagicPacket($mac);
    // マジックパケットを送信
    return sendWOLPacket($broadcast, $magicPacket);
}

// クライアントから送られてきたパラメータを取得
$target_ip_address = $_POST['ip_address'];
$mac_address = $_POST['mac_address'];
$count = $_POST['count'];

// ブロードキャストアドレスでWOLを実行
$ip_parts = explode('.', $target_ip_address);
$broadcast_ip = "{$ip_parts[0]}.{$ip_parts[1]}.{$ip_parts[2]}.255";
if (wol($broadcast_ip, $mac_address)) {
    // 成功時の処理
} else {
    // 失敗時の処理
    http_response_code(500);
}
?>
