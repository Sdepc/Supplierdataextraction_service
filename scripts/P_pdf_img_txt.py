def extract(in_path,out_path,file_nm):
        import fitz
        import sys, time, re
        
        checkXO = r"/Type(?= */XObject)"       # finds "/Type/XObject"   
        checkIM = r"/Subtype(?= */Image)"      # finds "/Subtype/Image"

        doc = fitz.open(in_path + file_nm)
        imgcount = 0
        lenXREF = doc._getXrefLength()         # number of objects - do not use entry 0!
        
        # display some file info
        #print("file: %s, pages: %s, objects: %s" % (doc, len(doc), lenXREF-1))

        #Open empty file for writing 
        fo = open('./' + out_path + file_nm.replace('.pdf','.txt'),'w', encoding = 'utf')
        fo.truncate(0)
        fo.close()

        for i in range(1, lenXREF):            # scan through all objects
            text = doc._getObjectString(i)     # string defining the object
            isXObject = re.search(checkXO, text)    # tests for XObject
            isImage   = re.search(checkIM, text)    # tests for Image
            if not isXObject or not isImage:   # not an image object if not both True
                continue
            imgcount += 1
            img_name = out_path + file_nm.replace('.pdf','.png')
            pix = fitz.Pixmap(doc, i)          # make pixmap from image
            if pix.n < 5:                      # can be saved as PNG
                print('.', end='')
                pix.writePNG(img_name)
                write_txt(img_name)
            else:                              # must convert the CMYK first
                print('.', end='')
                pix0 = fitz.Pixmap(fitz.csRGB, pix)
                pix0.writePNG(img_name)
                write_txt(img_name)
                pix0 = None                    # free Pixmap resources
            pix = None                         # free Pixmap resources
        print()        
        #print("extracted images", imgcount)

def write_txt(file_nm):
    import PyPDF2
    import warnings
    from os import path
    from PIL import Image
    import pytesseract
    text = pytesseract.image_to_string(Image.open(file_nm))
    text = text.replace("\n","  ")
    fo = open(file_nm.replace('.png','.txt'),'a+', encoding = 'utf')
    fo.write(text)
    fo.close()
    



