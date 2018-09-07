<!doctype html>

<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Info Grid</title>
    <meta name="description" content="Info Grid">
    <meta name="author" content="Ciprian Panzariu">
    <link href="../css/bundle.css" rel="stylesheet" />
</head>
<body>
    <div>
        <button class="infogrid-button" type="button" onclick="navigateToHost()"><i class="fa fa-home"></i></button>
        <button class="infogrid-button admin-button" type="button" onclick="navigateToList()" style="float: right; display: none;"><i class="fa fa-list"></i></button>
        <button class="infogrid-button admin-button" type="button" onclick="navigateToSettings()" style="float: right; display: none; margin-right: 5px;"><i class="fa fa-cogs"></i></button>
        <button class="infogrid-button admin-button" type="button" onclick="navigateToInstructions()" style="float: right; display: none; margin-right: 5px;"><i class="fa fa-info"></i></button>
    </div>
    <div class="infogrid-view-port">
        <h2 style="text-align:center;color:white;"></h2>
        <div class="no-items-page" style="color:white;font-size:18px;">
            The Info Grid list is currently empty,  <button class="infogrid-button admin-button" type="button" onclick="navigateToList()" style="font-size:18px;">Click Here</button>  to add new content.
            <p><button class="infogrid-button admin-button" type="button" onclick="navigateToInstructions()" style="font-size:18px;">Click Here</button> to read the instructions</p>
        </div>
        <div id="container" class="megafolio-container noborder norounded dark-bg-entries"></div>
        <div id="infogrid-contents" style="display: none;"></div>
    </div>
    <script type="text/javascript" src="/_layouts/15/init.js"></script>
    <script type="text/javascript" src="_layouts/15/MicrosoftAjax.js"></script>
    <script type="text/javascript" src="_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="_layouts/15/sp.js"></script>
    <script src="../Scripts/jquery-2.2.2.min.js"></script>
    <script src="../Scripts/jquery.themepunch.plugins.min.js"></script>
    <script src="../Scripts/jquery.themepunch.megafoliopro.min.js"></script>
    <script src="../Scripts/jquery.fancybox.pack.js"></script>
    <script src="../Scripts/infogrid.min.js"></script>
    <script id="tile-template" type="text/x-custom-template">
        <div class="mega-entry" id="mega-entry-1" data-width="504" data-height="400">
            <div class="mega-covercaption mega-square-bottom mega-landscape-right mega-landscape-bottom mega-blue ">
                <div class="mega-title">Pension Scheme</div>
                <div class="mega-date"></div>
                <p></p>
            </div>
            <div class="mega-coverbuttons">
                <a class="fancybox" rel="group">
                    <div class="mega-view mega-blue"></div>
                </a>
            </div>
        </div>
    </script>
    <script id="content-template" type="text/x-custom-template">
        <div class="infogrid-document">
            <div class="infogrid-document-image"></div>
            <div class="infogrid-document-content"></div>
        </div>
    </script>
</body>
</html>






