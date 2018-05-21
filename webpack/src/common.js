export default {
  sum(...args){
    let s = 0;
    args.forEach(item => {
      s+=item;
    });

    return s;
  }
}
