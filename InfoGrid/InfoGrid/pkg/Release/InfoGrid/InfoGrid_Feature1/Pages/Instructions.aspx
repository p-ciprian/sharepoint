<%@ Page Language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink Name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <meta name="WebPartPageExpansion" content="full" />

    <style type="text/css">
        .container {
            font-family: 'Segoe UI Light', sans-serif;
            color: #252525;
            font-weight: 100;
            font-size: 18px;
        }

            .container h1,
            .container h2,
            .container h3,
            .container h4,
            {
                font-family: inherit;
                font-weight: 300;
                line-height: 1.1;
                color: inherit;
            }


        .container {
            padding-right: 15px;
            padding-left: 15px;
            margin-right: auto;
            margin-left: auto;
        }

            .container img {
                -webkit-box-shadow: 3px 3px 3px #7C7C7C;
                box-shadow: 3px 3px 3px #7C7C7C;
            }
    </style>
    <script src="../Scripts/jquery-2.2.2.min.js"></script>
    <script type="text/javascript">
        function breakRoleInheritance() {
            JSRequest.EnsureSetup();

            hostweburl = decodeURIComponent(JSRequest.QueryString["SPHostUrl"]);
            appweburl = decodeURIComponent(JSRequest.QueryString["SPAppWebUrl"]);

            $.ajax({
                url: appweburl + "/_api/contextinfo ",
                type: 'POST',
                headers: { "accept": "application/json;odata=verbose" },
                success: function (data) {
                    if (data.d && data.d.GetContextWebInformation)

                        $.ajax({
                            url: appweburl + "/_api/web/breakroleinheritance(copyRoleAssignments = true, clearSubscopes = true)",
                            type: 'POST',
                            headers: { "accept": "application/json;odata=verbose", "content-type": "application/json;odata=verbose", "X-RequestDigest": data.d.GetContextWebInformation.FormDigestValue },
                            success: function () {
                                alert("Role Inheritance Break Succeeded !")
                            },
                            error: function (jqXHR, textStatus) {
                                alert("Role Inheritance Break Failed ! :" + jqXHR.responseJSON.error.message.value)
                            }
                        });

                },
                error: function (sender) {

                }
            });
        }
    </script>
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Information Panel Instructions
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <WebPartPages:WebPartZone runat="server" FrameType="TitleBarOnly" ID="full" Title="loc:full" />
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <div class="container">
        <p>Information Panel add-in is a very simple SharePoint solution that can be used to display an animated information panel. The add-in uses the MegafolioPro jquery plugin to display the information as a grid of animted tiles. </p>
        <h2>Adding Content</h2>
        <p>
            The "Add Content" hyperlink on the main page will open the "Information Panel List", this hyperlink is only visible to the users that have contribute permissions to this list.
            The "Information Panel List" list permissions are inherited from the host web application.
        </p>
                <p>
            <img  alt="" src="../Images/3.png" />
        </p>
        <p>
            To add new content you can just click "new item" link in the "Information Panel List" default page. You will be presented a page where to fill-in the Title and the Contents fields.
           The tile will include the Title value when presented in the grid. When the user clicks the tile a modal window will display the Title and Contents values.
           The Contents field is an Enhanced Rich Text field type, allowing you to have custom text styles. You can attach a picture using "Attach File" button on the ribbon, this picture will be displayed as the background for the tile and for the top section of the modal window.
        </p>
        <p>
            <img alt="" src="../Images/2.png" />
        </p>
        <p>You can restrict the visibility of an individual tile by selecting the corresponding list item in the Information Panel List, removing the role inheritance and assign unique permissions.(e.g. using the grid to display the company’s benefits, allowing the tiles to be visible to all except three tiles that are only visible to the Finance department).</p>
        <h2>Configuration</h2>
        <p>
            The Information Panel add-in allows few basic customizations.
      <br />
            The settings are stored as key-value pairs in the "Settings" list. The "Settings" list can be accessed from the main page of Information Panel add-in. The "Settings" link is only visible to the users that have contribute permissions for the list.
        </p>
        <p>
            <img  alt="" src="../Images/4.png" />
        </p>
        <h4>Adding a page title</h4>
        <p>To add a title to the main page a "title" key must exist in the settings list (e.g. Key:"title", Value:"My Custom Information Panel")</p>
        <h4>Changing the background color</h4>
        <p>To change the background color a "background-color" key must exist in the "Settings" list. The value can be a color string (e.g. "black") or a hex value (e.g. #000000)(e.g. Key:"infocolor", Value:"black").</p>
        <h4>Grid size</h4>
        <p>You can chnage the grid maximum width by adding a key named "max-width" (e.g. Key:"max-width", Value:"1200px").</p>
        <h4>Grid layout</h4>
        <p>
            The Information Panel add-in uses the MegafolioPro jquery plugin to generate the animated tiles.The layout of the grid can be changed by specifying a layout number which which can be found by accessing the MegafolioPro documentation: 
            <a href="http://www.clinialergias.com/simposio/gallery/megafolio/documentation/documentation.html#!/grid_layouts" title="MegafolioPro Documentation">MegafolioPro Documentation</a>
            (e.g. Key:"layout", Value:"10").
        </p>
                 <p>
            <img alt="" src="../Images/1.png" />
        </p>
        <h4>Terms List Permissions</h4>
        <p>The add-in permissions are inherited from the host web (SharePoint site where the installation was requested). In order to change the permissions for the Terms List (e.g. granting write permissions to a user) is required the removal of the add-in role inheritance.</p>
        <p>Only a user with "Manage Permissions" access rights on the host web will be able to break the role inheritance of the add-in.</p>
        <p>
            Try breaking the role inheritance by clicking the button:
            <button type="button" onclick="breakRoleInheritance()">Break Role Inheritance</button>
        </p>
        <p>Be aware that breaking the role inheritance will copy the current permission from the host web but it will not be in synch with the host web permissions (e.g. if you add a new user/group to the host web it will not be automatically copied to the add-in permissions). The permission inheritance can be restored at any time.</p>
        <br />
    </div>
</asp:Content>
