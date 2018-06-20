#define global parameters


# process this JSON data and do something with it


input_ = '/inputs/'
temp_txt = '/temp_txt/'
temp_img = '/temp_img/'
output_  = '/output/'
process_ = '/processed'
path_ = 'C://Program Files (x86)//Tesseract-OCR//tesseract'



tag_ = r'(Party name|party address|Phone Number|company name|Contract No)'
dis_ = r'\b(Discount|reduc)'
dis1_ = r'\b(less|off|concession|rebate|deduction|Initial|subsequent)'
org_ = r'(ORG)'
org1_ = r'(PERSON|DATE|LOC)'
pct_ = r'PERCENT'
mon_ = r'MONEY'
ex_labels_ = r'(LAW|EVENT|WORK_OF_ART)'
stop_words_ = r'(vlan|device)'
stop_words1_ = r'\b(port)'

out_type_ = "html"



