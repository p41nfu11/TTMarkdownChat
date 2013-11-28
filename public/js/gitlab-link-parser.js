$(document).find("a[href^='http://git.menmo.se']").each(function(index,element)
{
    $(element).hover(function()
    {
        var apiKey = "";
        var jQueryThis = $(this);
        var href = jQueryThis.attr("href").replace("http://git.menmo.se","");
        var parameters = href.split("/");
        var projectId = parameters[1] + "%2f" + parameters[2];
        parameters.splice(0,4);
        var branch = parameters[0];
        parameters.shift();
        var filePath = parameters.join("%2f");        
        var iframeSrc = "http://git.menmo.se/api/v3/projects/" + projectId + "/repository/blobs/" + branch + "?private_token=" + apiKey +"&filepath=" + filePath;
        
        jQueryThis.append("<div id='preview'><iframe src=\"" + iframeSrc  + "\"</div>");
    }, function() 
    {
        $("#preview").remove();
    });
});
