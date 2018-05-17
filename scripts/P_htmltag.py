def writehtmltag1(title):
        #insert html content
        tag1 = "<!DOCTYPE html>"
        tag1 += "<html>"
        tag1 += "<head>"
        tag1 += "<h2>" + title.replace(".txt",".html") + "</h2>"
        tag1 += "</head>"
        tag1 += "<body style="'"font-size:21px"'"'>"
        tag1 += "<h3>Contract and Discount summary </h3>"
        tag1 += "<table border=1 border: 1px solid  bordercolor=black>"
        tag1 += "<div id="'"scrolltable"'">"
        return(tag1)

def tablerow(xyz):
        return("<tr bgcolor="'"white"'" ><td>" + xyz + "</td></tr>")

def tablerowy(xyz):
        return("<tr bgcolor="'"yellow"'" ><td>" + xyz + "</td></tr>")

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
