import random
# random row and col
mat = []
zeroList = []
maxZero = 0
maxMat = []

def isSave(i,col):
    # box
    colBox = col - col%3
    for c in range(colBox,colBox+3):
        if mat[0][c] == i:
            return False
    return True


def createMatrix():
    for i in range(9):
        mat.append([0 for x in range(9)])
    # print(mat)

def swapLastCol(num,i,times):
    j = 0
    while True:
        if isSave(num[i],j) and isSave(mat[times][j],8):
            num[i] = mat[times][j]
            mat[times][j] = num[i]
            return 
        j += 1

def randomNumber(level): # level [1,2,3,4,5]
    times = 0
    n = 1
    while times <= n:
        queue = [] 
        num =[]
        # add 1-9 to queqe
        for i in range(1,10):
            queue.append(i)
        # random number from queue 0 - 8 at first
        while len(queue):
            pos = random.randint(0,len(queue)-1)
            num.append(queue[pos])
            del queue[pos]
        # insert num to first row of matrix
        i = 0
        for col in range(9):
            if(times > 0):
                while not isSave(num[i],col):
                    if col in [6,7,8]:
                        swapLastCol(num,i,times)
                    else: 
                        num.append(num[i])
                        i += 1
            mat[times][col] = num[i]
            # print(num,num[i])
            i += 1  
        del num
        # print(mat[0])
        times += 1

def findZero():
    global maxZero
    global maxMat
    for row in range(9):
        colList = []
        for col in range(9):
            if mat[row][col] == 0:
                colList.append(col)
        zeroList.append(colList)
    a = 0
    for i in zeroList:
        a += len(i)
    if a > maxZero:
        maxZero = a
        maxMat = mat

def printArray():
    for i in mat:
        for j in i:
            print(j,end=' ')
        print()
t = 100
print(t)
maxZero = 0
while(t):
    mat = []
    zeroList = []
    createMatrix()
    randomNumber(5)
    # findZero()
    printArray()
    # print(*mat,sep='\n')
    t -= 1


# print(maxZero)
# print(*mat,sep = '\n')
