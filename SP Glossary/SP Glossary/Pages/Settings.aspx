<%@ Page Language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink Name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <style type="text/css">
        .settings-content {
            font-family: 'Segoe UI Light', sans-serif;
            color: #252525;
            font-weight: 100;
            font-size: 18px;
        }

            .settings-content h3 {
                font-family: inherit;
                font-weight: 300;
                line-height: 1.1;
                color: inherit;
            }


            .settings-content .container {
                padding-right: 15px;
                padding-left: 15px;
                margin-right: auto;
                margin-left: auto;
            }

                .settings-content .container img {
                    -webkit-box-shadow: 3px 3px 3px #7C7C7C;
                    box-shadow: 3px 3px 3px #7C7C7C;
                }
    </style>
    <script type="text/javascript" src="../Scripts/jquery-2.1.4.min.js"></script>
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
    SP Glossary Settings
</asp:Content>


<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <WebPartPages:WebPartZone runat="server" FrameType="TitleBarOnly" ID="full" Title="loc:full" />
    <div class="settings-content">
        <h3>Terms List Permissions</h3>
        <p>The add-in permissions are inherited from the host web (SharePoint site where the installation was requested). In order to change the permissions for the Terms List (e.g. granting write permissions to a user) is required the removal of the add-in role inheritance.</p>
        <p>Only a user with "Manage Permissions" access rights on the host web will be able to break the role inheritance of the add-in.</p>
        <p>
            Try breaking the role inheritance by clicking the button:
            <button type="button" onclick="breakRoleInheritance()">Break Role Inheritance</button>
        </p>
        <p>Be aware that breaking the role inheritance will copy the current permission from the host web but it will not be in synch with the host web permissions (e.g. if you add a new user/group to the host web it will not be automatically copied to the add-in permissions). The permission inheritance can be restored at any time.</p>
        <br />
        <h3>Add-in Settings</h3>
        <p>Please read the <a title="Instructions" href="../Pages/Instructions.aspx">Instructions</a> before adding/updating the settings values</p>
        <p>Click <a title="Settings" href="../Lists/Settings/AllItems.aspx">here</a> to navigate to the settings library.</p>
    </div>
</asp:Content>
