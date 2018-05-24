def writehtmltag1(title):
        #insert html content
        tag1 = "<h2>" + title.replace(".txt",".html") + "</h2>"
        tag1 += "<h3>Contract and Discount summary </h3>"
        tag1 += "<table border=1 border: 1px solid  bordercolor=black>"
        tag1 += "<div id="'"scrolltable"'">"
        tag1 += "<ul class="'"list list--compressed"'">"
        tag1 += " <li>"
        tag1 += "<div class="'"panel"'">"
        return(tag1)

def tablerow(data):
        return("<li>""<div class="'"panel"'">""<p class="'"paleWhite"'">" + data + "</p></div></li>")

def tablerowy(data):
        return("<li>""<div class="'"panel"'">""<p class="'"paleYellow"'">"+ data + "</p></td></tr>")

def tablerowb(data):
        return("<li>""<div class="'"panel"'">""<p class="'"paleYellow"'">"+ data + "</p></td></tr>")
       # return("<tr bgcolor="'"#f1e28a"'" ><td>" + xyz + "</td></tr>")

def tablerowg(data):
        return("<li>""<div class="'"panel"'">""<p class="'"paleGreen"'">"+ data + "</p></td></tr>")
       # return("<tr bgcolor="'"#7FFFD4"'" ><td>" + xyz + "</td></tr>")


def writehtmltag3(title):
        #insert html content
        tag3 = "</div></table>"
        return(tag3)
