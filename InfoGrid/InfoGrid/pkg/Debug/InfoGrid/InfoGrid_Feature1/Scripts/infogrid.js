'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

var hostweburl, appweburl, layout = 10;

function initializePage() {
    var context = SP.ClientContext.get_current();

    $(document).ready(function () {
        JSRequest.EnsureSetup();
        getinfogrid();
    });

    function getinfogrid() {

        hostweburl = decodeURIComponent(JSRequest.QueryString["SPHostUrl"]);
        appweburl = decodeURIComponent(JSRequest.QueryString["SPAppWebUrl"]);

        var infogridList = [];

        $.ajax({
            url: appweburl + "/_api/lists/getByTitle('Settings')/items?$select=Title,Value1",
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data) {
                if (data.d.results.length > 0) {
                    for (var x = 0; x < data.d.results.length; x++) {
                        if (data.d.results[x].Title === "background-color") {
                            $('body').css("background-color", data.d.results[x].Value1);
                        }

                        if (data.d.results[x].Title === "max-width") {
                            $(".infogrid-view-port").css("max-width", data.d.results[x].Value1);
                        }

                        if (data.d.results[x].Title === "title") {
                            $(".infogrid-view-port h2").text(data.d.results[x].Value1);
                        }

                        if (data.d.results[x].Title === "layout") {
                            layout = data.d.results[x].Value1;
                        }
                    }
                }
            },
            error: function (data) {
                alert("Error: " + data);
            },

            complete: function (data) {
                $("body").css("display", "block");

                $.ajax({
                    url: appweburl + "/_api/lists/getByTitle('Info Grid List')/items?$select=Title,Contents,Attachments,AttachmentFiles&$expand=AttachmentFiles",
                    method: "GET",
                    headers: { "Accept": "application/json; odata=verbose" },
                    success: function (data) {
                        if (data.d.results.length > 0) {
                            for (var x = 0; x < data.d.results.length; x++) {
                                var fileUrl = "";

                                if (data.d.results[x].AttachmentFiles && data.d.results[x].AttachmentFiles.results.length > 0) {
                                    fileUrl = data.d.results[x].AttachmentFiles.results[0].ServerRelativeUrl;
                                }

                                infogridList.push({
                                    title: data.d.results[x].Title,
                                    subTitle: data.d.results[x].SubTitle,
                                    contents: data.d.results[x].Contents,
                                    imageUrl: fileUrl

                                });
                            }

                            insertTiles(infogridList);
                        }

                        else {
                            $('.no-items-page').css("display", "inline-block");
                        }
                    },
                    error: function (data) {
                        alert("Error: " + data);
                    }
                });
            }
        });

        $.ajax({
            url: appweburl + "/_api/web/lists/getByTitle('Info Grid List')/effectiveBasePermissions",
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data) {
                var permissions = new SP.BasePermissions();
                permissions.fromJson(data.d.EffectiveBasePermissions);
                var hasPermission = permissions.has(SP.PermissionKind.manageLists);

                if (hasPermission) {
                    $('.admin-button').css("display", "inline-block");
                }
            },
            error: function (data) {
            }
        });

   
    }


    function insertTiles(infogridList) {

        if (infogridList.length > 0) {

            var infogridTileTemplate = $("#tile-template").html();

            var infogridDocumentTemplate = $("#content-template").html();

            for (var x = 0; x < infogridList.length; x++) {

                var infogridId = "infogrid-doc-" + (x + 1)

                var infogridTile = $(infogridTileTemplate).attr("data-src", infogridList[x].imageUrl)

                infogridTile.find(".mega-title").text(infogridList[x].title)

                infogridTile.find(".fancybox").attr("data-src", "#" + infogridId)

                $("#container").append(infogridTile);

                var infogridDocument = $(infogridDocumentTemplate).attr("id", infogridId);

                infogridDocument.find(".infogrid-document-image").css("background-image", "url(" + infogridList[x].imageUrl + ")")

                infogridDocument.find(".infogrid-document-content").html(infogridList[x].contents)

                $("#infogrid-contents").append(infogridDocument);
            }

            var api = jQuery('.megafolio-container').megafoliopro(
                            {
                                delay: 20,
                                defaultWidth: 980,
                                paddingHorizontal: 20,
                                paddingVertical: 20,
                                layoutarray: [layout]
                            });

            $(".mega-entry").on("click", function (e) {
                e.stopPropagation();
                $.fancybox.open([{
                    href: $(this).find(".fancybox").attr("data-src"),
                    autoSize: false,
                    width: $('.infogrid-view-port').first().outerWidth(),
                    height: "80%"
                }],
                 {
                     padding: 0
                 });
            });
        }
    }

}

function navigateToHost() {
    window.location = hostweburl;
}

function navigateToList() {
    window.location = appweburl + "/lists/InfoGridList";
}

function navigateToSettings() {
    window.location = appweburl + "/lists/Settings";
}

function navigateToInstructions() {

    var hostweburl = decodeURIComponent(JSRequest.QueryString["SPHostUrl"]);
    var appweburl = decodeURIComponent(JSRequest.QueryString["SPAppWebUrl"]);

    window.location.href = 'Instructions.aspx?SPHostUrl=' + hostweburl + '&SPLanguage=en%2DUS&SPClientTag=0&SPProductNumber=15%2E0%2E4787%2E1000&SPAppWebUrl=' + appweburl;
}