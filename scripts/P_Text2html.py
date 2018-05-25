import P_htmltag
import P_globalvars

def fappend(f_name,fstr_html,fstr_text):
    # Set out_type in P_globalvars for text output default is html
    out_type = P_globalvars.out_type_
    if (out_type == "text"):
        f_name = f_name.replace(".html",".txt")

    # open file for adding data
    fo = open(f_name,"a+",encoding="ascii",errors="ignore")

    if (out_type == "text"):
        fstr = fstr_text
    else:
        fstr = fstr_html

    fo.write(fstr)
    fo.close()

def fflush(f_name):
    out_type = P_globalvars.out_type_
    if (out_type == "text"):
        f_name = f_name.replace(".html",".txt")
    fo= open(f_name,"w")
    fo.truncate(0)
    fo.close()

def rep_tags(P):
    P = str(P).strip("\n")
    P = P.replace("', '"," ")
    P = P.replace('""',"")
    P = P.replace("\\\'","")
    P = P.replace("\\","")
    P = P.replace(", '","")
    P = P.replace("b'","")
    P = P.replace('""',"")
    P = P.replace("['"," ")
    P = P.replace("[[,'","[")
    P = P.replace("']","\n")
    P = P.replace("[","")
    P = P.replace("]","\n")
    return(P)

def Read_corpus(path_c,fname_c,fo1):
    import nltk
    import re
    import spacy
    import en_core_web_sm
    import fileinput
    nlp = spacy.load('en_core_web_sm')
    from nltk.corpus.reader.plaintext import PlaintextCorpusReader

    pcorpus = PlaintextCorpusReader(path_c, fname_c,encoding="utf")

    #HTML Tags to file
    fappend(fo1,P_htmltag.writehtmltag1(fname_c),fname_c)
    

    # Iterate through each paragraph
    for para in pcorpus.paras():
            L0 = rep_tags(para)
            L1 = L0.split("\n")
            for i, w in enumerate(L1):
                    if(w != ""):
                           ApplyNLP(nlp(str(w[1:])),fo1)

    fappend(fo1,P_htmltag.writehtmltag3(fname_c),fname_c)

def ApplyNLP(doc_file,fo2):
    #Applying NLP on each of the files
    import re
    import fileinput
    import P_globalvars
   
    #string version
    doc_file_txt = str(doc_file)
    
    #List of terms defined in P_param.py
    tag  = re.compile(P_globalvars.tag_,re.IGNORECASE)
    dis = re.compile(P_globalvars.dis_,re.IGNORECASE)
    dis1 = re.compile(P_globalvars.dis1_,re.IGNORECASE)
    org  = re.compile(P_globalvars.org_)
    org1  = re.compile(P_globalvars.org1_)
    pct  = re.compile(P_globalvars.pct_)
    mon = re.compile(P_globalvars.mon_)
    ex_labels = re.compile(P_globalvars.ex_labels_)
    stop_words  = re.compile(P_globalvars.stop_words_,re.IGNORECASE)
    stop_words1  = re.compile(P_globalvars.stop_words1_,re.IGNORECASE)


    # List of sentences of our doc 
    list(doc_file.sents)

    # get all tags
    all_tags = {w.pos: w.pos_ for w in doc_file}

    #define some parameters  
    noisy_pos_tags = ['PROP']
    min_token_length = 2

    #Function to check if the token is a noise or not  
    def isNoise(token):     
        is_noise = False
        if token.pos_ in noisy_pos_tags:
            is_noise = True 
        elif token.is_stop == True:
            is_noise = True
        elif len(token.string) <= min_token_length:
            is_noise = True
        return is_noise 
    def cleanup(token, lower = True):
        if lower:
           token = token.lower()
        return token.strip()

    # top unigrams used in the reviews 
    from collections import Counter
    cleaned_list = [cleanup(word.string) for word in doc_file if not isNoise(word)]
    Counter(cleaned_list) .most_common(6)

    labels = set([w.label_ for w in doc_file.ents])
    label_s = str(labels)

    # Display records only once
    rec_displayed = 0

    if (rec_displayed == 0):
        if (org.findall(str(labels))):
                if (tag.search(doc_file_txt)):
                    if not (stop_words.findall(doc_file_txt)
                            or stop_words1.findall(doc_file_txt)):
                        rec_displayed = 1
                        fappend(fo2,P_htmltag.tablerowb(doc_file_txt),doc_file_txt)

    if (rec_displayed == 0):
        if (org1.findall(str(labels))):
                if (tag.search(doc_file_txt)):
                    if not (ex_labels.findall(str(labels))
                                              or stop_words.findall(doc_file_txt)
                                              or stop_words1.findall(doc_file_txt)):
                            rec_displayed = 1
                            fappend(fo2,P_htmltag.tablerow(doc_file_txt),doc_file_txt)

    
    if (rec_displayed == 0):
        if (mon.findall(str(labels)) or pct.findall(str(labels))):
                if (dis.search(doc_file_txt)):
                    if not (stop_words.findall(doc_file_txt)
                            or stop_words1.findall(doc_file_txt)):
                        rec_displayed = 1
                        fappend(fo2,P_htmltag.tablerowg(doc_file_txt),doc_file_txt)

    if (rec_displayed == 0):
        if (pct.findall(str(labels))):
                    if (dis1.search(doc_file_txt)):
                        if not (ex_labels.findall(str(labels))
                                                  or stop_words.findall(doc_file_txt)
                                                  or stop_words1.findall(doc_file_txt)):
                            rec_displayed = 1
                            fappend(fo2,P_htmltag.tablerow(doc_file_txt),doc_file_txt)


def process(fname,outfile,contracts_dir,out_dir,work_dir):
    
    # Main program starts here
    # ------------------------

    import nltk
    import re
    import os
    import sys
    import fileinput
    import codecs
    import six
    import spacy
    import en_core_web_sm
    import P_htmltag

    #Load NLP english library
    nlp = spacy.load('en_core_web_sm')

    outfile = out_dir + outfile
    # flush the text file
    fflush(outfile)

    # Read corpus
    Read_corpus(contracts_dir,fname,outfile)

    # Main program ends here
    # ------------------------
