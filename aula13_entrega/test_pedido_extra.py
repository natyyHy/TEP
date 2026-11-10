import unittest
from pedido import total_centavos


class TestPedidoExtra(unittest.TestCase):
    def test_vip_item_unico_no_limite(self):
        self.assertEqual(total_centavos([10000], True), 9000)

    def test_nao_vip_com_arredondamento(self):
        self.assertEqual(total_centavos([10009]), 10009)


if __name__ == '__main__':
    unittest.main(verbosity=2)
