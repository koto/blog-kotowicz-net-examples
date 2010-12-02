<?php
/**
 * Show tracking log
 * @author Krzysztof Kotowicz <kkotowicz at gmail dot com>
 * @see http://blog.kotowicz.net
 *
 * THIS FILE IS PART OF THE PROJECT FOR EDUCATIONAL USE *ONLY*
 * ANY COMMERCIAL USE, E.G. FOR VULNERABILITY ASSESSMENT,
 * PENETRATION TESTING IS PROHIBITED - CONTACT THE AUTHOR FOR PERMISSION
 *
 * PERFORMING ACTUAL ATTACKS ON WEBSITES NOT OWNED BY YOU
 * USING THIS PROJECT IS PROHIBITED!
 *
 * Parameters:
 * site - show logs for given site
 * clear=1 - will clear logs for current site
 */
?>
<html>
<head>
<title>XSS report</title>
<style type="text/css">
td {vertical-align: top; font-size: 11px;}
</style>
</head>
<body>
<?php $site = !empty($_GET['site']) ? $_GET['site'] : 'default'; ?>
<h1>Report for site: <?php echo htmlspecialchars($site); ?></h1>
<label><input type="checkbox" id="refresh" checked="checked" />Refresh every 5 sec.</label>
<?php
    try {
        $ip = $_SERVER['REMOTE_ADDR'];

        $db = new PDO('sqlite:' . dirname(__FILE__) . DIRECTORY_SEPARATOR . 'payloads.sqlite');

        if (!empty($_GET['clear'])) {
            $stmt = $db->prepare("UPDATE payloads SET hidden = 1 WHERE site = :s AND ip = :i");
            $ok = $stmt->execute(array(
                'i' => $ip,
                's' => $site,
            ));
            if ($ok) {
                echo "<h2>Cleared</h2>";
            }
        }

        $stmt = $db->prepare("SELECT ip, date, payload FROM payloads WHERE hidden <> 1 AND site = ? AND ip = ? ORDER BY id DESC");

        if (!$stmt) {
            throw new Exception('error with db query');
        }

        $result = $stmt->execute(array($site, $ip));
?>

<table>
<thead>
<tr>
<th>IP</th>
<th>Date</th>
<th>Payload</th>
</tr>
</thead>
<tbody>
    <?php while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) : ?>
    <?php $r = array_map('htmlspecialchars', $row); ?>
    <tr>
    <td><?php echo $r['ip'] ?></td>
    <td><?php echo $r['date'] ?></td>
    <td><?php
    if ($payload = json_decode($row['payload'])) {
        foreach ($payload as $k => $v) {
            if ($k == 'contents' && $payload->event == 'file') {
                echo htmlspecialchars($k) . ': <a href="captured_files/' . htmlspecialchars($v) . '">' . htmlspecialchars($v) . "</a><br />";
            } else {
                echo htmlspecialchars($k . ': ' . print_r($v, true)) . "<br />";
            }
        }
    }
    ?></td>
    </tr>
    <?php endwhile; ?>
</tbody>
</table>
<?php
    } catch (Exception $e) {
        echo $e->getMessage();
    }
?>
<script type="text/javascript">
function refresh() {
    if (document.getElementById('refresh').checked) {
        window.location.reload();
    }
}
setTimeout(refresh, 5000);
</script>
</body>
</html>