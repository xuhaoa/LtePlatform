avg = mean(x <- c(1, 2, 3))
print(x)
print(avg)
x <- matrix(c(1, 2, 3, 4), ncol = 2)
print(solve(x))
print(x %*% solve(x))

for (i in 1:20) {
    print(i)
}