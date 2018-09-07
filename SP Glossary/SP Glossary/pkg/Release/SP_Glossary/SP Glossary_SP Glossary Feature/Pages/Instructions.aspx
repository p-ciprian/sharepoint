<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink Name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <meta name="WebPartPageExpansion" content="full" />

    <style type="text/css">
        html,
        body {
            font-family: 'Segoe UI Light', sans-serif;
            color: #252525;
            font-weight: 100;
            font-size: 18px;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        .h1,
        .h2,
        .h3,
        .h4,
        .h5,
        .h6 {
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
</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    SP Glossary Instructions
</asp:Content>


<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <div class="container">
        <h1>SP Glossary Instructions</h1>
        <p>SP Glossary add-in is a very simple sharepoint solution that can be used to display a glossary of terms. The terms are stored in sharepoint list within the add-in in a key-value format.</p>
        <br />
        <h2>Adding Terms</h2>
        <p>
            The "Edit Terms" hyperlink on the main page will open the "Terms" list, this hyperlink is only visible to the users that have contribute permissions to the "Terms" list.
      <br />
            The "Terms" list permissions are inherited from the host web application.
        </p>
        <p>
            <img style="max-height: 300px;" alt="" src="../Images/image_7.jpg" />
        </p>
        <p>
            By clicking the "Edit" link on the default view of the "Terms" list is possible to select the first empty row and to paste a two columns table (e.g. from an MS Excel).
        </p>
        <p>
            <img style="max-height: 300px;" alt="" src="../Images/image_2.jpg" />
        </p>
        <p>
            <img style="max-height: 300px;" alt="" src="../Images/image_3.jpg" />
        </p>
        <br />
        <h2>Configuration</h2>
        <p>
            The SP Glossary add-in allows few basic customizations for the add-in title and term group colours.
      <br />
            The settings are stored as key-value pairs in the "Settings" list. The "Settings" list can be accessed from the main page of SP Glossary add-in. The "Settings" link is only visible to the users that have contribute permissions for the list.
        </p>
              <p>
            <img style="max-height: 300px;" alt="" src="../Images/image_6.jpg" />
        </p>
        <p>
            <img style="max-height: 300px;" alt="" src="../Images/image_4.jpg" />
        </p>
        <p>
            <h4>Changing Title</h4>
            <p>To change the title on the main page of the SP Glossary add-in a "title" key must exist in the settings list (e.g. Key:"title", Value:"My Custom Glossary")</p>
        </p>
        <br />
        <h4>Changing Term Group Color</h4>
        <p>For the custom color a "color" key must exist in the "Settings" list. The value can be a color string (e.g. "black") or a hex value (e.g. #000000)(e.g. Key:"color", Value:"black")</p>
        <p>A hover over term group color can also be specified, for this a "colorhover" key must exists, but it will be ignored if "color" key is not present in the "Settings" list.</p>
    </div>
</asp:Content>
