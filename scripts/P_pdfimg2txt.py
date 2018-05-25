def recurse(page, xObject,filename):
    import PyPDF2
    import sys
    import os
    import warnings
    from os import path
    from PIL import Image
    import pytesseract
    #import P_params

##    pytesseract.tesseract_cmd = 'C://Program Files (x86)//Tesseract-OCR//tesseract'
    pytesseract.tesseract_cmd = P_params.tesseract_path()
    warnings.filterwarnings("ignore")
    
    #global number
    print(".", end = '')
    F1 = open(filename.replace(".pdf",".txt"),"a+")
    try:
        xObject['/Resources']['/XObject'].getObject()
    except Exception:
        pass
    else:
        xObject = xObject['/Resources']['/XObject'].getObject()
        for obj in xObject:
            if xObject[obj]['/Subtype'] == '/Image':
                size = (xObject[obj]['/Width'], xObject[obj]['/Height'])
                if xObject[obj]['/ColorSpace'] == '/DeviceRGB':
                    mode = "RGB"
                else:
                    mode = "P"
                imagename = filename.replace(".pdf","-") + obj[1:]    
                try:
                    xObject[obj]['/Filter'] == '/FlateDecode',
                    xObject[obj]['/Filter'] == '/DCTDecode',
                    xObject[obj]['/Filter'] == '/JPXDecode'
                except Exception as e2:
                    pass
                else:
                    if xObject[obj]['/Filter'] == '/FlateDecode':
                        xdata = xObject[obj].getData()
                        try:
                            img = Image.frombytes(mode, size, xdata)
                        except (RuntimeError, TypeError, NameError, ValueError):
                            pass
                        else:
                            img = Image.frombytes(mode, size, xdata)
                            img.save(imagename + ".png")
                            F1.write(write_txt(imagename,".png"))
                            img.close()
                            #number += 1
                    elif xObject[obj]['/Filter'] == '/DCTDecode':
                        data = xObject[obj]._data
                        img = open(imagename + ".jpg", "wb")
                        img.write(data)
                        F1.write(write_txt(imagename,".jpg"))
                        img.close()
                        #number += 1
                    elif xObject[obj]['/Filter'] == '/JPXDecode':
                        data = xObject[obj]._data
                        img = open(imagename + ".jp2", "wb")
                        img.write(data)
                        F1.write(write_txt(imagename,".jp2"))
                        img.close()
                        #number += 1
        else:
            recurse(page, xObject[obj],filename)
    F1.close()
    try:
        _, filename, *pages = "12"
        *pages, = map(int, pages)
        abspath = os.path.abspath(filename)
    except BaseException:
        print('Usage :\nPDF_extract_images file.pdf page1 page2 page3 …')
        #number += 1
        sys.exit()
    except Exception(e):
        print(e)


def write_txt(file_nm, file_ext):
    import PyPDF2
    import warnings
    from os import path
    from PIL import Image
    import pytesseract
    text = pytesseract.image_to_string(Image.open(file_nm + file_ext))
    text = text.replace("\n"," ")
    return(str(text.encode("ascii",'ignore')))


def getimage2text(fname,contracts_dir,contract_images,work_dir):
    import PyPDF2
    import os
    work_dir = os.curdir
    os.chdir(work_dir)
    file = PyPDF2.PdfFileReader(contracts_dir + "/" +fname)
    pages = file.getNumPages()
    #print('Number of Pages: ',pages," in ",fname)
    os.chdir(work_dir + contract_images)
    for p in range(0,pages):    
        page0 = file.getPage(p-1)
        recurse(p, page0,fname)
    os.chdir("../")
    print()





