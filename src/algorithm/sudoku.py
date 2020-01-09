zeroList = []
mat = []

def isSave(i,row,col):
    # in row
    for x in range(9):
        if mat[row][x] == i: # in row
            return False
        if mat[x][col] == i: # in col
            return False

    # box
    rowBox = row - row%3
    colBox = col - col%3
    for r in range(rowBox,rowBox+3):
        for c in range(colBox,colBox+3):
            if mat[r][c] == i:
                return False
    return True

def solve(row,indexColumn):
    if(row >= len(zeroList)):
        return True
    if(indexColumn >= len(zeroList[row])):
        return solve(row+1,0)
    
    col = zeroList[row][indexColumn]
    for i in range(1,10):
        # print(i,row,col)
        if isSave(i,row,col):
            mat[row][col] = i
            # print('pass: ',i,row,col)
            # next
            if(solve(row,indexColumn+1)):
                return True

    mat[row][col] = 0
    return False

def findZero():
    for row in range(9):
        colList = []
        for col in range(9):
            if mat[row][col] == 0:
                colList.append(col)
        zeroList.append(colList)
    # print(zeroList)


def inputMat():
    for i in range(9):
        mat.append([int(x) for x in input().split()])

def printAns():
    for i in mat:
        print(*i,end= ' ')
    print()

mat = []
zeroList = []
inputMat()
findZero()
solve(0,0)
print(*mat,sep = '\n')
