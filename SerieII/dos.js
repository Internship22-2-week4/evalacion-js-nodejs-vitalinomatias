coins = [1, 2, 5, 10, 20, 50]


function getCoins(cantidad) {
  arraydevolucion =[0,0,0,0,0,0]
  let i = coins.length
  while (cantidad>0) {
    if (cantidad >= coins[i-1]) {
      cantidad = cantidad - coins[i-1]
      arraydevolucion[i-1]+=1
    }else {
      i= i-1
    }
    
  }
  return arraydevolucion;
}

console.log(getCoins(51)) // [1, 0, 0, 0, 0, 1] -> una moneda de 1 céntimo y otra de 50 céntimos
console.log(getCoins(3)) // [1, 1, 0, 0, 0, 0] -> una moneda de 1 céntimo y otra de 2
console.log(getCoins(5)) // [0, 0, 1, 0, 0, 0] -> una moneda de 5 céntimos
console.log(getCoins(16)) // [1, 0, 1, 1, 0, 0] -> una moneda de 1 céntimo, una de 5 y una de 10
console.log(getCoins(100)) // [0, 0, 0, 0, 0, 2] -> dos monedas de 50 céntimos