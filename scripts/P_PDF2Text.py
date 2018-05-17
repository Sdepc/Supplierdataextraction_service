import os
import PyPDF2

def readpdfs(fname,outfile,in_dir,out_dir,):
    fo = open(out_dir + outfile, "a+", encoding="utf")
    fo.truncate(0)
    #print(out_dir + outfile)
    pdfReader = PyPDF2.PdfFileReader(in_dir + fname)
    number_of_pages = pdfReader.getNumPages()
    for page_number in range(number_of_pages):
            page = pdfReader.getPage(page_number)
            a = page.extractText()
            a = a.replace("\n"," ")
            a = a.encode('ascii',errors='ignore')
            fo.write(str(a))
    fo.close
