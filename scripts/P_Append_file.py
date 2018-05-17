def copyfile(txtfile,path2,path1):
    #print('Path1: ',path1 + txtfile,'\n Path2: ',path2 + txtfile)
    try:

        file1 = set(line.strip() for line in open(path1 + txtfile,'r',encoding='utf'))
        file2 = set(line.strip() for line in open(path2 + txtfile,'r',encoding='utf'))
        #print(path1 + txtfile)
        fout = open(path1 + txtfile,'w',encoding = 'utf-8',errors='ignore')
        for line in (file1 | file2):
            if line:
                fout.write(line)

        fout.close
    except OSError:
        pass

