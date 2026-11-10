import unittest
from pedido import total_centavos


class TestPedido(unittest.TestCase):
    def test_vazio(self):
        self.assertEqual(total_centavos([]), 0)

    def test_soma(self):
        self.assertEqual(total_centavos([2000, 3000]), 5000)

    def test_vip_abaixo(self):
        self.assertEqual(total_centavos([9999], True), 9999)

    def test_vip_no_limite(self):
        self.assertEqual(total_centavos([6000, 4000], True), 9000)

    def test_vip_acima(self):
        self.assertEqual(total_centavos([15000], True), 13500)

    def test_sem_vip(self):
        self.assertEqual(total_centavos([15000]), 15000)

    def test_arredondamento(self):
        self.assertEqual(total_centavos([10009], True), 9009)

    def test_preserva_entrada(self):
        precos = [6000, 4000]
        total_centavos(precos, True)
        self.assertEqual(precos, [6000, 4000])


if __name__ == '__main__':
    unittest.main(verbosity=2)
