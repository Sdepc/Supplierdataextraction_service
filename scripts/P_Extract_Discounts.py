# import custom modules
import P_PDF2Text
import P_Text2html
import P_pdfimg2txt
import P_Append_file
import P_globalvars
import P_pdf_img_txt
import P_func
import traceback
import logging

path = P_globalvars.path_

# import python modules
import os
import shutil
import pytesseract
if not os.path.exists('inputs'):
    print("not found and creating the inputs folder")
    os.makedirs('inputs')
if not os.path.exists('temp_txt'):
    print("not found and creating the temp_txt folder")
    os.makedirs('temp_txt')
if not os.path.exists('temp_img'):
    print("not found and creating the temp_img folder")
    os.makedirs('temp_img')
if not os.path.exists('processed'):
    print("not found and creating the processed folder")
    os.makedirs('processed')
if not os.path.exists('output'):
    print("not found and creating the output folder")
    os.makedirs('output')
if not os.path.exists('input_processing'):
    print("not found and creating the input_processing folder")
    os.makedirs('input_processing')


# Working directory, directory where program is located
os.chdir(os.getcwd())
work_dir = os.curdir
pytesseract.pytesseract.tesseract_cmd = P_globalvars.path_
filename = open(".\myapp.log", "w")
logging.basicConfig(filename='.\myapp.log', level=logging.DEBUG,
                    format='%(asctime)s %(levelname)s %(name)s %(message)s')
logger = logging.getLogger(__name__)
try:
    input_ = work_dir + P_globalvars.input_
    temp_txt = work_dir + P_globalvars.temp_txt
    temp_img = work_dir + P_globalvars.temp_img
    output_ = work_dir + P_globalvars.output_
    process_ = work_dir + P_globalvars.process_
    os.chdir(work_dir)
    list_of_files = [name for name in os.listdir(input_) if name.endswith(".pdf")]
    source = work_dir + P_globalvars.input_
    dest1 = work_dir + P_globalvars.process_
    files = os.listdir(source)
    for fname in list_of_files:
        txt_out = fname.replace(".pdf", ".txt")
        html_out = fname.replace(".pdf", ".html")
        print(P_func.dt(), "\t", fname, "\t text")
        P_PDF2Text.readpdfs(fname, txt_out, input_, temp_txt)
        print(P_func.dt(), "\t", fname, "\t images")
        print(P_func.dt(), "In progress...please wait..")
        P_pdf_img_txt.extract(input_, temp_img, fname)
        print(P_func.dt(), "\t", txt_out)
        P_Append_file.copyfile(txt_out, temp_img, temp_txt)
        print(P_func.dt(), "\t", html_out)
        P_Text2html.process(txt_out, html_out, temp_txt, output_, work_dir)
        print(P_func.dt(), "done")
        shutil.move(source+fname, dest1)
except Exception as e:
    logger.error(e)
    pass
#source = 'C:\\Users\\sk00507400\\Desktop\\Extract discount\\input\\'
#dest1 = 'C:\\Users\\sk00507400\\Desktop\\Extract discount\\processed\\'
#source = work_dir + P_globalvars.input_
#dest1 = work_dir + P_globalvars.process_
#files = os.listdir(source)
# for f in files:
  #  shutil.move(source+f, dest1)
# print()


# P_pdfimg2txt.getimage2text(fname,In_dir_2,Out_dir_2,work_dir)
