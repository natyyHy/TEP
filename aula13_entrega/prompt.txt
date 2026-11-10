LIMITE_DESCONTO_VIP_CENTAVOS = 10000


def total_centavos(precos, vip=False):
    subtotal = sum(precos)
    if vip and subtotal >= LIMITE_DESCONTO_VIP_CENTAVOS:
        return subtotal - subtotal // 10
    return subtotal
