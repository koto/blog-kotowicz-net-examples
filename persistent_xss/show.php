<html>
<head>
<title>XSS report</title>
</head>
<body>
<?php $site = !empty($_GET['site']) ? $_GET['site'] : 'default'; ?>
<h1>Report for site: <?php echo htmlspecialchars($site); ?></h1>
<label><input type="checkbox" id="refresh" checked="checked" />Refresh every 5 sec.</label>
<?php
    try {
        $db = new PDO('sqlite:' . dirname(__FILE__) . DIRECTORY_SEPARATOR . 'payloads.sqlite');

        $stmt = $db->prepare("SELECT ip, date, payload FROM payloads WHERE hidden <> 1 AND site = ? AND ip = ? ORDER BY id DESC");

        if (!$stmt) {
            throw new Exception('error with db query');
        }

        $ip = $_SERVER['REMOTE_ADDR'];
        $result = $stmt->execute(array($site, $ip));
?>

<table>
<thead>
<tr>
<th>IP</th>
<th>Agent</th>
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
            echo htmlspecialchars($k . ': ' . print_r($v, true)) . "<br />";
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