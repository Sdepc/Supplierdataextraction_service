# import custom modules
import P_PDF2Text
import P_Text2html
import P_pdfimg2txt
import P_Append_file
import P_globalvars
import P_pdf_img_txt
import P_func

path = P_globalvars.path_

#import python modules
import os
import shutil
import pytesseract
if not os.path.exists('inputs'):
    print("not found and creating the input folder")
    os.makedirs('inputs')
if not os.path.exists('temp_txt'):
    print("not found and creating the temp folder")
    os.makedirs('temp_txt')
if not os.path.exists('temp_img'):
    print("not found and creating the processed folder")
    os.makedirs('temp_img')
if not os.path.exists('processed'):
    print("not found and creating the output folder")
    os.makedirs('processed')
if not os.path.exists('output'):
    print("not found and creating the output folder")
    os.makedirs('output')


# Working directory, directory where program is located
os.chdir(os.getcwd())
work_dir = os.curdir
pytesseract.pytesseract.tesseract_cmd = P_globalvars.path_

#Path for reading files
input_ = work_dir + P_globalvars.input_
temp_txt = work_dir + P_globalvars.temp_txt
temp_img = work_dir + P_globalvars.temp_img
output_  = work_dir + P_globalvars.output_
process_ = work_dir + P_globalvars.process_
#change directory
os.chdir(work_dir)

list_of_files = [name for name in os.listdir(input_) if name.endswith(".pdf")]
for fname in list_of_files:
    #Text and HTML file names
    txt_out = fname.replace(".pdf", ".txt")
    html_out = fname.replace(".pdf",".html")
    #PDF file to Text
    print(P_func.dt(),"\t" , fname,"\t text")
    P_PDF2Text.readpdfs(fname,txt_out, input_, temp_txt)
    print(P_func.dt(),"\t" , fname,"\t images")
    print(P_func.dt(),"In progress...please wait..")
    P_pdf_img_txt.extract(input_,temp_img,fname)
    print(P_func.dt(),"\t" , txt_out)
    P_Append_file.copyfile(txt_out,temp_img,temp_txt)
    #PDF file to HTML
    print(P_func.dt(),"\t" , html_out)
    P_Text2html.process(txt_out,html_out,temp_txt,output_,work_dir)
    print(P_func.dt(),"done")

#source = 'C:\\Users\\sk00507400\\Desktop\\Extract discount\\input\\'
#dest1 = 'C:\\Users\\sk00507400\\Desktop\\Extract discount\\processed\\'
source = work_dir + P_globalvars.inputs_
dest1 = work_dir + P_globalvars.process_
files = os.listdir(source)
for f in files:
    shutil.move(source+f, dest1)
print()




##    #P_pdfimg2txt.getimage2text(fname,In_dir_2,Out_dir_2,work_dir)


