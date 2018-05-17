import nltk
import os
import re
from nltk.corpus import PlaintextCorpusReader
from nltk.collocations import *
from collections import Counter

def w_find(path_c,fname_c):


        work_dir = os.curdir
        os.chdir(work_dir)

        
                

        corp = PlaintextCorpusReader(path_c, fname_c,encoding="utf")
        text = nltk.Text(corp.words())
        
        
##        for i in text:
##                j = str(i)
##                k = re.finditer("Meraki",j)
##                for count, l in enumerate(k):
##                        t_count = count
##                print("Total matches found:",t_count)


        with open("words_list.txt","r") as f:
                words = f.read()
                word = words.split('\n')
                for x in word:
                        print("Fetching match for word :", str(x),"in file : ",fname_c)
                        text.concordance(str(x))
                        print(x)
                        
        print()
        print("----------------------")

# for testing only
#w_find("output","Cisco Meraki Addendum_NuARX Inc_contract.txt")

        
