from fastapi import FastAPI
from pydantic import BaseModel

from helpers import create_adjacency_list, has_cycle

app = FastAPI()


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


class Edge(BaseModel):
    source: str
    target: str
    id: str


class Payload(BaseModel):
    nodeIds: list[str]
    edges: list[Edge]


@app.post("/pipelines/parse")
async def parse_pipeline(item: Payload):
    edge_list = [(edge.source, edge.target) for edge in item.edges]
    adjacency_list = create_adjacency_list(edge_list)
    is_dag = not has_cycle(adjacency_list)
    return {
        "num_nodes": len(item.nodeIds),
        "num_edges": len(item.edges),
        "is_dag": is_dag,
    }
