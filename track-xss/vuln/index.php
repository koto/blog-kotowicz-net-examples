<html>
<head>
<title>Vulnerable site</title>
<style type="text/css">
input{
font-size: 20px;
}
li {
float: left;
border-right: 1px solid #ccc;
list-style: none;
padding: 0 1em;
}
ul {
margin: 1em 0;
height: 1em;
padding: 0;
}
.warning {
    border: 1px solid red;
    padding: 1em;
}
</style>
</head>
<body>
<ul>
<li><a href="?page=">Home</a></li>
<li><a href="?page=other">Other</a></li>
<li><a href="?page=search">Search</a></li>
<li><a href="?page=login">Login</a></li>
<li><a href="?page=upload">Upload</a></li>
<li><a href="?page=other" target="_blank">Other in new page</a></li>
<li><a href="#" onclick="window.open('?page=other')">window.open()</a></li>
<li><a href="http://www.google.com">external</a></li>
</ul>
<p class="warning">This site is just a demonstration of XSS attack vulnerability. Be careful when browsing it. See
<a href="http://blog.kotowicz.net/2010/11/xss-track-how-to-quietly-track-whole.html">here</a> for full info.
</p>
<?php if ($_GET['page'] == 'search') : ?>
    <h2>Search</h2>
    <form method="post">
    <input type="hidden" name="page" value="search" />
    Search: <input name="search" value="<?php echo $_POST['search'] ?>" /><br />
    Extra: <textarea name="extra" cols="80" rows="10"><?php echo $_POST['extra'] ?></textarea>
    <input type="submit" />
    </form>
    <?php if ($_POST['search']) : ?>
    <p>You searched for: <?php echo $_POST['search'] ?></p>
    <p>Just for the record:</p>
    <textarea rows="10" cols="80"><?php echo htmlspecialchars($_POST['extra']) ?></textarea>
    <?php endif; ?>
<?php elseif ($_GET['page'] == 'login') : ?>
    <h2>Login</h2>
    <form method="post">
    <input name="login" />
    <input type="password" name="password" />
    <button type="submit">login</button>
    </form>
    <?php if ($_POST['login'] == 'admin' && $_POST['password'] == 'secret') : ?>
    <h1>You're in!</h1>
    <p>Your secret ID is <span class="secret">SECRET_ID_1</span></p>
    <p>Your auth code is <span class="secret">SECRET_CODE</span></p>
    <?php endif;?>
<?php elseif ($_GET['page'] == 'upload') : ?>
    <h1>Upload your photos!</h1>
    <form method="post" enctype="multipart/form-data">
    Description: <input name="description" value="" /><br />
    Photo: <input type="file" name="file" value="" /><br />
    <button type="submit">Upload!</button>
    </form>
<?php elseif ($_GET['page'] == 'other') : ?>
    <h2>Other page</h2>
    <div style="height: 3000px; background: #ccc; border-bottom: 10px solid blue">my div</div>
<?php else : ?>
    <h2>Home page</h2>
    <p><?php echo date() ?></p>
<?php endif;?>
</body>
</html>

