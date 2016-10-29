<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, height=device-height,initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Shopping Stuff | Home</title>
    <link rel="icon" href="../assets/img/logo.png">
    <link rel="stylesheet" type="text/css" href="../assets/plugins/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../assets/plugins/fontawesome/css/font-awesome.css">
    <link rel="stylesheet" type="text/css" href="../assets/plugins/datatables/css/jquery.datatables.min.css">
    <link rel="stylesheet" type="text/css" href="../assets/plugins/jquery-ui/jquery-ui.css">
    <link rel="stylesheet" type="text/css" href="../assets/plugins/bootstrap-datepicker/css/datepicker.css">
    <link rel="stylesheet" type="text/css" href="../assets/plugins/fullcalendar/fullcalendar.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/styles.css">
</head>
<body>
    <button class="btn fa fa-chevron-up" id="doc_arrow"></button>
    <div class='load_cover'><i><i></i></i></div>
    <div class="container-fluid">
        <nav class="navbar navbar-default _m" role="navigation" style="margin-left: -15px; margin-right: -15px">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-nav">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand page_scroll" href="#">
                    <img src="../assets/img/logo.png" height="50px" width="50px" alt="">
                    AppName
                </a>
            </div>
            <noscript>
                <style type="text/css">
                    .load_cover{
                        display: none;
                    }
                    noscript{
                        background: white;
                        position: fixed;
                        top: 20%;
                        width: 100%;
                        height: 40%;
                        text-align: center;
                        left: 0;
                        padding: 5% 10%;
                        font-size: 20px;
                        font-weight: bold;
                        box-shadow: 0px 2px 12px rgba(0,0,0,0.2);
                    }
                    .container-fluid{
                        opacity: 0.5;
                    }
                    body{
                        background: #666;
                    }
                </style>
                PLEASE
                <span class="text-danger">ENABLE JAVASCRIPT</span> IN YOUR BROWSER SETTINGSS
                OR <span class="text-danger">DISABLE SPEED MODE </span>
                ON GOOGLE CHROME(MOBILE) OR UC BROWSER(MOBILE)
                AND <a href="index.html">RELOAD</a> THE PAGE.
            </noscript>
            <ul class="nav navbar-nav navbar-right navbar-collapse collapse">
                <li>
                    <a href="#" class="tip" data-toggle="tooltip" data-placement="bottom" title="Welcome">
                        Welcome User <i class="fa fa-hand-o-right"></i>
                    </a>
                </li>
                <li>
                    <a href="#" class="tip btn-warning login_toggle" data-toggle="tooltip" data-placement="bottom" title="Login">
                        Login
                    </a>
                </li>
                <li class="signup">
                    <a href="#" class="tip btn-default" data-toggle="tooltip" data-placement="bottom" title="Login">
                        Signup
                    </a>
                </li>
                <li>
                    <a href="#" class="tip" data-toggle="tooltip" data-placement="bottom" title="Cart">
                        <i class="fa fa-shopping-cart text-warning"></i> Cart
                    </a>
                </li>
            </ul>
        </nav>
        <div class="row login">
            <div class="col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4">
                <span class="pull-right login_toggle">&times;</span>
                <form id="login_form">
                    <fieldset>
                        <legend>
                            <span class="text-pink">Please fill in your details</span>
                        </legend>
                        <div class="alert message"></div>
                        <div class="form-group">
                            <label for="login_number">Email address</label>
                            <div class="input-group">
                                <span class="input-group-addon before"><i class="fa fa-envelope-o"></i></span>
                                <input type="email" class="form-control" id="login_email" name="email" required="required" placeholder="Enter email address">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <div class="input-group">
                                <span class="input-group-addon before"><i class="fa fa-key"></i></span>
                                <input type="password" class="form-control" id="password" name="password" required="required" placeholder="******">
                            </div>
                        </div>
                        <br>
                        <button class="btn btn-warning btn-block">Login</button>
                        lost or forgot password? click <a href="#" data-toggle="modal" data-target="#reset_modal">here</a>
                    </fieldset>
                </form>
            </div>
        </div>
        <form action="../php/session.php" class="hidden"></form>
    </div>

<script src="../assets/plugins/jquery/jquery.min.js"></script>
<script src="../assets/plugins/jquery-ui/jquery-ui.js"></script>
<script src="../assets/plugins/jquery/jquery.easing.min.js"></script>
<script src="../assets/plugins/bootstrap/js/bootstrap.min.js"></script>
<script src="../assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js"></script>
<script src="../assets/plugins/datatables/js/jquery.datatables.js"></script>
<script src="../assets/plugins/fullcalendar/lib/moment.min.js"></script>
<script src="../assets/plugins/fullcalendar/fullcalendar.js"></script>
<script src="../assets/js/library.js"></script>
<script src="../assets/js/functions.js"></script>
<script src="../assets/js/ui.js"></script>
<script src="../assets/js/pages/login.js"></script>
</body>
</html>
