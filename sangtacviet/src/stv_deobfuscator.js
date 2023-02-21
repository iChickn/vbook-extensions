const STV = {
  getEncryptedAes: function (decodedEncKey, data) {
    let _key = "gsj9";
    let _iv = "1234567890123456";
    let _prependEnc = "";
    let evalParams = decodedEncKey.split("decodeURIComponent(escape(r))}(");
    evalParams = evalParams[1].replace(/['")]+/g, '');
    evalParams = evalParams.split(",");
    let obfuscatorStr = STV.eval(evalParams[0], evalParams[1], evalParams[2], evalParams[3], evalParams[4], evalParams[5]);
    obfuscatorStr = obfuscatorStr.split(";var _")[0]
    obfuscatorStr = obfuscatorStr.split("var k='")[1].replace(/['"]+/g, '');
    obfuscatorStr = obfuscatorStr.split(";var s=")
    _key = obfuscatorStr[0] + _key;
    _prependEnc = obfuscatorStr[1];
    return {
      "encrypted": _prependEnc + data,
      "key": _key,
      "iv": _iv,
    };
  },
  xe25c: function (d, e, f) {
    let g = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/".split("");
    let h = g.slice(0, e);
    let i = g.slice(0, f);
    let j = d.split("").reverse().reduce(function (a, b, c) {
      if (h.indexOf(b) !== -1) return a += h.indexOf(b) * Math.pow(e, c);
    }, 0);
    let k = "";
    while (j > 0) {
      k = i[j % f] + k;
      j = (j - j % f) / f;
    }
    return k || "0";
  },
  eval: function (h, u, n, t, e, r) {
    r = "";
    for (let i = 0, len = h.length; i < len; i++) {
      let s = "";
      while (h[i] !== n[e]) {
        s += h[i];
        i++;
      }
      for (let j = 0; j < n.length; j++) s = s.replace(new RegExp(n[j], "g"), j);
      r += String.fromCharCode(STV.xe25c(s, e, 10) - t);
    }
    return r;
  },
}