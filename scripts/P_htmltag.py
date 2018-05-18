def writehtmltag1(title):
        #insert html content
        tag1 += "<h2>" + title.replace(".txt",".html") + "</h2>"
        tag1 += "<h3>Contract and Discount summary </h3>"
        tag1 += "<table border=1 border: 1px solid  bordercolor=black>"
        tag1 += "<div id="'"scrolltable"'">"
        tag1 += "<ul class="list list--compressed">"
        #tag1 += " <li>"
        #tag1 +="  <div class="panel ">"
        return(tag1)

def tablerow(xyz):
        return("<li>""<div class="panel ">""<p class="paleWhite">" + xyz + "</p></div></li>")

def tablerowy(xyz):
        return("<li>""<div class="panel ">""<p class="paleYellow">"+ xyz + "</p></td></tr>")

def tablerowb(xyz):
        return("<tr bgcolor="'"#f1e28a"'" ><td>" + xyz + "</td></tr>")

def tablerowg(xyz):
        return("<tr bgcolor="'"#7FFFD4"'" ><td>" + xyz + "</td></tr>")


def writehtmltag3(title):
        #insert html content
        tag3 = "</div></table>"
        tag3 += "</body>"
        tag3 += "</html>"
        return(tag3)
