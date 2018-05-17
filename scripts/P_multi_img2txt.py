def Img2txt(path_in,path_out,tempf,image_name):
        from PIL import Image, ImageSequence
        import os
        import pytesseract
        import re
        pytesseract.tesseract_cmd = 'C://Program Files (x86)//Tesseract-OCR//tesseract'
        sep = "/"

        #get file extn
        ext = str(''.join(map(str,image_name)).split('.')[1:])[1:-1]
        ext = ext.strip("'")
        ext = ext.strip("'")


        from pytesseract import image_to_string

        doc = []
        tag = re.compile('[_][0-9]+[.]')
        im = Image.open(path_in + sep + image_name)
        if (ext == 'png'):
                im = im.convert('RGB')

        for img in ImageSequence.Iterator(im):
            i_name = tempf + sep + "img." + ext
            img.save(i_name,'jpeg')
            a = pytesseract.image_to_string(Image.open(i_name))
            doc.append(a.replace('\n','  '))

        txt_file_with_path = path_out+ sep + image_name.replace(ext,'txt')
        #print('B:',txt_file_with_path)
        if (tag.search(txt_file_with_path)):
                rm_txt = tag.search(txt_file_with_path)
                txt_file_with_path = txt_file_with_path.replace(rm_txt.group(0),'.')
        #print('A:',txt_file_with_path)

        F1 = open(txt_file_with_path,"a+",encoding = 'utf',errors = 'ignore')
        F1.write(str(doc))
        F1.close()

## For testing the function call
#Img2txt("images","output","84954_Letter sent by ECOWAS.jpg")
