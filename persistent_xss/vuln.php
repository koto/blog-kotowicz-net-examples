<html>
<head>
<script type="text/javascript" src="http://code.jquery.com/jquery-1.4.3.min.js"></script>
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
</style>
</head>
<body>
<ul>
<li><a href="?page=">Home</a></li>
<li><a href="?page=other">Other</a></li>
<li><a href="?page=search">Search</a></li>
<li><a href="?page=login">Login</a></li>
</ul>
<?php if ($_GET['page'] == 'search') : ?>
    <h2>Search</h2>
    <form>
    <input type="hidden" name="page" value="search" />
    Search: <input name="search" value="<?php echo $_GET['search'] ?>" /><br />
    Extra: <textarea name="extra" cols="80" rows="10"><?php echo $_GET['extra'] ?></textarea>
    <input type="submit" />
    </form>
    <?php if ($_GET['search']) : ?>
    <p>You searched for: <?php echo $_GET['search'] ?></p>
    <p>Just for the record:</p>
    <textarea rows="10" cols="80"><?php echo htmlspecialchars($_GET['extra']) ?></textarea>
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
    <?php endif;?>
<?php elseif ($_GET['page'] == 'other') : ?>
    <h2>Other page</h2>
    <p>Bla bla bla</p>
<?php else : ?>
    <h2>Home page</h2>
    <p><?php echo date() ?></p>
<?php endif;?>
</body>
</html>

