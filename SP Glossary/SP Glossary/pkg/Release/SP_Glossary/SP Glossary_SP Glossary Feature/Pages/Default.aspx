<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink Name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <meta name="WebPartPageExpansion" content="full" />
    <script type="text/javascript" src="../Scripts/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="/_layouts/15/SP.RequestExecutor.js"></script>
    <!-- Add your CSS styles to the following file -->
    <link href="../Content/font-awesome.css" rel="stylesheet" />
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
    <!-- Add your JavaScript to the following file -->
    <script type="text/javascript" src="../Scripts/angular.js"></script>
    <script type="text/javascript" src="../Scripts/app/bundle.min.js"></script>
</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    <span id="glossaryTitle">Glossary</span>
</asp:Content>


<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <div class="glossary-main-container" ng-app="app" ng-controller="GlossaryController as vm">
        <div class="glossary-horizontal-list" user-can-edit="vm.userCanEdit">
            <div style="width: 100%; height: 50px;" ng-if="vm.userCanEdit && !(vm.rawData.length > 0)">
                <h2>The terms list is empty, to add new terms use the <a style="color: red" href="../Lists/Terms/AllItems.aspx" title="Terms List">Terms List</a> (please read the <a href="../Pages/Instructions.aspx" title="Instructions">Instructions</a>)</h2>
            </div>
            <div class="glossary-link" ng-repeat="group in vm.groupedData" ng-class="{'active': (group.value.length > 0)}" scroll-to="term_{{group.name}}">{{group.name}}</div>
            <div class="glossary-search-container">
                <div class="ms-srch-sb ms-srch-sb-border">
                    <input type="text" placeholder="Search Term" maxlength="2048" accesskey="S" title="Search Term" class="ms-textSmall ms-srch-sb-prompt ms-helperText" ng-model="vm.searchValue">
                    <a title="Search" class="ms-srch-sb-searchLink" href="javascript: {}" ng-click="vm.Search()">
                        <img src="/_layouts/15/images/searchresultui.png?rev=23" class="ms-srch-sb-searchImg" alt="Search" />
                    </a>
                </div>
                <div style="text-align: right; display: inline-block; font-size: 18px; vertical-align: top; margin-left: 10px;" ng-if="vm.userCanEdit">
                    <a href="../Pages/Instructions.aspx" title="Instructions" style="margin-right: 5px"><i class="fa fa-question"></i></a>
                    <a href="#" ng-click="vm.goToSettings()" title="Settings" style="margin-right: 5px"><i class="fa fa-cog"></i></a>
                    <a href="../Lists/Terms/AllItems.aspx" title="Terms List"><i class="fa fa-list"></i></a>
                </div>
            </div>
        </div>
        <div class="glossary-list">
            <div id="term_{{group.name}}" class="glossary-group" ng-repeat="group in vm.groupedData | searchTerm: vm.searchValue" ng-show="group.filtered.length > 0">
                <div class="glossary-group-label" ng-bind="group.name"></div>
                <div class="term-container">
                    <div class="term-item" ng-repeat="term in group.filtered  | orderBy:'Title'">
                        <div class="term-name" ng-bind-html="vm.highlight(term.Title, vm.searchValue)"></div>
                        <div class="term-description" ng-bind-html="vm.highlight(term.TermDescription, vm.searchValue)"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</asp:Content>
