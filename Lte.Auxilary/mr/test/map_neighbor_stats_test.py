from mr_service import MroReader

reader=MroReader([])

reader.neighbor_stats=[{'CellId': '11', 'Neighbors': 2, 'IntraNeighbors': 2, 'Pci': 0},
{'CellId': '11', 'Neighbors': 2, 'IntraNeighbors': 1, 'Pci': 0},
{'CellId': '22', 'Neighbors': 1, 'IntraNeighbors': 0, 'Pci': 0},
{'CellId': '11', 'Neighbors': 2, 'IntraNeighbors': 0, 'Pci': 0}]

list=reader.map_neighbor_stats()
print(list)