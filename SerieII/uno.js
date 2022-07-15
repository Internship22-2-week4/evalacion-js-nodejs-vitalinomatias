files = ['photo', 'postcard', 'photo', 'photo', 'video']
files2 = ['file', 'file', 'file', 'game', 'game']
files3 = ['file', 'file(1)', 'icon', 'icon(1)', 'icon(1)']



function fixFiles(files) {
  aux = []
  filesNew = []
  aux.push(files[0])
  filesNew.push(files[0])

  for (let i = 1; i < files.length; i++) {
    let resultado = filesNew.filter(file => file == files[i])
    if (resultado.length>=1){
      cantidad = resultado.length;
      aux.push(files[i])
      filesNew.push(`${files[i]}(${cantidad})`)
    } else {
      aux.push(files[i])
      filesNew.push(files[i])
    }
  }
  return filesNew
}

console.log(fixFiles(files));
console.log(fixFiles(files2));
console.log(fixFiles(files3));