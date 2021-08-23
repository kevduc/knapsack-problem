class Matrix {
  constructor(width = 0, height = 0) {
    this.matrix = new Array(height).fill().map((_) => new Array(width))
  }

  set(r, c, value) {
    if (this.matrix[r] === undefined) this.matrix[r] = new Array()
    this.matrix[r][c] = value
  }

  get(r, c) {
    return this.matrix[r]?.[c]
  }

  print() {
    console.table(this.matrix)
  }
}

module.exports = Matrix
