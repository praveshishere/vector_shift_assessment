def create_adjacency_list(edges: list[tuple[str, str]]):
    adjacency_list = {}
    for source, target in edges:
        if source not in adjacency_list:
            adjacency_list[source] = []
        adjacency_list[source].append(target)

        if target not in adjacency_list:
            adjacency_list[target] = []

    return adjacency_list


def dfs(
    node: str, visited: set[str], stack: list[str], adjacency_list: dict[str, list[str]]
):
    visited.add(node)
    stack.append(node)

    for neighbor in adjacency_list[node]:
        if neighbor not in visited:
            if dfs(neighbor, visited, stack, adjacency_list):
                return True
        elif neighbor in stack:
            return True
    stack.pop()

    return False


def has_cycle(adjacency_list: dict[str, list[str]]):
    visited = set()
    stack = []
    for node in adjacency_list:
        if node not in visited:
            if dfs(node, visited, stack, adjacency_list):
                return True
    return False
