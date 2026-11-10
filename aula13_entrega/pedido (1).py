def total_centavos(precos, vip=False):
    s = 0
    for p in precos:
        s = s + p
    if vip:
        if s >= 10000:
            return s - s // 10
        else:
            return s
    else:
        return s
