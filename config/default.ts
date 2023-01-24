export default {
    port : 1337,
    dbUri: "mongodb://localhost:27017/invoiceManager",
    saltWorkFactor:10,
    origin: 'http://localhost:3000',
    accessTokenTtl: '15m',
    refreshTokenTtl: '1y',
    publicKey: `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgGF5vWUWBlIrxnmfntZWuXJA7Chi
rMysw7tVfOIBMTwjdInNEHU+g0TA2kQkMGyRizMxOo03Dxry0pYh7Ns21FLuTneR
TwaQBIQBTWR+53qSPqhSD5mnQxYA2nT7+VeOCYidsx1OZsIrbhUilL3n6B+hgUhF
6Aqg67YXGWm2ioBxAgMBAAE=
-----END PUBLIC KEY-----`,
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgGF5vWUWBlIrxnmfntZWuXJA7ChirMysw7tVfOIBMTwjdInNEHU+
g0TA2kQkMGyRizMxOo03Dxry0pYh7Ns21FLuTneRTwaQBIQBTWR+53qSPqhSD5mn
QxYA2nT7+VeOCYidsx1OZsIrbhUilL3n6B+hgUhF6Aqg67YXGWm2ioBxAgMBAAEC
gYAP9w6MNfVHFCBn3zr2xDGPgw6q9q5yv4E3d6MCqUtVHEGEKHAfo+OAKU4Whw7f
WV9BPTjn1DLHKSpQqLHQncRctPhBY/ujhADzv5UGvpKOuq2Lb0Z3Vc/9mechLg+Z
GCr/ZOasqfRRQRshm28rvAQwEWR8cXuua+a9OimOk0Xb2QJBAKwDsqZuwEByI5GV
0HrTi04Ni+2Ov3I6TWLVoz2rJs0dOLLHqWFdWvA6XHNkx4A8o2V82kI2p7dtfOOS
GxuJPxMCQQCREVTFjQ1RtQMTr/x8cFgUP3cxFhZxuTAskssJgg8t3Xz+2zKoqSpt
zSba9NXw/zHhwf01Du0bEn4Ol0TCfT7rAkALrLSTVzD1Lsn7N4/OxkzOH10/4lBc
EFjwPE+3/8XCZhlTCPoWAaAKbeuYaV6g9XyhhrfJhqwbZvLy/xeX5tjBAkBT8YZv
Rh618BuWsdhVnaCqHst24QQdzH5e3JaWqubjsG3a/7ZBuJnvra3VN6Xw7YrMyzcd
E8UKTFobUVcdf+H/AkEAplG1OQurwQmYlWARjn/gD+w5pQfSiaguly7LQLF8cPPK
ZZRlEje0eeTpN5LpruOsN6+ZTFlcWdsdZiuRnb2hVw==
-----END RSA PRIVATE KEY-----`,
}